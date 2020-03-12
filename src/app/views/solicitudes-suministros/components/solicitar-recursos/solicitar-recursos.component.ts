import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { environment } from './../../../../../environments/environment';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { ObraService } from '../../../../shared/services/obra.service';
import { EmpresasService } from '../../../../shared/services/empresas.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { UsuariosService } from '../../../../shared/services/usuarios.service';

import { Obra } from './../../../../shared/models/obra';
import { Empresa } from '../../../../shared/models/empresa';
import { SolicitudRecurso, PeticionSolicitudRecurso } from './../../.././../shared/models/solicitud';
import { Usuario } from '../../../../shared/models/usuario';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

@Component({
  selector: 'app-solicitar-recursos',
  templateUrl: './solicitar-recursos.component.html',
  styleUrls: ['./solicitar-recursos.component.scss']
})
export class SolicitarRecursosComponent implements OnInit {

  idUsuarioLogeado: any;
  idObra: number;
  obra: Obra;
  empresas: Empresa[];
  solicitudForm: FormGroup;
  fechaHoy = new Date();
  error:any={isError:false,errorMessage:''};
  pipe = new DatePipe('en-US');
  peticionesSolicitadas: PeticionSolicitudRecurso[] = [];
  listaCategoriasPeticion: any[] = [];
  listaUsuariosAdministracionCentral: Usuario[] = [];
  listaUsuariosJefeInmediato: Usuario[] = [];
  categoriaPeticion: number;
  desgloseSolicitud: string;
  importeSolicitadoPeticion;
  countPeticion:number = 0;

  nombreComponente = 'solicitudes-suministros-obras';
  tooltip = 'solicitud-recursos';
  opcionesPermitidas = true;

  constructor(
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private obraService: ObraService,
    private snackBar: MatSnackBar,
    private empresasService: EmpresasService,
    private navigationService: NavigationService,
    private usuariosService: UsuariosService,
    private solicitudesService: SolicitudesService
  ) { }

  ngOnInit() {
    // this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.activatedRoute.params.subscribe( (params: Params) => this.idObra = params.idObra);
    this.validateAccessValidation();
  }

  validateAccessValidation() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    const moduloActual = environment.permisosEspeciales.find( modulo => modulo.component === this.nombreComponente && modulo.tooltip === this.tooltip);
    const idModulo = moduloActual.idOpcion;
    console.log(idModulo);

    this.usuariosService.getUsuario(this.idUsuarioLogeado).subscribe(
      (usuario: Usuario) => {
        this.navigationService.validatePermissions(usuario.idPerfil, idModulo).subscribe(
          (result:any) => {
            if ( result.estatus !== '05'){
              this.opcionesPermitidas = false;
            }  else {
              this.opcionesPermitidas = true;
              this.getObra();
            } 
          },
          error => this.useAlerts( error.message, ' ', 'error-dialog')
        );
      },
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }
  
  getObra(){
    this.obraService.getObra(this.idObra).subscribe( 
      (obra: Obra) => {
        if(obra){
          this.obra = obra;
          this.getValidations();
          this.getCatalogos();
        }
      },
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }

  getValidations(){
    this.solicitudForm = new FormGroup({
      idEmpresa: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      idAdministrador: new FormControl(''),
      idJefeInmediato: new FormControl('')
    });
  }

  getCatalogos() {
    this.empresasService.getAllEmpresas().subscribe(
      (empresas: Empresa[]) => this.empresas = empresas.filter( empresa => empresa.activo === 1),
      error => console.log(error)
    );
    this.solicitudesService.getCategoriasSolicitudRecursos().subscribe(
      (categorias: any[]) => this.listaCategoriasPeticion = categorias,
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
    this.usuariosService.getUsuariosByIdProfile(2).subscribe(
     ( usuarios: Usuario[]) => this.listaUsuariosAdministracionCentral = usuarios,
     error => console.log(error)
    );
    this.usuariosService.getUsuariosByIdProfile(1).subscribe(
      ( usuarios: Usuario[]) => this.listaUsuariosJefeInmediato = usuarios,
      error => console.log(error)
     );
  }

  crearSolicitud(){
    if (this.solicitudForm.valid){
      const format = 'yyyy/MM/dd';
      const hoy = this.pipe.transform(this.fechaHoy, format);
      
      if(this.peticionesSolicitadas.length === 0){
        this.useAlerts('No has agregado ninguna petición a la solicitud', ' ', 'error-dialog');
      } else{
        const solicitud: SolicitudRecurso = {
          ...this.solicitudForm.value,
          idObra: this.idObra,
          fechaSolicitud: hoy,
          idUsuarioModifico: this.idUsuarioLogeado,
          detSolicitudRecurso: this.peticionesSolicitadas
        };
        console.log(solicitud);
        this.solicitudesService.createSolicitudRecurso(solicitud).subscribe(
          response => console.log(response),
          error => console.log(error)
        );
      }
    }
  }
  
  agregarPetision(){
    if(!this.categoriaPeticion){
      this.useAlerts('Selecciona el tipo de categoría de la petición', ' ', 'error-dialog');
    } else if (!this.desgloseSolicitud){
      this.useAlerts('Ingresa el desglose de la solicitud', ' ', 'error-dialog');
    } else if (!this.importeSolicitadoPeticion){
      this.useAlerts('Ingresa el importe solicitado para esta petición', ' ', 'error-dialog');
    } else {
      
      const tipoCategoria = this.listaCategoriasPeticion.filter( categoria => categoria.idCategoriaSolicitudRecurso === this.categoriaPeticion);
      const peticion: PeticionSolicitudRecurso = {
        idDetSolicitudRecurso: this.countPeticion + 1,
        idCategoriaSolicitudRecurso: this.categoriaPeticion,
        desglose: this.desgloseSolicitud,
        importeSolicitado: parseFloat(this.importeSolicitadoPeticion),
        idUsuarioModifico: this.idUsuarioLogeado,
        idSolicitudRecurso: this.idUsuarioLogeado,
        categoriaSolicitudRecurso: tipoCategoria
      };
      
      this.peticionesSolicitadas.push(peticion);
      this.peticionesSolicitadas = [...this.peticionesSolicitadas];
      this.countPeticion += 1;
      this.categoriaPeticion = 0;
      this.desgloseSolicitud = '';
      this.importeSolicitadoPeticion = '';
      this.useAlerts('Petición agregada correctamente', ' ', 'success-dialog');
      // console.log(this.peticionesSolicitadas);
    }
  }

  eliminarObservacion(index){
    this.peticionesSolicitadas.splice(index, 1);
    this.peticionesSolicitadas = [...this.peticionesSolicitadas];
    this.useAlerts('Petición eliminada correctamente', ' ', 'success-dialog');
  }

  useAlerts(message, action, className, time=4000) {
    this.snackBar.open(message, action, {
      duration: time,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
