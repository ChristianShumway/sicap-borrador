import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-observacion-obra-general',
  templateUrl: './observacion-obra-general.component.html',
  styleUrls: ['./observacion-obra-general.component.scss']
})
export class ObservacionObraGeneralComponent implements OnInit {
 
  observacionGeneralForm: FormGroup;
  fecha = new Date();
  pipe = new DatePipe('en-US');

  constructor(
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<ObservacionObraGeneralComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.getValidations();
    console.log(this.data);
  }

  getValidations() {
    this.observacionGeneralForm = new FormGroup({
      tipo: new FormControl('', [
        Validators.required,
      ]),
      observacion: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  addObservation(){
    if(this.observacionGeneralForm.valid){
      const format = 'yyyy/MM/dd';
      const nuevaFechaInicio = this.pipe.transform(this.fecha, format);
      const comentario = {
        ...this.observacionGeneralForm.value,
        idUsuario: this.data.idUsuario,
        idObra: this.data.idObra,
        fecha: nuevaFechaInicio
      }
      console.log(comentario);
      this.bottomSheetRef.dismiss();
    }
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
