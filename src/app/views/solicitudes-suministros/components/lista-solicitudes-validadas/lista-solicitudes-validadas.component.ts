import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ModalDatosSolicitudComponent } from '../modal-datos-solicitud/modal-datos-solicitud.component';
import { DatePipe } from '@angular/common';
import { ModalEliminarComponent } from '../../../ejecucion-proyecto/components/modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-lista-solicitudes-validadas',
  templateUrl: './lista-solicitudes-validadas.component.html',
  styleUrls: ['./lista-solicitudes-validadas.component.scss']
})
export class ListaSolicitudesValidadasComponent implements OnInit {

  listaSolicitudes: any[] = [];
  solicitudesMostrar: any[];
  idUsuarioLogeado;
  fechaHoy = new Date();
  pipe = new DatePipe('en-US');

  constructor(
    private solicitudesService: SolicitudesService,
    private autenticacionService: AutenticacionService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getSolicitudesParaValidar();
  }

  getSolicitudesParaValidar() {
    // this.solicitudesService.getSolicitudesValidadas(this.idUsuarioLogeado, 2, 1).subscribe(
    //   solicitudes => {
    //     if(solicitudes.length) {
    //       solicitudes.map( solicitud =>  this.listaSolicitudes.push(solicitud) )
    //     }
    //     console.log(this.listaSolicitudes);
    //   }, 
    //   error => console.log(error)
    // );

    // this.solicitudesService.getSolicitudesValidadas(this.idUsuarioLogeado, 2, 2).subscribe(
    //   solicitudes => {
    //     if(solicitudes.length) {
    //       solicitudes.map( solicitud =>  this.listaSolicitudes.push(solicitud) )
    //     }
    //     console.log(this.listaSolicitudes);
    //   }, 
    //   error => console.log(error)
    // );

    // this.solicitudesService.getSolicitudesValidadas(this.idUsuarioLogeado, 2, 3).subscribe(
    //   solicitudes => {
    //     if(solicitudes.length) {
    //       solicitudes.map( solicitud =>  this.listaSolicitudes.push(solicitud) )
    //     }
    //     console.log(this.listaSolicitudes);
    //   }, 
    //   error => console.log(error)
    // );
  }

  // openDialogDelete(idOrdenTrabajo) {
  //   console.log(idOrdenTrabajo);
  // }

  openDialoAlertDelete(tipoOrden, idOrdenTrabajo) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      // data: idObra
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

        // this.solicitudesService.deleteOrdenTrabajo(idOrdenTrabajo, tipoOrden).subscribe(
        //   response => {
        //     if(response.estatus === '05'){
        //       this.useAlerts(response.mensaje, ' ', 'success-dialog');
        //       this.getSolicitudesParaValidar();
        //     } else {
        //       this.useAlerts(response.mensaje, ' ', 'error-dialog');
        //     }
        //   },
        //     error => {
        //     this.useAlerts(error.message, ' ', 'error-dialog');
        //     console.log(error);
        //   }
        // );
      }
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
