import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'diasFaltantes'
})
export class DiasFaltantesPipe implements PipeTransform {

  hoyEs = new Date();
  pipe = new DatePipe('en-US');

  transform(value: any, args?: any): any {
    const format = 'yyyy/MM/dd';
    const nuevaFechaActual = this.pipe.transform(this.hoyEs, format);
    let fechaActual = new Date(nuevaFechaActual).getTime();
    let fechaFinObra    = new Date(value).getTime();
    const plazoEjecucion = fechaFinObra - fechaActual;
    const diasFaltantes = Math.ceil(plazoEjecucion/(1000*60*60*24));
    return diasFaltantes;
  }

}
