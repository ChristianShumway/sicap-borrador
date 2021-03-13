import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ReporteIngresosEgresosService } from 'app/shared/services/reporte-ingresos-egresos.service';
import { ReporteIngresosEgresos } from 'app/shared/models/reporte-ingresos-egresos';

@Component({
  selector: 'app-modificar-reporte-ingresos-egresos',
  templateUrl: './modificar-reporte-ingresos-egresos.component.html',
  styleUrls: ['./modificar-reporte-ingresos-egresos.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ModificarReporteIngresosEgresosComponent implements OnInit {

  fecha = new Date();
  fechaCaptura;
  pipe = new DatePipe('en-US');
  reporteForm: FormGroup;
  catalogoReferencias: any[];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ModificarReporteIngresosEgresosComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private reporteIngresosEgresosService: ReporteIngresosEgresosService,
  ) { }

  ngOnInit() {
    this.getCatalogs();
    this.getValidations();
    this.getMovimiento();
  }

  getValidations() {
    this.reporteForm = new FormGroup({
      fecha: new FormControl(this.fechaCaptura, Validators.required),
      descripcion: new FormControl('', Validators.required),
      idReferencia: new FormControl('', Validators.required),
      monto: new FormControl('', Validators.required),
    })
  }

  public onFechaInicio(event): void {
    this.fechaCaptura = event.value;
  }

  getCatalogs(){ 
    this.reporteIngresosEgresosService.getCatalogoReferencia().subscribe(
      referencias => this.catalogoReferencias = referencias,
      error => console.log(error)
    );
  }

  getMovimiento(){
    let fechaCapturaString = this.data.movimiento.fecha;
    let referencia = this.data.movimiento.referencia;
    this.fechaCaptura = new Date(fechaCapturaString);
    this.fechaCaptura.setDate(this.fechaCaptura.getDate()+1);
    this.reporteForm.controls['idReferencia'].setValue(referencia.idReferencia);
    this.reporteForm.patchValue(this.data.movimiento);
    console.log(this.data.movimiento);
  }

  cancel() {
    this.bottomSheetRef.dismiss();
  }

  modificarMovimiento() {
    if (this.reporteForm.valid) {
      const format = 'yyyy/MM/dd';
      const nuevaFechaCaptura = this.pipe.transform(this.fechaCaptura, format);
      
      const mov: ReporteIngresosEgresos = {
        ...this.reporteForm.value,
        monto: parseFloat(this.reporteForm.value.monto),
        idTipoMovimientoMonetario: this.data.movimiento.idTipoMovimientoMonetario,
        idCategoriaMovimientoMonetario: this.data.movimiento.idCategoriaMovimientoMonetario,
        idMovimientoMonetario: this.data.movimiento.idMovimientoMonetario,
        fecha: nuevaFechaCaptura,
        idObra: this.data.movimiento.idObra,
        idUsuarioModifico: this.data.idUsuarioLogeado,
      };
      
      this.bottomSheetRef.dismiss(mov);
    }
  }

}
