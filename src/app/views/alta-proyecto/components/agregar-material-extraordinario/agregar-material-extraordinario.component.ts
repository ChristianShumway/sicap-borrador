import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Material } from './../../../../shared/models/material';
import { MaterialService } from '../../../../shared/services/material.service';

@Component({
  selector: 'app-agregar-material-extraordinario',
  templateUrl: './agregar-material-extraordinario.component.html',
  styleUrls: ['./agregar-material-extraordinario.component.scss']
})
export class AgregarMaterialExtraordinarioComponent implements OnInit {

  createExtraordinaryMaterialForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private catalogoMaterialesService: MaterialService,
    private bottomSheetRef: MatBottomSheetRef<AgregarMaterialExtraordinarioComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.getValidations();
  }

  getValidations() {
    this.createExtraordinaryMaterialForm = new FormGroup({
      noMaterial: new FormControl('', [
        Validators.required,
      ]),
      descripcion: new FormControl('', [
        Validators.required,
      ]),
      partida: new FormControl('', [
        Validators.required,
      ]),
      familia: new FormControl('', [
        Validators.required,
      ]),
      cantidad: new FormControl('', [
        Validators.required,
      ]),
      unidad: new FormControl('', [
        Validators.required,
      ]),
      precioUnitario: new FormControl('', [
        Validators.required,
      ]),
      importe: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  createExtraordinary(){
    if(this.createExtraordinaryMaterialForm.valid){
      const material:Material = {
        ...this.createExtraordinaryMaterialForm.value,
        tipo:2,
        idObra: this.data.idObra,
        idUsuarioModifico: this.data.idUsuario
      };
      console.log(material);
      this.catalogoMaterialesService.createMaterialExtraordinario(material).subscribe(
        response => {
          if(response.estatus === '05'){
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.catalogoMaterialesService.getCatalogObservable(this.data.idObra);
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }  
        },
        error => console.log(error)
      );
      
      this.bottomSheetRef.dismiss();
    }
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
