import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';

import { environment } from './../../../../../environments/environment';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

import { SolicitudVehiculo } from './../../.././../shared/models/solicitud';
import { ModalEliminarComponent } from '../../../ejecucion-proyecto/components/modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-modificar-orden-trabajo-vehiculos',
  templateUrl: './modificar-orden-trabajo-vehiculos.component.html',
  styleUrls: ['./modificar-orden-trabajo-vehiculos.component.scss']
})
export class ModificarOrdenTrabajoVehiculosComponent implements OnInit {

  idUsuarioLogeado: any;
  idOrdenTrabajo: number;
  ordenTrabajo: any;
  solicitudForm: FormGroup;

  fechaHoy = new Date();
  pipe = new DatePipe('en-US');
  rutaImg: string;
  host: string;

  nombreComponente = 'solicitudes-suministros-obras';
  tooltip = 'solicitud-materiales';
  opcionesPermitidas = true;

  listaVehiculosPropuestos = [];
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
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params: Params) => this.idOrdenTrabajo = parseInt(params.idOrdenTrabajo));
    this.getOrdenTrabajo();
  }

  getOrdenTrabajo() {
    this.solicitudesService.getOrdenTrabajoById(3, this.idOrdenTrabajo).subscribe(
      (ordenTrabajo: any) => {
        console.log(ordenTrabajo);
        this.ordenTrabajo = ordenTrabajo;
        this.validateAccessValidation();
        this.solicitudesService.getVehiculosByObra(this.ordenTrabajo.solicitud.idObra).subscribe(
          vehiculos => this.listaVehiculosPropuestos = vehiculos,
          error => console.log(error)
        );
      },
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }

  validateAccessValidation() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.opcionesPermitidas = true;
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
    this.detallesOrden = this.ordenTrabajo.detOrdenTrabajoMaquinariaEquipo;
    this.getTotales();
    console.log(this.detallesOrden);
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
      
      let tipoVehiculo = this.listaVehiculosPropuestos.filter( vehiculo => vehiculo.idVehiculo === this.vehiculoPropuesto);
      const orden = {
        idDetOrdenTrabajoMaquinariaEquipo: 0,
        idOrdenTrabajoMaquinariaEquipo: this.ordenTrabajo.idOrdenTrabajoMaquinariaEquipo,
        idVehiculo: this.vehiculoPropuesto,
        idObra: this.ordenTrabajo.solicitud.idObra,
        cantidad: this.cantidad,
        precioUnitario: parseFloat(this.precio),
        importe:  parseFloat(this.importe),
        idUsuarioModfico: this.idUsuarioLogeado,
        unidad: this.unidad,
        descripcion: "1231",
        vehiculo: tipoVehiculo[0]
      };

      console.log(orden);
      
      this.detallesOrden.push(orden);
      this.detallesOrden = [...this.detallesOrden];
      this.vehiculoPropuesto = 0;
      this.unidad = '';
      this.cantidad = '';
      this.precio = '';
      this.importe = '';
      this.useAlerts('Detalle agregado a la orden correctamente', ' ', 'success-dialog');
      this.getTotales();
      this.panelOpenState = !this.panelOpenState;
    }
  }

  getTotales() {
    this.totalImporte = 0;
    this.detallesOrden.map( (orden) => {
      this.totalImporte += orden.importe; 
    });
  }


  eliminarVehiculoLista(index, idDetalle) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      // data: idObra
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(idDetalle === 0 ){
          this.detallesOrden.splice(index, 1);
          this.detallesOrden = [...this.detallesOrden];
          this.useAlerts('Detalle eliminado de la orden correctamente', ' ', 'success-dialog');
          this.getTotales();
        } else {
          console.log(idDetalle);
          this.solicitudesService.deleteDetalleOrdenTrabajo(idDetalle, 3).subscribe(
            response => {
              if(response.estatus === '05'){
                this.useAlerts(response.mensaje, ' ', 'success-dialog');
                // this.validateAccessValidation();
                this.detallesOrden.splice(index, 1);
                this.detallesOrden = [...this.detallesOrden];
                this.useAlerts('Detalle eliminado de la orden correctamente', ' ', 'success-dialog');
                this.getTotales();
              } else {
                this.useAlerts(response.mensaje, ' ', 'error-dialog');
              }
            },
              error => {
              this.useAlerts(error.message, ' ', 'error-dialog');
              console.log(error);
            }
          );
        }
      }
    });
  }

  modificarOrden() {
    if(!this.detallesOrden.length){
      this.useAlerts( 'Debes Aregar un detalle a la orden de trabajo', ' ', 'error-dialog');
    } else {
      const format = 'yyyy/MM/dd';
      const hoy = this.pipe.transform(this.fechaHoy, format);
      
      const ordenTrabajo = {
        idOrdenTrabajoMaquinariaEquipo: this.ordenTrabajo.idOrdenTrabajoMaquinariaEquipo,
        idSolicitudMaquinariaEquipo: this.ordenTrabajo.idSolicitudMaquinariaEquipo,
        folio: this.ordenTrabajo.folio,
        idUsuarioModifico: this.idUsuarioLogeado,
        fechaModicio: hoy,
        detOrdenTrabajoMaquinariaEquipo: this.detallesOrden,
        observaciones: "dasads update",
        idSolicitud: this.ordenTrabajo.idSolicitudMaquinariaEquipo,
        serieFolio: this.ordenTrabajo.serieFolio,
      };

      console.log(ordenTrabajo);
      console.log(JSON.stringify(ordenTrabajo));
      this.solicitudesService.updateOrdenTrabajoVehiculos(ordenTrabajo).subscribe(
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

  useAlerts(message, action, className, time=4000) {
    this.snackBar.open(message, action, {
      duration: time,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
