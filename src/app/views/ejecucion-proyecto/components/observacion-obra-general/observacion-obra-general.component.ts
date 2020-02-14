import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ObraService } from './../../../../shared/services/obra.service';
import { Observacion } from '../../../../shared/models/observacion';

@Component({
  selector: 'app-observacion-obra-general',
  templateUrl: './observacion-obra-general.component.html',
  styleUrls: ['./observacion-obra-general.component.scss']
})
export class ObservacionObraGeneralComponent implements OnInit {
 
  observacionGeneralForm: FormGroup;
  fecha = new Date();
  pipe = new DatePipe('en-US');
  tipoPresupuestos;

  constructor(
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<ObservacionObraGeneralComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private obraService: ObraService
  ) { }

  ngOnInit() {
    this.getValidations();
    console.log(this.data);
    this.getCatalogoP();
  }

  getValidations() {
    this.observacionGeneralForm = new FormGroup({
      idTipoPresupuesto: new FormControl('', [
        Validators.required,
      ]),
      comentario: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  getCatalogoP(){
    this.obraService.getPresupuestosParaMontosObra().subscribe(
      presupuestos => {
        this.tipoPresupuestos = presupuestos;
      },
      error => console.log(error)
    );
  }

  addObservation(){
    if(this.observacionGeneralForm.valid){
      const format = 'yyyy/MM/dd';
      const nuevaFechaInicio = this.pipe.transform(this.fecha, format);
      const comentario:Observacion = {
        ...this.observacionGeneralForm.value,
        idObra: this.data.idObra,
        idUsuarioModifico: this.data.idUsuario,
        tipo: 2,
        fechaCreo: nuevaFechaInicio,
      }
      console.log(comentario);
      this.obraService.createObservacionObra(comentario).subscribe(
        (response => {
          if(response.estatus === '05'){
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.bottomSheetRef.dismiss();
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        }),
        (error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        })
      );
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
