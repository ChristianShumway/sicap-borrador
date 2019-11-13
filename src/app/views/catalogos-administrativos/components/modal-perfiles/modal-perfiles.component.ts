import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-modal-perfiles',
  templateUrl: './modal-perfiles.component.html',
  styleUrls: ['./modal-perfiles.component.scss']
})
export class ModalPerfilesComponent {

  groupProfiles = false;

  reactiveForm: FormGroup = new FormGroup({
    checked: new FormControl(true),
    unchecked: new FormControl(false)
  });

  getCheckboxesValue() {
    console.log('Checked value:', this.reactiveForm.controls['checked'].value);
    console.log('Unchecked value:', this.reactiveForm.controls['unchecked'].value);
  }

  constructor(
    public dialogRef: MatDialogRef<ModalPerfilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
