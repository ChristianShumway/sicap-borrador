import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ObraService } from '../../../../shared/services/obra.service';
import { DatePipe } from '@angular/common';
import { LineaBase } from './../../../../shared/models/linea-base';

@Component({
  selector: 'app-modificar-linea-base',
  templateUrl: './modificar-linea-base.component.html',
  styleUrls: ['./modificar-linea-base.component.scss']
})
export class ModificarLineaBaseComponent implements OnInit {

  modificarMontoForm: FormGroup;
  fechaInicioPeriodo;
  fechaFinPeriodo;
  pipe = new DatePipe('en-US');
  tipoDuracion: any[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<ModificarLineaBaseComponent>,
    private obraService: ObraService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.getCatalogoP();
    let inicioString = this.data.periodo.fechaInicial;
    let finString = this.data.periodo.fechaFinal;
    this.fechaInicioPeriodo= new Date(inicioString);
    this.fechaInicioPeriodo.setDate(this.fechaInicioPeriodo.getDate()+1);
    this.fechaFinPeriodo = new Date(finString);
    this.fechaFinPeriodo.setDate(this.fechaFinPeriodo.getDate()+1);
    this.getValidations();
    this.getPrespuesto();
    // console.log(this.data);
  }

  getValidations() {
    this.modificarMontoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      idTipoDuracion: new FormControl('', Validators.required),
      porcentaje: new FormControl('', [Validators.required,]),
      fechaInicial: new FormControl(this.fechaInicioPeriodo, Validators.required),
      fechaFinal: new FormControl(this.fechaFinPeriodo, Validators.required),
    })
  }

  getPrespuesto(){
    const periodo = this.data.periodo;
    // console.log(periodo);
            
    this.modificarMontoForm.patchValue(periodo);
  }

  getCatalogoP(){
    this.obraService.getTiposDuracion().subscribe(
      tipoDuracion => this.tipoDuracion = tipoDuracion,
      error => console.log(error)
    );
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
    const controlFechaInicio = new Date(this.modificarMontoForm.controls['fechaInicial'].value);
    const controlFechaFin = new Date(this.modificarMontoForm.controls['fechaFinal'].value);

    if( controlFechaFin < controlFechaInicio){
      this.useAlerts('Fecha inicio periodo no puede ser mayor a la fecha final', ' ', 'warning-dialog');
      this.modificarMontoForm.controls['fechaInicial'].setValue('');
    } 
  }

  ModificarMonto(){
    if(this.modificarMontoForm.valid){
      const format = 'yyyy/MM/dd';
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicioPeriodo, format);
      const nuevaFechaFin = this.pipe.transform(this.fechaFinPeriodo, format);
      
      const periodo: LineaBase = {
        ...this.modificarMontoForm.value,
        idLineaBase: this.data.periodo.idLineaBase,
        idObra: this.data.idObra,
        fechaInicial: nuevaFechaInicio,
        fechaFinal: nuevaFechaFin,
        // noLineaBase: this.data.periodo.noLineaBase,
        idUsuarioModifico: this.data.idUsuarioLogeado,
      };
      // console.log(periodo);
      this.bottomSheetRef.dismiss(periodo);

      // this.obraService.createUpdateLineaBaseObra(periodo).subscribe(
      //   response => {
      //     console.log(response);
      //     if(response.estatus === '05'){
      //       this.obraService.getLineaBaseObservable(this.data.idObra);
      //       this.useAlerts(response.mensaje, ' ', 'success-dialog');
      //       this.bottomSheetRef.dismiss();
      //     } else {
      //       this.useAlerts(response.mensaje, ' ', 'error-dialog'); 
      //     }
      //   },
      //   error => this.useAlerts(error.message, ' ', 'success-dialog')
      // );
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
