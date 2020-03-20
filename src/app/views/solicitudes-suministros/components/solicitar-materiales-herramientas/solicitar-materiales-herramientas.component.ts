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
import { SolicitudesService } from './../../../../shared/services/solicitudes.service';

import { Obra } from './../../../../shared/models/obra';
import { Empresa } from '../../../../shared/models/empresa';
import { SolicitudMaterial, MaterialParaSolicitud } from './../../.././../shared/models/solicitud';
import { Usuario } from '../../../../shared/models/usuario';

@Component({
  selector: 'app-solicitar-materiales-herramientas',
  templateUrl: './solicitar-materiales-herramientas.component.html',
  styleUrls: ['./solicitar-materiales-herramientas.component.scss']
})
export class SolicitarMaterialesHerramientasComponent implements OnInit {

  idUsuarioLogeado: any;
  idObra: number;
  obra: Obra;
  empresas: Empresa[];
  solicitudForm: FormGroup;
  listaMaterial: MaterialParaSolicitud[] = [];
  listaTemp: MaterialParaSolicitud[];
  listaUsuariosAdministracionCentral: Usuario[] = [];
  listaUsuariosJefeInmediato: Usuario[] = [];
  fechaHoy = new Date();
  fechaRequiere;
  pipe = new DatePipe('en-US');
  rutaImg: string;
  host: string;

  nombreComponente = 'solicitudes-suministros-obras';
  tooltip = 'solicitud-materiales';
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
          this.fechaRequiere = new Date(this.solicitudForm.controls['fechaRequiere'].value);
          this.fechaRequiere.setDate(this.fechaRequiere.getDate());
          this.rutaImg = environment.imgRUL;
          this.host = environment.host;
        }
      },
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }
  
  getValidations(){
    this.solicitudForm = new FormGroup({
      fechaRequiere: new FormControl(new Date(), Validators.required),
      lugarRecepcion: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });
  }
  
  getCatalogos() {
    this.empresasService.getAllEmpresas().subscribe(
      (empresas: Empresa[]) => this.empresas = empresas.filter( empresa => empresa.activo === 1),
      error => console.log(error)
    );
    this.solicitudesService.getListMaterialForResource(this.idObra).subscribe(
      (materiales: MaterialParaSolicitud[]) => {
        this.listaMaterial = materiales;
        this.listaTemp = this.listaMaterial;
      },
      error => {
        console.log(error);
        error => this.useAlerts( error.message, ' ', 'error-dialog');
      }
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

  public onFechaRequiereMaterial(event): void {
    this.fechaRequiere = event.value;
  }

  crearSolicitud(){
    if (this.solicitudForm.valid){
      const format = 'yyyy/MM/dd';
      const hoy = this.pipe.transform(this.fechaHoy, format);
      const fechaRequiereMaterial = this.pipe.transform(this.fechaRequiere, format);
      let materialSolicitado: MaterialParaSolicitud[] = [];
      
      this.listaMaterial.map( (material: MaterialParaSolicitud) => {
        if(material.cantidadSolictada > 0) {
          materialSolicitado.push(material);
        }
      });

      console.log(materialSolicitado);
      
      const solicitud: SolicitudMaterial = {
        ...this.solicitudForm.value,
        idEmpresa: this.obra.idEmpresa,
        fechaSolicito: hoy,
        fechaRequiere: fechaRequiereMaterial,
        idUsuarioSolicito: this.idUsuarioLogeado,
        idUsuarioModifico: this.idUsuarioLogeado,
        idObra: this.idObra,
        detSolicitudMaterial: materialSolicitado
      };

      console.log(solicitud); 
      
      this.solicitudesService.createSolicitudMateriales(solicitud).subscribe(
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.listaTemp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.listaTemp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    if(!rows.length){
      this.useAlerts('No se encontraron conceptos con esta referencia', ' ', 'error-dialog', 500);
    } else {
      this.useAlerts(`Fueron encontrados ${rows.length} conceptos con esta referencia`, ' ', 'success-dialog', 500);
    }

    this.listaMaterial = rows;
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
