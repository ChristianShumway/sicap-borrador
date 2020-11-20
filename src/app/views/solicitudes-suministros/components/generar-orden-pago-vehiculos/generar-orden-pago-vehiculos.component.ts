import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog, MatButton } from '@angular/material';
import { DatePipe } from '@angular/common';

import { environment } from './../../../../../environments/environment';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

import { SolicitudVehiculo } from './../../.././../shared/models/solicitud';
import { ModalLlenarPeticionComponent } from '../modal-llenar-peticion/modal-llenar-peticion.component';

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
  totalPrecio: number;
  totalImporte: number;
  observacionOrden: string = '';
  @ViewChild('save', {static: false}) submitButton: MatButton;

  constructor(
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
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
    this.solicitudesService.getSolicitudMaquinariaEquipoById(3, this.idSolicitud).subscribe(
      (solicitud: SolicitudVehiculo) => {
        console.log(solicitud);
        this.solicitud = solicitud;
        // this.detallesOrden = solicitud.detSolicitudMaquinriaEquipo;
        this.validateAccessValidation();
        this.getNewDetails();
        // this.solicitudesService.getVehiculosByObra(this.solicitud.idObra).subscribe(
        //   vehiculos => this.listaVehiculosPropuestos = vehiculos,
        //   error => console.log(error)
        // );
      },
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }

  validateAccessValidation() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.opcionesPermitidas = true;
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
  }

  getNewDetails(){
    this.solicitud.detSolicitudMaquinriaEquipo.map( peticion => {
      const nuevaPeticion = {
        // ...peticion,
        categoria: peticion.categoriaSolicitudMaquinariaEquipo.descripcion,
        descripcion: peticion.descripcion,
        tipoServicio: peticion.tipoServicio,
        unidad: '-',
        cantidad: 0,
        precioUnitario: 0,
        importe: 0,
        idDet: peticion.idDetSolicitudMaquinariaEquipo,
      };

      this.detallesOrden.push(nuevaPeticion);
    });
    // console.log(this.detallesOrden);
    this.getTotales();
  }


  llenarPeticion(index, peticion){
    // console.log(index);
    const dialogRef = this.dialog.open(ModalLlenarPeticionComponent, {
      width: '460px',
      panelClass: 'custom-dialog-container-user',
      data: {peticion, tipo:'create'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // console.log(result);
        this.detallesOrden.splice(index, 1);
        this.detallesOrden.push(result);
        console.log(this.detallesOrden);
        this.detallesOrden = [...this.detallesOrden];
        this.getTotales();
      }

    });
  }

  getTotales() {
    this.totalImporte = 0;
    this.totalPrecio = 0;
    this.detallesOrden.map( (orden) => {
      this.totalImporte += orden.importe; 
      this.totalPrecio += orden.precioUnitario;
    });
  }

  crearOrden() {
    if(!this.detallesOrden.length){
      this.useAlerts( 'Debes Aregar un detalle a la orden de trabajo', ' ', 'error-dialog');
    } else {
      this.submitButton.disabled = true;
      const format = 'yyyy/MM/dd';
      const hoy = this.pipe.transform(this.fechaHoy, format);
      const detOrdenTrabajo: any[] = [];

      this.detallesOrden.map(peticion => {
        const nuevaPeticion = {
          idVehiculo: 1,
          idObra: this.solicitud.idObra,
          cantidad: peticion.cantidad,
          precioUnitario: peticion.precioUnitario,
          importe: peticion.importe,
          idUsuarioModfico: this.idUsuarioLogeado,
          unidad: peticion.unidad,
          descripcion: peticion.descripcion,
          idDetSolicitudMaquinariaEquipo: peticion.idDet
        }

        detOrdenTrabajo.push(nuevaPeticion);
      });

      console.log(detOrdenTrabajo);
      
      const ordenTrabajo = {
        idSolicitudMaquinariaEquipo: this.solicitud.idSolicitudMaquinariaEquipo,
        idUsuarioModifico: this.idUsuarioLogeado,
        fechaModicio: hoy,
        detOrdenTrabajoMaquinariaEquipo: detOrdenTrabajo,
        observaciones: "dasads update",
        idSolicitud: this.solicitud.idSolicitudMaquinariaEquipo,
        serieFolio: "MAQ",
        observacion: this.observacionOrden,
      };

      console.log(ordenTrabajo);
      this.solicitudesService.createOrdenTrabajoVehiculos(ordenTrabajo).subscribe(
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
