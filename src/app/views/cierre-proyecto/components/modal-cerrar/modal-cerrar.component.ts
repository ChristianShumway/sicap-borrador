import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cerrar',
  templateUrl: './modal-cerrar.component.html',
  styleUrls: ['./modal-cerrar.component.scss']
})
export class ModalCerrarComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalCerrarComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      // console.log(this.data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
