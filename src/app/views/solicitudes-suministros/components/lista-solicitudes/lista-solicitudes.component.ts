import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

import { SolicitudRecurso, SolicitudVehiculo, SolicitudMaterial } from './../../.././../shared/models/solicitud';
import { ModalEliminarComponent } from './../../../ejecucion-proyecto/components/modal-eliminar/modal-eliminar.component';
import { ModalDatosSolicitudComponent } from '../modal-datos-solicitud/modal-datos-solicitud.component';
import { DatePipe } from '@angular/common';
import { ModalAutorizarOrdenTrabajoComponent } from '../modal-autorizar-orden-trabajo/modal-autorizar-orden-trabajo.component';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.scss']
})
export class ListaSolicitudesComponent implements OnInit {

  idUsuarioLogeado: any;
  solicitudes: any[];
  solicitudesRecursos: SolicitudRecurso[];
  solicitudesMateriales: SolicitudMaterial[];
  solicitudesVehiculos: SolicitudVehiculo[];
  fechaHoy = new Date();
  pipe = new DatePipe('en-US');

  constructor(
    private autenticacionService: AutenticacionService,
    private solicitudesService: SolicitudesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getResources();
  }

  getResources(){
    this.solicitudesService.getSolicitudesPorUsuario(this.idUsuarioLogeado, 2, 1).subscribe(
      solicitudes => {
        this.solicitudesRecursos = solicitudes;
        console.log(this.solicitudesRecursos);
      },
      error => console.log(error)
    );
    this.solicitudesService.getSolicitudesPorUsuario(this.idUsuarioLogeado, 2, 2).subscribe(
      solicitudes => {
        this.solicitudesMateriales = solicitudes;
        console.log(this.solicitudesMateriales);
      },
      error => console.log(error)
    );
    this.solicitudesService.getSolicitudesPorUsuario(this.idUsuarioLogeado, 2, 3).subscribe(
      solicitudes => {
        this.solicitudesVehiculos = solicitudes;
        console.log(this.solicitudesVehiculos);
      },
      error => console.log(error)
    );
  }

  openDialoAlertDelete(idSolicitud, tipoSolicitud) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      // data: idObra
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this.solicitudesService.deleteSolicitud(idSolicitud, tipoSolicitud).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getResources();
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
    });
  }

  openDialogDeleteOrden(idOrdentrabajo, tipoOrdenTrabajo) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      // data: idObra
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this.solicitudesService.deleteOrdenTrabajo(idOrdentrabajo, tipoOrdenTrabajo).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getResources();
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
    });
  }

  openDialogRequest(solicitud): void {
    // console.log(solicitud);
    const dialogRef = this.dialog.open(ModalDatosSolicitudComponent, {
      width: '460px',
      panelClass: 'custom-dialog-container-user',
      data: solicitud
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      const {opcion} = result[0];
      const format = 'yyyy/MM/dd';
      const hoy = this.pipe.transform(this.fechaHoy, format);
      let datosValidar: any;

      if(opcion === 'validar'){
        datosValidar = {
          idUsuarioValido: this.idUsuarioLogeado,
          fechaValido: hoy,
          idBitacoraSolicitud: solicitud.idBitacoraSolicitud,
          idTipo: solicitud.idTipo,
          tipo: solicitud.tipo
        };
      }

      console.log(datosValidar);
      this.solicitudesService.validarSolicitudes(datosValidar).subscribe(
        response => {
          if(response.estatus === '05'){
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.getResources();
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        },
        error => this.useAlerts(error.message, ' ', 'error-dialog')
      );
      
    });
  }

  openDialogAuthorize(idOrdenTrabajo, idTipoSolicitud, idSolicitud): void{
    const dialogRef = this.dialog.open(ModalAutorizarOrdenTrabajoComponent, {
      width: '460px',
      panelClass: 'custom-dialog-container-user',
      data: { idOrdenTrabajo,idTipoSolicitud }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      const {opcion} = result[0];
      let datosAutorizar: any;

      if(opcion === 'validar'){
        datosAutorizar = {
          idOrdenCompra: idOrdenTrabajo,
          idTipo: idTipoSolicitud,
          idSolicitud: idSolicitud,
          idUsuarioAutorizo:this.idUsuarioLogeado,
          idBitacoraSolicitud:0,
        };
      }

      console.log(datosAutorizar);
      console.log(opcion);

      this.solicitudesService.autorizarSolicitud(datosAutorizar).subscribe(
        response => {
          if(response.estatus === '05'){
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.getResources();
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        },
        error => this.useAlerts(error.message, ' ', 'error-dialog')
      );
      
    });
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }



}
