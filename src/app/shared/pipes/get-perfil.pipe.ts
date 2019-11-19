import { Pipe, PipeTransform } from '@angular/core';
import { PerfilesService } from '../services/perfiles.service';

@Pipe({
  name: 'getPerfil'
})
export class GetPerfilPipe implements PipeTransform {

  constructor(
    private perfilesService: PerfilesService
  ){}

  transform(idPerfil: number, args?: any): any {
    const perfil = this.perfilesService.getPerfil(idPerfil);
    return perfil.nombre;
  }

}
