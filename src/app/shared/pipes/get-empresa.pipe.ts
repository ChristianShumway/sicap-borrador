import { Pipe, PipeTransform } from '@angular/core';
import { EmpresasService } from '../services/empresas.service';

@Pipe({
  name: 'getEmpresa'
})
export class GetEmpresaPipe implements PipeTransform {
  constructor(
    private empresasService: EmpresasService
  ){}
  transform(idEmpresa: number): any {
    // const empresa = this.empresasService.getEmpresa(idEmpresa);
    // return empresa.nombre;

    this.empresasService.getEmpresa(idEmpresa).subscribe(
      ( (empresa) => {
        console.log(empresa.nombre);
        return empresa.nombre;
      }),
      (error => console.log(error))
    );
  }

}
