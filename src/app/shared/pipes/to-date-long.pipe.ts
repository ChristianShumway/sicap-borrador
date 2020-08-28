import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDateLong'
})
export class ToDateLongPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      const temp = value.toString().replace(' ', 'T');
      // console.log (new Date(temp));
      return new Date(temp);
    } else {
      return null;
    }
  }

}
