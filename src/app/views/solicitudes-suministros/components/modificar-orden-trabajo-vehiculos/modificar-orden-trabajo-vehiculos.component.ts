import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog, MatButton } from '@angular/material';
import { DatePipe } from '@angular/common';

import { environment } from './../../../../../environments/environment';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

import { SolicitudVehiculo } from './../../.././../shared/models/solicitud';
import { ModalEliminarComponent } from '../../../ejecucion-proyecto/components/modal-eliminar/modal-eliminar.component';
import { ModalLlenarPeticionComponent } from '../modal-llenar-peticion/modal-llenar-peticion.component';

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
  detallesSolicitud: any[] = [];
  vehiculoPropuesto;
  unidad;
  cantidad;
  precio;
  importe;
  panelOpenState: boolean = false;
  totalImporte: number;
  totalPrecio: number;
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
    // this.detallesOrden = this.ordenTrabajo.detOrdenTrabajoMaquinariaEquipo;
    // this.getTotales();
    this.getNewDetails();
    // console.log(this.detallesOrden);
  }

  getNewDetails(){
    this.ordenTrabajo.detOrdenTrabajoMaquinariaEquipo.map( peticionOrden => {
      this.ordenTrabajo.solicitud.detSolicitudMaquinriaEquipo.map( peticionSolicitud => {
        if (peticionOrden.idDetSolicitudMaquinariaEquipo === peticionSolicitud.idDetSolicitudMaquinariaEquipo){
          const nuevaPeticion = {
            cantidad: peticionOrden.cantidad,
            descripcion: peticionSolicitud.descripcion,
            idDetOrdenTrabajoMaquinariaEquipo: peticionOrden.idDetOrdenTrabajoMaquinariaEquipo,
            idDetSolicitudMaquinariaEquipo: peticionSolicitud.idDetSolicitudMaquinariaEquipo,
            idObra: this.ordenTrabajo.solicitud.idObra,
            idOrdenTrabajoMaquinariaEquipo: peticionOrden.idOrdenTrabajoMaquinariaEquipo,
            idUsuarioModfico: this.idUsuarioLogeado,
            idVehiculo: 1,
            importe: peticionOrden.importe,
            precioUnitario: peticionOrden.precioUnitario,
            unidad: peticionOrden.unidad,
            categoria: peticionSolicitud.categoriaSolicitudMaquinariaEquipo,
            tipoServicio: peticionSolicitud.tipoServicio
          };
          this.detallesOrden.push(nuevaPeticion);
        }
      });

    });
    console.log(this.detallesOrden);
    this.getTotales();
  }

  llenarPeticion(index, peticion){
    // console.log(index);
    const dialogRef = this.dialog.open(ModalLlenarPeticionComponent, {
      width: '460px',
      panelClass: 'custom-dialog-container-user',
      data: {peticion, tipo:'update'}
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

  modificarOrden() {
    if(!this.detallesOrden.length){
      this.useAlerts( 'Debes Aregar un detalle a la orden de trabajo', ' ', 'error-dialog');
    } else {
      this.submitButton.disabled = true;
      const format = 'yyyy/MM/dd';
      const hoy = this.pipe.transform(this.fechaHoy, format);
      const detOrdenTrabajo: any[] = [];

      this.detallesOrden.map(peticion => {
        const nuevaPeticion = {
          cantidad: peticion.cantidad,
          descripcion: peticion.descripcion,
          idDetOrdenTrabajoMaquinariaEquipo: peticion.idDetOrdenTrabajoMaquinariaEquipo,
          idDetSolicitudMaquinariaEquipo: peticion.idDetSolicitudMaquinariaEquipo,
          idObra: peticion.idObra,
          idOrdenTrabajoMaquinariaEquipo: peticion.idOrdenTrabajoMaquinariaEquipo,
          idUsuarioModfico: this.idUsuarioLogeado,
          idVehiculo: 1,
          importe: peticion.importe,
          precioUnitario: peticion.precioUnitario,
          unidad: peticion.unidad,
        };

        detOrdenTrabajo.push(nuevaPeticion);
      });

      console.log(detOrdenTrabajo);
      
      const ordenTrabajo = {
        idOrdenTrabajoMaquinariaEquipo: this.ordenTrabajo.idOrdenTrabajoMaquinariaEquipo,
        idSolicitudMaquinariaEquipo: this.ordenTrabajo.idSolicitudMaquinariaEquipo,
        folio: this.ordenTrabajo.folio,
        idUsuarioModifico: this.idUsuarioLogeado,
        fechaModicio: hoy,
        detOrdenTrabajoMaquinariaEquipo: detOrdenTrabajo,
        // observaciones: "dasads update",
        idSolicitud: this.ordenTrabajo.idSolicitudMaquinariaEquipo,
        serieFolio: this.ordenTrabajo.serieFolio,
        observacion: this.ordenTrabajo.observacion
      };
      
      console.log(ordenTrabajo);

      // console.log(JSON.stringify(ordenTrabajo));
      this.solicitudesService.updateOrdenTrabajoVehiculos(ordenTrabajo).subscribe(
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
