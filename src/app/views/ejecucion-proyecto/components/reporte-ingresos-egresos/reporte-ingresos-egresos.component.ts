import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ReporteIngresosEgresosService } from 'app/shared/services/reporte-ingresos-egresos.service';
import { ReporteIngresosEgresos } from 'app/shared/models/reporte-ingresos-egresos';

@Component({
  selector: 'app-reporte-ingresos-egresos',
  templateUrl: './reporte-ingresos-egresos.component.html',
  styleUrls: ['./reporte-ingresos-egresos.component.scss']
})
export class ReporteIngresosEgresosComponent implements OnInit {

  fecha = new Date();
  fechaCaptura;
  pipe = new DatePipe('en-US');
  reporteForm: FormGroup;
  catalogoReferencias: any[];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ReporteIngresosEgresosComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private reporteIngresosEgresosService: ReporteIngresosEgresosService,

  ) { }

  ngOnInit() {
    console.log(this.data);
    this.getCatalogs();
    this.getValidations();
    this.fechaCaptura = new Date(this.reporteForm.controls['fecha'].value);
    this.fechaCaptura.setDate(this.fechaCaptura.getDate());
  }

  getValidations() {
    this.reporteForm = new FormGroup({
      fecha: new FormControl(new Date(), Validators.required),
      descripcion: new FormControl('', Validators.required),
      idReferencia: new FormControl('', Validators.required),
      monto: new FormControl('', Validators.required),
      idTipoMovimientoMonetario: new FormControl(this.data.idTipoMovimiento, Validators.required),
      idCategoriaMovimientoMonetario: new FormControl(this.data.idCategoria, Validators.required),
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


 
  registrarMovimiento() {
    if (this.reporteForm.valid) {
      const format = 'yyyy/MM/dd';
      const nuevaFechaCaptura = this.pipe.transform(this.fechaCaptura, format);

      const movimiento: ReporteIngresosEgresos = {
        ...this.reporteForm.value,
        idObra: parseInt(this.data.idObra),
        fecha: nuevaFechaCaptura,
        monto: parseFloat(this.reporteForm.value.monto),
        idUsuarioModifico: this.data.idUsuarioLogeado,
      };
      // console.log(movimiento);

      this.bottomSheetRef.dismiss(movimiento);
    }
  }

}
