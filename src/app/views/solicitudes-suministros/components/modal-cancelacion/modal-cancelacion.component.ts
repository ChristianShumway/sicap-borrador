import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cancelacion',
  templateUrl: './modal-cancelacion.component.html',
  styleUrls: ['./modal-cancelacion.component.scss']
})
export class ModalCancelacionComponent {
  mensaje: string;

  constructor(
    public dialogRef: MatDialogRef<ModalCancelacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      if (this.data === 'cancelar-orden'){
        this.mensaje = '¿Estás seguro de cancelar esta orden de trabajo?';
      } else if (this.data === 'cancelar-solicitud') {
        this.mensaje = '¿Estás seguro de cancelar esta solicitud?';
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
