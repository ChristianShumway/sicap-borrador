import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatDialog } from '@angular/material';

import { environment } from './../../../../../environments/environment';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { ObraService } from '../../../../shared/services/obra.service';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

import { Obra } from './../../../../shared/models/obra';
import { SolicitudRecurso, PeticionSolicitudRecurso } from './../../.././../shared/models/solicitud';
import { Usuario } from '../../../../shared/models/usuario';
import { ModalEliminarComponent } from '../../../alta-proyecto/components/modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-modificar-solicitud-recurso',
  templateUrl: './modificar-solicitud-recurso.component.html',
  styleUrls: ['./modificar-solicitud-recurso.component.scss']
})
export class ModificarSolicitudRecursoComponent implements OnInit {

  idUsuarioLogeado: any;
  idSolicitud: number;
  solicitud: SolicitudRecurso;
  obra: Obra;
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

  opcionesPermitidas = true;

  constructor(
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private obraService: ObraService,
    private snackBar: MatSnackBar,
    private solicitudesService: SolicitudesService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params: Params) => this.idSolicitud = parseInt(params.idSolicitud));
    this.getSolicitud();
  }
  
  getSolicitud() {
    this.solicitudesService.getSolicitudRecursoById(1, this.idSolicitud).subscribe(
      (solicitud: SolicitudRecurso) => {
        console.log(solicitud);
        this.solicitud = solicitud;
        this.validateAccessValidation();
      },
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }
  
  validateAccessValidation() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    
    if(this.idUsuarioLogeado  === this.solicitud.idUsuarioSolicito) {
      this.opcionesPermitidas = true;
      this.getObra();
      this.getValidations();
      this.getCatalogos();
      this.rutaImg = environment.imgRUL;
      this.host = environment.host;
      this.peticionesSolicitadas = this.solicitud.detSolicitudRecurso;
      this.getTotales();
    } else {
      this.opcionesPermitidas = false;
    }

  }
  
  getObra(){
    this.obraService.getObra(this.solicitud.idObra).subscribe( 
      (obra: Obra) => this.obra = obra,
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }

  getValidations(){
    this.solicitudForm = new FormGroup({
      descripcion: new FormControl(''),
      observacionesAdicionales: new FormControl(this.solicitud.observacionesAdicionales, Validators.required),
    });
  }

  getCatalogos() {
    this.solicitudesService.getCategoriasSolicitudRecursos().subscribe(
      (categorias: any[]) => this.listaCategoriasPeticion = categorias,
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
    // this.usuariosService.getUsuariosByIdProfile(2).subscribe(
    //  ( usuarios: Usuario[]) => this.listaUsuariosAdministracionCentral = usuarios,
    //  error => console.log(error)
    // );
    // this.usuariosService.getUsuariosByIdProfile(1).subscribe(
    //   ( usuarios: Usuario[]) => this.listaUsuariosJefeInmediato = usuarios,
    //   error => console.log(error)
    //  );
  }

  modificarSolicitud(){
    if (this.solicitudForm.valid){
      const format = 'yyyy/MM/dd';
      const hoy = this.pipe.transform(this.fechaHoy, format);
      
      if(this.peticionesSolicitadas.length === 0){
        this.useAlerts('No has agregado ninguna petición a la solicitud', ' ', 'error-dialog');
      } else{
        const solicitud: SolicitudRecurso = {
          ...this.solicitudForm.value,
          idSolicitudRecurso: this.solicitud.idSolicitudRecurso,
          idEmpresa: this.solicitud.idEmpresa,
          idObra: this.solicitud.idObra,
          fechaSolicito: this.solicitud.fechaSolicito,
          idUsuarioModifico: this.idUsuarioLogeado,
          idUsuarioSolicito: this.idUsuarioLogeado,
          detSolicitudRecurso: this.peticionesSolicitadas,
        };
        // console.log(JSON.stringify(solicitud));
        console.log(solicitud);

        this.solicitudesService.updateSolicitudRecurso(solicitud).subscribe(
          response => {
            if(response.estatus === '05'){
              this.router.navigate(['/solicitudes-suministros/solicitudes-realizadas']);
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
        idSolicitudRecurso: this.solicitud.idSolicitudRecurso,
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

  eliminarObservacion(index, idPeticion){
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      // data: idObra
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(!idPeticion){
          this.peticionesSolicitadas.splice(index, 1);
          this.peticionesSolicitadas = [...this.peticionesSolicitadas];
          this.useAlerts('Petición eliminada correctamente', ' ', 'success-dialog');
          this.getTotales();
        } else {
          this.solicitudesService.deletePeticion(idPeticion, 1).subscribe(
            response => {
              if(response.estatus === '05'){
                this.peticionesSolicitadas.splice(index, 1);
                this.peticionesSolicitadas = [...this.peticionesSolicitadas];
                this.useAlerts(response.mensaje, ' ', 'success-dialog');
                // this.useAlerts('Petición eliminada correctamente', ' ', 'success-dialog');
                this.getTotales();
              } else {
                this.useAlerts(response.mensaje, ' ', 'error-dialog');
              }
            },
            error => this.useAlerts(error.message, ' ', 'error-dialog')
          );
        }
      }
    });
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
