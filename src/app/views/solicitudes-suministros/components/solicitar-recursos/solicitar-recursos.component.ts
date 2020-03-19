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
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

import { Obra } from './../../../../shared/models/obra';
import { Empresa } from '../../../../shared/models/empresa';
import { SolicitudRecurso, PeticionSolicitudRecurso } from './../../.././../shared/models/solicitud';
import { Usuario } from '../../../../shared/models/usuario';

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
  importeSolicitadoPeticionSinFactura;
  importeSolicitadoPeticionConFactura;
  comentarioSolicitud: string;
  countPeticion:number = 0;
  totalImporteSolicitadoSinFactura: number;
  totalImporteSolicitadoConFactura: number;
  rutaImg: string;
  host: string;
  panelOpenState: boolean = false;

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
    private solicitudesService: SolicitudesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params: Params) => this.idObra = parseInt(params.idObra));
    this.validateAccessValidation();
  }

  validateAccessValidation() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    const moduloActual = environment.permisosEspeciales.find( modulo => modulo.component === this.nombreComponente && modulo.tooltip === this.tooltip);
    const idModulo = moduloActual.idOpcion;

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
          console.log(obra);
          this.getValidations();
          this.getCatalogos();
          this.rutaImg = environment.imgRUL;
          this.host = environment.host;
        }
      },
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }

  getValidations(){
    this.solicitudForm = new FormGroup({
      descripcion: new FormControl('', Validators.required),
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
          idEmpresa: this.obra.idEmpresa,
          idObra: this.idObra,
          fechaSolicito: hoy,
          idUsuarioModifico: this.idUsuarioLogeado,
          idUsuarioSolicito: this.idUsuarioLogeado,
          detSolicitudRecurso: this.peticionesSolicitadas,
        };
        console.log(solicitud);
        this.solicitudesService.createSolicitudRecurso(solicitud).subscribe(
          response => {
            if(response.estatus === '05'){
              this.router.navigate(['/solicitudes-suministros/obras']);
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }
          },
          error => this.useAlerts(error.message, ' ', 'error-dialog')
        );
      }
    }
  }
  
  agregarPetision(){
    if(!this.categoriaPeticion){
      this.useAlerts('Selecciona el tipo de categoría de la petición', ' ', 'error-dialog');
    } else if (!this){
      this.useAlerts('Ingresa el desglose de la solicitud', ' ', 'error-dialog');
    } else if (!this.importeSolicitadoPeticionSinFactura || !this.importeSolicitadoPeticionConFactura){
      this.useAlerts('Ingresa el importe solicitado para esta petición', ' ', 'error-dialog');
    } else {
      
      let tipoCategoria = this.listaCategoriasPeticion.filter( categoria => categoria.idCategoriaSolicitudRecurso === this.categoriaPeticion);
      tipoCategoria = tipoCategoria[0];
      const peticion: PeticionSolicitudRecurso = {
        // idDetSolicitudRecurso: this.countPeticion + 1,
        idCategoriaSolicitudRecurso: this.categoriaPeticion,
        desglose: this.desgloseSolicitud,
        importeSolicitadoSinFactura: parseFloat(this.importeSolicitadoPeticionSinFactura),
        importeSolicitadoConFactura: parseFloat(this.importeSolicitadoPeticionConFactura),
        comentario: this.comentarioSolicitud,
        idUsuarioModifico: this.idUsuarioLogeado,
        idSolicitudRecurso: this.idUsuarioLogeado,
        categoriaSolicitudRecurso: tipoCategoria
      };
      
      this.peticionesSolicitadas.push(peticion);
      this.peticionesSolicitadas = [...this.peticionesSolicitadas];
      this.countPeticion += 1;
      this.categoriaPeticion = 0;
      this.desgloseSolicitud = '';
      this.importeSolicitadoPeticionSinFactura = '';
      this.importeSolicitadoPeticionConFactura = '';
      this.comentarioSolicitud = '';
      this.useAlerts('Petición agregada correctamente', ' ', 'success-dialog');
      this.getTotales();
      this.panelOpenState = !this.panelOpenState;
      console.log(this.peticionesSolicitadas);
    }
  }

  eliminarObservacion(index){
    this.peticionesSolicitadas.splice(index, 1);
    this.peticionesSolicitadas = [...this.peticionesSolicitadas];
    this.useAlerts('Petición eliminada correctamente', ' ', 'success-dialog');
    this.getTotales();
  }

  getTotales() {
    this.totalImporteSolicitadoSinFactura = 0;
    this.totalImporteSolicitadoConFactura = 0;
    this.peticionesSolicitadas.map( (peticion: PeticionSolicitudRecurso) => {
      this.totalImporteSolicitadoSinFactura += peticion.importeSolicitadoSinFactura; 
      this.totalImporteSolicitadoConFactura += peticion.importeSolicitadoConFactura; 
    });
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
