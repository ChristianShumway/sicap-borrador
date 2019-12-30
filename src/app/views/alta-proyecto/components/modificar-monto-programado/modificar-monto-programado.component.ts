import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MontoProgramado } from './../../../../shared/models/monto-programado';
import { ObraService } from '../../../../shared/services/obra.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modificar-monto-programado',
  templateUrl: './modificar-monto-programado.component.html',
  styleUrls: ['./modificar-monto-programado.component.scss']
})
export class ModificarMontoProgramadoComponent implements OnInit {
  
  modificarMontoForm: FormGroup;
  fechaInicioPeriodo;
  fechaFinPeriodo;
  pipe = new DatePipe('en-US');

  constructor(
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<ModificarMontoProgramadoComponent>,
    private obraService: ObraService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    let inicioString = this.data.monto.fechaInicial;
    let finString = this.data.monto.fechaFinal;
    this.fechaInicioPeriodo= new Date(inicioString);
    this.fechaInicioPeriodo.setDate(this.fechaInicioPeriodo.getDate()+1);
    this.fechaFinPeriodo = new Date(finString);
    this.fechaFinPeriodo.setDate(this.fechaFinPeriodo.getDate()+1);
    this.getValidations();
    this.getPrespuesto();
    console.log(this.data);
  }

  getValidations() {
    this.modificarMontoForm = new FormGroup({
      monto: new FormControl('', [
        Validators.required,
      ]),
      fechaInicio: new FormControl(this.fechaInicioPeriodo, Validators.required),
      fechaFin: new FormControl(this.fechaFinPeriodo, Validators.required),
    })
  }

  getPrespuesto(){
    const presupuesto = this.data.monto;
    console.log(presupuesto);
            
    this.modificarMontoForm.patchValue(presupuesto);
  }

  public onFechaInicio(event): void {
    this.fechaInicioPeriodo = event.value;
    this.compareTwoDates();
  }

  public onFechaFin(event): void {
    this.fechaFinPeriodo = event.value;
    this.compareTwoDates();
  }

  compareTwoDates(){
    const controlFechaInicio = new Date(this.modificarMontoForm.controls['fechaInicio'].value);
    const controlFechaFin = new Date(this.modificarMontoForm.controls['fechaFin'].value);

    if( controlFechaFin < controlFechaInicio){
      this.useAlerts('Fecha inicio periodo no puede ser mayor a la fecha final', ' ', 'warning-dialog');
      this.modificarMontoForm.controls['fechaInicio'].setValue('');
    } 
  }

  ModificarMonto(){
    if(this.modificarMontoForm.valid){
      const format = 'yyyy/MM/dd';
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicioPeriodo, format);
      const nuevaFechaFin = this.pipe.transform(this.fechaFinPeriodo, format);
      
      const monto: MontoProgramado = {
        ...this.modificarMontoForm.value,
        idUsuarioCreo: this.data.idUsuarioLogeado,
        idUsuarioModifico: this.data.idUsuarioLogeado,
        idObra: this.data.idObra,
        idPresupuesto: this.data.monto.idPresupuesto,
        fechaInicial: nuevaFechaInicio,
        fechaFinal: nuevaFechaFin,
      };

      this.obraService.createUpdateMontoObra(monto).subscribe(
        response => {
          console.log(response);
          if(response.estatus === '05'){
            this.obraService.getMontosObraObservable(this.data.idObra);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.bottomSheetRef.dismiss();
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog'); 
          }
        },
        error => this.useAlerts(error.message, ' ', 'success-dialog')
      );
    }
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 6000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
