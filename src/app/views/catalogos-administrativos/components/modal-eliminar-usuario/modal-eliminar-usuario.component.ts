import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-eliminar-usuario',
  templateUrl: './modal-eliminar-usuario.component.html',
  styleUrls: ['./modal-eliminar-usuario.component.scss']
})
export class ModalEliminarUsuarioComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalEliminarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
