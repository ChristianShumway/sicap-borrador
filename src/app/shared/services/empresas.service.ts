import { Injectable } from '@angular/core';
import { Empresa } from './../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  empresas: Empresa[] = [
    {
      'id': '1',
      'nombre': 'Aesa',
      'direccion': 'República de Uruguay',
      'telefono': '4491111111',
      'rfc': 'AESAAESAAESA',
      'descripcion': 'Empresa dedicada a la rama eléctrica',
      'imagen': 'assets/images/logos/cima.png'
    },
    {
      'id': '2',
      'nombre': 'Oecsa',
      'direccion': 'República de Uruguay',
      'telefono': '4491111111',
      'rfc': 'OECSAOECSA',
      'descripcion': 'Empresa dedicada a la rama eléctrica',
      'imagen': 'assets/images/logos/cima.png'
    },
    {
      'id': '3',
      'nombre': 'Electroredes',
      'direccion': 'República de Uruguay',
      'telefono': '4491111111',
      'rfc': 'ELECTROREDES',
      'descripcion': 'Empresa dedicada a la rama eléctrica',
      'imagen': 'assets/images/logos/cima.png'
    },
    {
      'id': '4',
      'nombre': 'Treca',
      'direccion': 'República de Uruguay',
      'telefono': '4491111111',
      'rfc': 'TRECATRECA',
      'descripcion': 'Empresa dedicada a automoviles',
      'imagen': 'assets/images/logos/cima.png'
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
