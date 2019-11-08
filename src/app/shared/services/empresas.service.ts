import { Injectable } from '@angular/core';
import { Empresa } from './../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  empresas: Empresa[] = [
    {
      'id': '1',
      'nombre': 'aesa',
      'direccion': 'República de Uruguay',
      'telefono': '4491111111',
      'rfc': 'AESAAESAAESA',
      'descripcion': 'Empresa dedicada a la rama eléctrica',
    },
    {
      'id': '2',
      'nombre': 'oecsa',
      'direccion': 'República de Uruguay',
      'telefono': '4491111111',
      'rfc': 'OECSAOECSA',
      'descripcion': 'Empresa dedicada a la rama eléctrica',
    },
    {
      'id': '3',
      'nombre': 'Electroredes',
      'direccion': 'República de Uruguay',
      'telefono': '4491111111',
      'rfc': 'ELECTROREDES',
      'descripcion': 'Empresa dedicada a la rama eléctrica',
    },
    {
      'id': '4',
      'nombre': 'treca',
      'direccion': 'República de Uruguay',
      'telefono': '4491111111',
      'rfc': 'TRECATRECA',
      'descripcion': 'Empresa dedicada a automoviles',
    },
    
  ];

  constructor() { }

  getAllEmpresas() {
    return this.empresas
  };

  getEmpresa(id: string){
    return this.empresas.find( empresa => empresa.id === id);
  }
}
