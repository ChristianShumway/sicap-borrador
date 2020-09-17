import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformCurrency'
})
export class TransformCurrencyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value += '';
    // console.log(value);
    value = Number.parseFloat(value).toFixed(2);
    // console.log(value);
    let cantidadSplit = value.split('.');
    let cantidadEntera = cantidadSplit[0];
    let cantidadDecimal = cantidadSplit.length > 1 ? '.' + cantidadSplit[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(cantidadEntera)) {
        cantidadEntera = cantidadEntera.replace(rgx, '$1' + ',' + '$2');
    }
    const cantidadCurrency = `$${cantidadEntera}${cantidadDecimal}`;
    return cantidadCurrency;
  }

}
