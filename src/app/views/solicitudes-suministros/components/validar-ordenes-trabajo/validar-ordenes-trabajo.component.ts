import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ModalDatosSolicitudComponent } from '../modal-datos-solicitud/modal-datos-solicitud.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-validar-ordenes-trabajo',
  templateUrl: './validar-ordenes-trabajo.component.html',
  styleUrls: ['./validar-ordenes-trabajo.component.scss']
})
export class ValidarOrdenesTrabajoComponent implements OnInit {

  listaSolicitudes: any[];
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
    this.solicitudesService.getSolicitudesParaValidar().subscribe(
      solicitudes => {
        console.log(solicitudes);
        this.listaSolicitudes = solicitudes;
      }, 
      error => console.log(error)
    );
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
            this.getSolicitudesParaValidar();
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        },
        error => this.useAlerts(error.message, ' ', 'error-dialog')
      );
      
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
