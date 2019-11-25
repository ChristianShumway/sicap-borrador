import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { EmpresasService } from '../services/empresas.service';

@Pipe({
  name: 'getEmpresa'
})
export class GetEmpresaPipe implements PipeTransform, OnInit {
  nombreEmpresa= 'cargando';

  constructor(
    private empresasService: EmpresasService
  ){
  }

  ngOnInit(){
    return this.nombreEmpresa;
  }

  transform(idEmpresa: number): any {
    // const empresa = this.empresasService.getEmpresa(idEmpresa);
    this.empresasService.getEmpresa(idEmpresa).subscribe(
      ( (empresa) => {
        console.log(empresa.nombre);
        this.nombreEmpresa = empresa.nombre;
        return this.nombreEmpresa;
      }),
      (error => console.log(error))
    );


  }

}
