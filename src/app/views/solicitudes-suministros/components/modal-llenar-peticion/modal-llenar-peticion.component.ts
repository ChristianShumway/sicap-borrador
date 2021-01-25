import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-llenar-peticion',
  templateUrl: './modal-llenar-peticion.component.html',
  styleUrls: ['./modal-llenar-peticion.component.scss']
})
export class ModalLlenarPeticionComponent implements OnInit {
  
  peticionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalLlenarPeticionComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // console.log(this.data);
    this.getValidations();
  }

  getValidations(){
    this.peticionForm = new FormGroup({
      // categoria: new FormControl(this.data.peticion.categoria.descripcion),
      descripcion: new FormControl(this.data.peticion.descripcion),
      tipoServicio: new FormControl(this.data.peticion.tipoServicio),
      unidad: new FormControl(this.data.peticion.unidad, Validators.required),
      cantidad: new FormControl(this.data.peticion.cantidad, Validators.required),
      precioUnitario: new FormControl(this.data.peticion.precioUnitario, Validators.required),
      importe: new FormControl(this.data.peticion.importe, Validators.required),
    })
  }

  llenarPeticion(){
    if(this.peticionForm.valid){
      // console.log(this.peticionForm.value);
      let peticion;
      if (this.data.tipo === 'create'){
        peticion = {
          ...this.peticionForm.value,
          precioUnitario: parseFloat(this.peticionForm.value.precioUnitario),
          importe: parseFloat(this.peticionForm.value.importe),
          idDet: this.data.peticion.idDet
        };
      } else if (this.data.tipo === 'update'){
        peticion = {
          ...this.data.peticion,
          ...this.peticionForm.value,
          // categoria: this.data.peticion.categoria,
          precioUnitario: parseFloat(this.peticionForm.value.precioUnitario),
          importe: parseFloat(this.peticionForm.value.importe),
          // idDet: this.data.peticion.idDet
        };
      }
      this.dialogRef.close(peticion);
    }
  }

  

}
