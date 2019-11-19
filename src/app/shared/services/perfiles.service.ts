import { Injectable } from '@angular/core';
import { Perfil } from './../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  perfiles: Perfil[] = [
    {
      idPerfil: 1,
      nombre: 'Gerencia',
      descripcion: 'Perfil con todos los permisos'
    },
    {
      idPerfil: 2,
      nombre: 'Planeación y Presupuestos',
      descripcion: 'Perfil para usuario que realizaran planeación de obra y presupuesto de la misma'
    },
    {
      idPerfil: 3,
      nombre: 'Control de Obra',
      descripcion: 'Perfil en el cual se podrá llevar el contro de la obra'
    },
    {
      idPerfil: 4,
      nombre: 'Compras y Materiales',
      descripcion: 'Perfil para usuarios que llevarán el control de compras de materiales'
    },
    {
      idPerfil: 5,
      nombre: 'Supervisión',
      descripcion: 'Perfil para usuarios que llevarán la supervisión de una obra'
    },
  ];

  constructor() { }

  getAllPerfiles(){
    return this.perfiles;
  }

  getPerfil(id: number) {
    return this.perfiles.find( perfil => perfil.idPerfil == id);
  }
}
