import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatButton } from '@angular/material';

import { environment } from './../../../../../environments/environment';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { ObraService } from '../../../../shared/services/obra.service';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

import { Obra } from './../../../../shared/models/obra';
import { DetallesOrdenTrabajoRecurso, OrdenTrabajoRecurso } from './../../.././../shared/models/solicitud';
import { Usuario } from '../../../../shared/models/usuario';


@Component({
  selector: 'app-generar-orden-pago-recursos',
  templateUrl: './generar-orden-pago-recursos.component.html',
  styleUrls: ['./generar-orden-pago-recursos.component.scss']
})
export class GenerarOrdenPagoRecursosComponent implements OnInit {

  idUsuarioLogeado: any;
  idSolicitud: number;
  solicitud: any;
  obra: Obra;
  solicitudForm: FormGroup;
  fechaHoy = new Date();
  error:any={isError:false,errorMessage:''};
  pipe = new DatePipe('en-US');

  peticionesSolicitadas: any[] = [];
  totalImporteSolicitadoSinFactura: number;
  totalImporteSolicitadoConFactura: number;
  totalImporteValidadoSinFactura: number;
  totalImporteValidadoConFactura: number;
  rutaImg: string;
  host: string;
  observacionOrden: string = '';

  opcionesPermitidas = true;
  @ViewChild('save', {static: false}) submitButton: MatButton;

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
    this.solicitudesService.getSolicitudParaOrdenTrabajo(1, this.idSolicitud).subscribe(
      (solicitud: any) => {
        console.log(solicitud);
        this.solicitud = solicitud;
        this.validateAccessValidation();
      },
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }
  
  validateAccessValidation() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.opcionesPermitidas = true;
    this.obra = this.solicitud.solicitud.obra;
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
    this.modificarEstructuraPeticion();
  }
  
  
  
  modificarEstructuraPeticion(){
    this.solicitud.solicitud.detSolicitudRecurso.map( peticion => {
      
      const peticionModificada = {
        ... peticion,
        importeValidadoSinFactura: 0,
        importeValidadoConFactura: 0,
        comentarioRevision: ''
      }

      this.peticionesSolicitadas.push(peticionModificada);
    });

    this.getTotales();

    console.log(this.peticionesSolicitadas);
  }

  getTotales() {
    this.totalImporteSolicitadoSinFactura = 0;
    this.totalImporteSolicitadoConFactura = 0;
    this.totalImporteValidadoSinFactura = 0;
    this.totalImporteValidadoConFactura = 0;
    this.peticionesSolicitadas.map( (peticion: any) => {
      this.totalImporteSolicitadoSinFactura += peticion.importeSolicitadoSinFactura; 
      this.totalImporteSolicitadoConFactura += peticion.importeSolicitadoConFactura; 
      this.totalImporteValidadoSinFactura += parseFloat(peticion.importeValidadoSinFactura); 
      this.totalImporteValidadoConFactura += parseFloat(peticion.importeValidadoConFactura); 
    });
  }

  generarOrden(){
    console.log(this.peticionesSolicitadas);
    this.submitButton.disabled = true;
    let detallesOrdenTrabajoRecurso = [];
    const format = 'yyyy/MM/dd';
    const hoy = this.pipe.transform(this.fechaHoy, format);

    this.peticionesSolicitadas.map( peticion => {
      const peticionParaOrdenTrabajo = {
        idDetOrdenTrabajoRecurso: 0,
        idOrdenTrabajoRecurso: 0,
        idCategoriaMovimientoMonetario: peticion.idCategoriaMovimientoMonetario,
        importeSolicitadoSinFactura: parseFloat(peticion.importeValidadoSinFactura),
        importeSolicitadoConFactura: parseFloat(peticion.importeValidadoConFactura),
        comentario: peticion.comentarioRevision,
        idUsuarioModifico: this.idUsuarioLogeado,
        pk: 1
      };

      detallesOrdenTrabajoRecurso.push(peticionParaOrdenTrabajo);
    });

    const ordenTrabajo: OrdenTrabajoRecurso = {
      idSolicitudRecurso: this.solicitud.solicitud.idSolicitudRecurso,
      idUsuarioModifico: this.idUsuarioLogeado,
      detOrdenTrabajoRecurso: detallesOrdenTrabajoRecurso,
      idSolicitud: this.solicitud.solicitud.idSolicitudRecurso,
      observacion: this.observacionOrden,
    };

    console.log(ordenTrabajo);

    this.solicitudesService.createOrdenTrabajoRecursos(ordenTrabajo).subscribe(
      response => {
        if(response.estatus === '05'){
          this.router.navigate(['/solicitudes-suministros/solicitudes-realizadas']);
          this.useAlerts(response.mensaje, ' ', 'success-dialog');
          this.submitButton.disabled = false;
        } else {
          this.useAlerts(response.mensaje, ' ', 'error-dialog');
          this.submitButton.disabled = false;
        }
      },
      error => {
        this.useAlerts(error.message, ' ', 'error-dialog');
        this.submitButton.disabled = false;
      }
    );
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
