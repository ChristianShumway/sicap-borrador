import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

import { SolicitudRecurso, SolicitudVehiculo, SolicitudMaterial } from './../../.././../shared/models/solicitud';
import { ModalEliminarComponent } from './../../../ejecucion-proyecto/components/modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.scss']
})
export class ListaSolicitudesComponent implements OnInit {

  idUsuarioLogeado: any;
  solicitudes: any[];
  solicitudesRecursos: SolicitudRecurso[] = [];
  solicitudesMateriales: SolicitudMaterial[] = [];
  solicitudesVehiculos: SolicitudVehiculo[] = [];

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
    this.solicitudesService.getResourcesByUser(this.idUsuarioLogeado).subscribe(
      solicitudes => {
        this.solicitudes = solicitudes;
        // console.log(solicitudes);
        solicitudes.map( solicitud => {
          if(solicitud.idTipo === 1){
            this.solicitudesRecursos = solicitud.solicitud;
          } else if (solicitud.idTipo === 2){
            this.solicitudesMateriales = solicitud.solicitud;
          }  else if (solicitud.idTipo === 3){
            this.solicitudesVehiculos = solicitud.solicitud;
          }
        });
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

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }



}
