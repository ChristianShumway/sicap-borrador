import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ie-resumen-estado-cuenta-obra',
  templateUrl: './ie-resumen-estado-cuenta-obra.component.html',
  styleUrls: ['./ie-resumen-estado-cuenta-obra.component.scss']
})
export class IeResumenEstadoCuentaObraComponent implements OnInit {
  @Input() data: any;
  dataSemanas: any[];
  constructor() { }

  ngOnInit() {
    console.log(this.data);
    this.dataSemanas = this.data;
    // this.useData();
  }

  useData(){
    const semanas = [];
    let costosAdministrativos;
    let costosObra;
    let creditoPrestamo;
    let impuestos;
    let egresos;
    let ingresos;
    let totales;
    let newMovimiento;

    Object.keys(this.data).forEach ( item => {
      // console.log(result[item]);
      const semana = this.data[item];
      // console.log(semana);  
      semana.movimientos.map( dataMovimiento => {
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === 1){
          costosAdministrativos = { acumuladoCA: dataMovimiento.acumulado};
        }
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === 2){
          costosObra = { acumuladoCO: dataMovimiento.acumulado};
        }
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === 3){
          creditoPrestamo = { acumuladoCP: dataMovimiento.acumulado};
        }
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === 4){
          impuestos = { acumuladoIMP: dataMovimiento.acumulado};
        }
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === 5){
          egresos = { acumuladoEGR: dataMovimiento.acumulado};
        }
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === 6){
          ingresos = { acumuladoING: dataMovimiento.acumulado};
        }
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === -5){
          totales = { acumuladoTOT: dataMovimiento.acumulado};
        }
      });

      newMovimiento = {
        periodo: semana.periodo,
        corte: semana.corte,
        ...costosAdministrativos,
        ...costosObra,
        ...creditoPrestamo,
        ...impuestos,
        ...egresos,
        ...ingresos,
        ...totales
      };

      semanas.push(newMovimiento);

    });
    this.dataSemanas = semanas;
    console.log(this.dataSemanas);
  }

}
