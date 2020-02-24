import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-observacion-validacion-concepto',
  templateUrl: './observacion-validacion-concepto.component.html',
  styleUrls: ['./observacion-validacion-concepto.component.scss']
})
export class ObservacionValidacionConceptoComponent implements OnInit {

  observacionForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<ObservacionValidacionConceptoComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.getValidations();
  }

  getValidations() {
    this.observacionForm = new FormGroup({
      observacion: new FormControl('', Validators.required)
    });
  }

  addObservation(){
    if( this.observacionForm.valid) {
      const objObservacion = {
        idConcepto: this.data.idConcepto,
        ...this.observacionForm.value
      }
      this.bottomSheetRef.dismiss(objObservacion);
    }
  }

}
