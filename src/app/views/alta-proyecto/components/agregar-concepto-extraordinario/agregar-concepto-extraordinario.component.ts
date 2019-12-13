import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CatalogoConceptos } from './../../../../shared/models/catalogo-conceptos';
import { CatalogoConceptosService } from '../../../../shared/services/catalogo-conceptos.service';

@Component({
  selector: 'app-agregar-concepto-extraordinario',
  templateUrl: './agregar-concepto-extraordinario.component.html',
  styleUrls: ['./agregar-concepto-extraordinario.component.scss']
})
export class AgregarConceptoExtraordinarioComponent implements OnInit {

  createExtraordinaryConceptForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private catalogoConceptosService: CatalogoConceptosService,
    private bottomSheetRef: MatBottomSheetRef<AgregarConceptoExtraordinarioComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.getValidations();
  }

  getValidations() {
    this.createExtraordinaryConceptForm = new FormGroup({
      noConcepto: new FormControl('', [
        Validators.required,
      ]),
      descripcion: new FormControl('', [
        Validators.required,
      ]),
      unidad: new FormControl('', [
        Validators.required,
      ]),
      cantidad: new FormControl('', [
        Validators.required,
      ]),
      pu: new FormControl('', [
        Validators.required,
      ]),
      importe: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  createExtraordinary(){
    if(this.createExtraordinaryConceptForm.valid){
      const concepto = {
        ...this.createExtraordinaryConceptForm.value,
        tipo:2,
        idObra: this.data.idObra
      };
      console.log(concepto);
      this.catalogoConceptosService.createConceptoExtraordinario(concepto).subscribe(
        response => {
          if(response.estatus === '05'){
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.catalogoConceptosService.getCatalogObservable(this.data.idObra);
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
