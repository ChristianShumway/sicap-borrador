import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {  MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-modal-perfiles',
  templateUrl: './modal-perfiles.component.html',
  styleUrls: ['./modal-perfiles.component.scss']
})
export class ModalPerfilesComponent implements OnInit {

  groupProfiles = false;
  flds: any[] = [];

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(
    public dialogRef: MatDialogRef<ModalPerfilesComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    console.log(this.data);
    // this.getValidations(this.data);
    // console.log(this.flds);
  }


  // getValidations(data){
  //   data.map( fld => {
  //     let check = {
  //       id: fld.id,
  //       nombre: fld.nombre,
  //       selected: false
  //     };
  //     this.flds.push(check);
  //   });   
  // }

  onChange($event: MatCheckboxChange) {
    alert($event.checked);
  }

}
