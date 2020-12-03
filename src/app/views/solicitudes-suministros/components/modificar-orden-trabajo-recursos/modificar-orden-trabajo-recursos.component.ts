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
  selector: 'app-modificar-orden-trabajo-recursos',
  templateUrl: './modificar-orden-trabajo-recursos.component.html',
  styleUrls: ['./modificar-orden-trabajo-recursos.component.scss']
})
export class ModificarOrdenTrabajoRecursosComponent implements OnInit {

  idUsuarioLogeado: any;
  idOrdenTrabajo: number;
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
    this.activatedRoute.params.subscribe( (params: Params) => this.idOrdenTrabajo = parseInt(params.idOrdenTrabajo));
    this.getSolicitud();
    console.log(this.idOrdenTrabajo);
  }
  
  getSolicitud() {
    this.solicitudesService.getOrdenTrabajoById(1, this.idOrdenTrabajo).subscribe(
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
    let arregloDetallesPeticion = {};
    this.solicitud.solicitud.detSolicitudRecurso.map( peticionSolicitud => {

      this.solicitud.detOrdenTrabajoRecurso.map( peticionOrden => {

        if(peticionSolicitud.idCategoriaMovimientoMonetario === peticionOrden.idCategoriaMovimientoMonetario) {
          arregloDetallesPeticion = {
            detallePeticionSolicitud: { ...peticionSolicitud},
            detallePeticionOrden: { ...peticionOrden},
          };
        }

      });

      this.peticionesSolicitadas.push(arregloDetallesPeticion);
      // console.log(this.peticionesSolicitadas);
    });

    this.getTotales();

    console.log(this.peticionesSolicitadas);
    // console.log(JSON.stringify(this.peticionesSolicitadas));
  }

  getTotales() {
    this.totalImporteSolicitadoSinFactura = 0;
    this.totalImporteSolicitadoConFactura = 0;
    this.totalImporteValidadoSinFactura = 0;
    this.totalImporteValidadoConFactura = 0;
    this.peticionesSolicitadas.map( (peticion: any) => {
      this.totalImporteSolicitadoSinFactura += peticion.detallePeticionSolicitud.importeSolicitadoSinFactura; 
      this.totalImporteSolicitadoConFactura += peticion.detallePeticionSolicitud.importeSolicitadoConFactura; 
      this.totalImporteValidadoSinFactura += parseFloat(peticion.detallePeticionOrden.importeSolicitadoSinFactura); 
      this.totalImporteValidadoConFactura += parseFloat(peticion.detallePeticionOrden.importeSolicitadoConFactura); 
    });
  }

  modificarOrden(){
    console.log(this.peticionesSolicitadas);
    this.submitButton.disabled = true;
    let detallesOrdenTrabajoRecurso: DetallesOrdenTrabajoRecurso[] = [];
    const format = 'yyyy/MM/dd';
    const hoy = this.pipe.transform(this.fechaHoy, format);

    this.peticionesSolicitadas.map( (peticion) => {
      const peticionCompleta =  {
        ...peticion.detallePeticionOrden,
        importeSolicitadoSinFactura: parseFloat(peticion.detallePeticionOrden.importeSolicitadoSinFactura),
        importeSolicitadoConFactura: parseFloat(peticion.detallePeticionOrden.importeSolicitadoConFactura),
        idUsuarioModifico: this.idUsuarioLogeado,
      };

      detallesOrdenTrabajoRecurso.push(peticionCompleta);
    });

    const ordenTrabajo: OrdenTrabajoRecurso = {
      idOrdenTrabajoRecurso: this.solicitud.idOrdenTrabajoRecurso,
      idSolicitudRecurso: this.solicitud.idSolicitudRecurso,
      folio: this.solicitud.folio,
      idUsuarioModifico: this.idUsuarioLogeado,
      detOrdenTrabajoRecurso: detallesOrdenTrabajoRecurso,
      idSolicitud: this.solicitud.idSolicitudRecurso,
      observacion: this.solicitud.observacion
    };

    // console.log(JSON.stringify(ordenTrabajo));
    console.log(ordenTrabajo);

    this.solicitudesService.updateOrdenTrabajo(ordenTrabajo).subscribe(
      response => {
        if(response.estatus === '05'){
          this.router.navigate(['/solicitudes-suministros/seguimiento-solicitudes']);
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
