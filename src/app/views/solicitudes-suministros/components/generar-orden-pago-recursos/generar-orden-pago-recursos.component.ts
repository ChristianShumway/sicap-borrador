import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { environment } from './../../../../../environments/environment';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { ObraService } from '../../../../shared/services/obra.service';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

import { Obra } from './../../../../shared/models/obra';
import { SolicitudRecurso, PeticionSolicitudRecurso } from './../../.././../shared/models/solicitud';
import { Usuario } from '../../../../shared/models/usuario';


@Component({
  selector: 'app-generar-orden-pago-recursos',
  templateUrl: './generar-orden-pago-recursos.component.html',
  styleUrls: ['./generar-orden-pago-recursos.component.scss']
})
export class GenerarOrdenPagoRecursosComponent implements OnInit {

  idUsuarioLogeado: any;
  idSolicitud: number;
  solicitud: SolicitudRecurso;
  obra: Obra;
  solicitudForm: FormGroup;
  fechaHoy = new Date();
  error:any={isError:false,errorMessage:''};
  pipe = new DatePipe('en-US');

  peticionesSolicitadas: PeticionSolicitudRecurso[] = [];
  totalImporteSolicitadoSinFactura: number;
  totalImporteSolicitadoConFactura: number;
  rutaImg: string;
  host: string;

  opcionesPermitidas = true;

  constructor(
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private obraService: ObraService,
    private snackBar: MatSnackBar,
    private solicitudesService: SolicitudesService,
    private router: Router
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
      descripcion: new FormControl(this.solicitud.descripcion, Validators.required),
    });
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
