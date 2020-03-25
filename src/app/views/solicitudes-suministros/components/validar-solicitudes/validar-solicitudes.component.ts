import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { MatDialog } from '@angular/material';
import { ModalDatosSolicitudComponent } from '../modal-datos-solicitud/modal-datos-solicitud.component';

@Component({
  selector: 'app-validar-solicitudes',
  templateUrl: './validar-solicitudes.component.html',
  styleUrls: ['./validar-solicitudes.component.scss']
})
export class ValidarSolicitudesComponent implements OnInit {
  listaSolicitudes: any[];
  solicitudesMostrar: any[];
  idUsuarioLogeado;

  constructor(
    private solicitudesService: SolicitudesService,
    private autenticacionService: AutenticacionService,
    public dialog: MatDialog
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
      console.log(result);
      // const {opcion, id} = result[0];
      // switch (opcion) {
      //   case 'mensaje':
      //     const urlWpp = `https://api.whatsapp.com/api/send?phone=${id}`;
      //     window.open(urlWpp);
      //     break;
      //   case 'editar':
      //     this.router.navigate([`/configuracion/modificar-usuario/${id}`])
      //     break;
      //   case 'eliminar':
      //     this.openDialoAlertDelete(id);
      //     break;
      //   default:
      //     break;
      // }
    });
  }

}
