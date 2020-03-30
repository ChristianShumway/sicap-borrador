import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { environment } from './../../../../../environments/environment';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

import { SolicitudVehiculo } from './../../.././../shared/models/solicitud';

@Component({
  selector: 'app-generar-orden-pago-vehiculos',
  templateUrl: './generar-orden-pago-vehiculos.component.html',
  styleUrls: ['./generar-orden-pago-vehiculos.component.scss']
})
export class GenerarOrdenPagoVehiculosComponent implements OnInit {

  idUsuarioLogeado: any;
  idSolicitud: number;
  solicitud: SolicitudVehiculo;
  solicitudForm: FormGroup;

  fechaHoy = new Date();
  rutaImg: string;
  host: string;

  nombreComponente = 'solicitudes-suministros-obras';
  tooltip = 'solicitud-materiales';
  opcionesPermitidas = true;

  listaVehiculosPropuestos = [
    { id: 1, nombre: 'camión 2013 con grua para postes' },
    { id: 2, nombre: 'camioneta de 3.5 toneladas' },
  ];

  detallesOrden: any[] = [];
  vehiculoPropuesto;
  unidad;
  cantidad;
  precio;
  importe;
  panelOpenState: boolean = false;
  totalImporte: number;

  constructor(
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private solicitudesService: SolicitudesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params: Params) => this.idSolicitud = parseInt(params.idSolicitud));
    this.getSolicitud();
  }

  getSolicitud() {
    this.solicitudesService.getSolicitudMaquinariaEquipoById(3, this.idSolicitud).subscribe(
      (solicitud: SolicitudVehiculo) => {
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
      this.rutaImg = environment.imgRUL;
      this.host = environment.host;
      // this.solicitudForm.patchValue(this.solicitud);

    } else {
      this.opcionesPermitidas = false;
    }

  }

  agregarDetalle(){
    if(!this.vehiculoPropuesto){
      this.useAlerts('Selecciona el vehículo propuesto', ' ', 'error-dialog');
    } else if (!this.unidad){
      this.useAlerts('Ingresa la unidad del detalle', '', 'error-dialog');
    } else if (!this.cantidad){
      this.useAlerts('Ingresa la cantidad del detalle', ' ', 'error-dialog');
    } else if (!this.precio){
      this.useAlerts('Ingresa el precio del detalle', ' ', 'error-dialog');
    } else if (!this.importe){
      this.useAlerts('Ingresa el importe del detalle', ' ', 'error-dialog');
    } else {
      
      let tipoVehiculo = this.listaVehiculosPropuestos.filter( vehiculo => vehiculo.id === this.vehiculoPropuesto);
      // tipoVehiculo = tipoVehiculo[0];
      const orden = {
        // idDetSolicitudRecurso: this.countPeticion + 1,
        idVehiculoPropuesto: this.vehiculoPropuesto,
        unidad: this.unidad,
        cantidad: this.cantidad,
        precio: parseFloat(this.precio),
        importe: parseFloat(this.importe),
        idUsuarioModifico: this.idUsuarioLogeado,
        vehiculoPropuesto: tipoVehiculo[0]
      };
      
      this.detallesOrden.push(orden);
      this.detallesOrden = [...this.detallesOrden];
      // this.countPeticion += 1;
      this.vehiculoPropuesto = 0;
      this.unidad = '';
      this.cantidad = '';
      this.precio = '';
      this.importe = '';
      this.useAlerts('Detalle agregado a la orden correctamente', ' ', 'success-dialog');
      this.getTotales();
      this.panelOpenState = !this.panelOpenState;
      console.log(this.detallesOrden);
    }
  }

  getTotales() {
    this.totalImporte = 0;
    this.detallesOrden.map( (orden) => {
      this.totalImporte += orden.importe; 
    });
  }

  eliminarVehiculoLista(index) {
    this.detallesOrden.splice(index, 1);
    this.detallesOrden = [...this.detallesOrden];
    this.useAlerts('Petición eliminada correctamente', ' ', 'success-dialog');
    this.getTotales();
  }

  // modificarSolicitud(){
  //   if (this.solicitudForm.valid){
  //     const format = 'yyyy/MM/dd';
  //     const hoy = this.pipe.transform(this.fechaHoy, format);
  //     const nuevaFechaInicio = this.pipe.transform(this.fechaInicio, format);
  //     const nuevaFechaFin = this.pipe.transform(this.fechaFinal, format);

  //     let tipoServicioInteres = this.objServiciosInteres.filter(servicio => servicio.id === this.solicitudForm.value.idServicioInteres);
      
  //     const solicitud: SolicitudVehiculo = {
  //       idSolicitudMaquinariaEquipo: this.solicitud.idSolicitudMaquinariaEquipo,
  //       folio: this.solicitud.folio,
  //       idObra: this.solicitud.idObra,
  //       ...this.solicitudForm.value,
  //       // idEmpresa: this.obra.idEmpresa,
  //       fechaInicialUso: nuevaFechaInicio,
  //       fechaFinalUso: nuevaFechaFin,
  //       fechaSolicitud: this.solicitud.fechaSolicitud,
  //       fechaModificacion: hoy,
  //       idUsuarioSolicito: this.idUsuarioLogeado,
  //       idUsuarioModifico: this.idUsuarioLogeado,
  //       // idObra: this.idObra,
  //       servicioInteres: tipoServicioInteres[0],
  //     };
  //     console.log(solicitud);

  //     this.solicitudesService.updateSolicitudVehiculos(solicitud).subscribe(
  //       response => {
  //         if(response.estatus === '05'){
  //           this.router.navigate(['/solicitudes-suministros/solicitudes-realizadas']);
  //           this.useAlerts(response.mensaje, ' ', 'success-dialog');
  //         } else {
  //           this.useAlerts(response.mensaje, ' ', 'error-dialog');
  //         }
  //       },
  //       error => this.useAlerts(error.message, ' ', 'error-dialog')
  //     );
  //   }
  // }

  useAlerts(message, action, className, time=4000) {
    this.snackBar.open(message, action, {
      duration: time,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
