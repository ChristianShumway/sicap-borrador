import { Injectable } from '@angular/core';
import { Usuario } from './../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  users: Usuario[] = [
    {
      'id': '1',
      'email': 'christiantorres084@gmail.com',
      'nombre': 'Snow Benton',
      'apellido': 'Prueba',
      'usuario': 'Usuario Prueba',
      'perfil': '1',
      'empresa': '1',
      'telefono': '+1 (956) 486-2327',
      'direccion': '329 Dictum Court, Minnesota',
      'fechaNacimiento': '2016-07-09',
      'imagen': 'assets/images/face-1.jpg',
      'password': '12345'
    },
    {
      'id': '2',
      'email': 'christiantorres084@gmail.com',
      'nombre': 'Kay Sellers',
      'apellido': 'Prueba',
      'usuario': 'Usuario Prueba',
      'perfil': '2',
      'empresa': '2',
      'telefono': '+1 (929) 406-3172',
      'direccion': '893 Garden Place, American Samoa',
      'fechaNacimiento': '2017-02-16',
      'imagen': 'assets/images/face-2.jpg',
      'password': '12345'
    },
    {
      'id': '3',
      'email': 'christiantorres084@gmail.com',
      'nombre': 'Robert Middleton',
      'apellido': 'Prueba',
      'usuario': 'Usuario Prueba',
      'perfil': '3',
      'empresa': '3',
      'telefono': '+1 (995) 451-2205',
      'direccion': '301 Hazel Court, West Virginia',
      'fechaNacimiento': '2017-01-22',
      'imagen': 'assets/images/face-3.jpg',
      'password': '12345',
    },
    {
      'id': '4',
      'email': 'christiantorres084@gmail.com',
      'nombre': 'Delaney Randall',
      'apellido': 'Prueba',
      'usuario': 'Usuario Prueba',
      'perfil': '4',
      'empresa': '4',
      'telefono': '+1 (922) 599-2410',
      'direccion': '128 Kensington Walk, Ohio',
      'fechaNacimiento': '2016-12-08',
      'imagen': 'assets/images/face-4.jpg',
      'password': '12345',
    },
    {
      'id': '5',
      'email': 'christiantorres084@gmail.com',
      'nombre': 'Melendez Lawrence',
      'apellido': 'Prueba',
      'usuario': 'Usuario Prueba',
      'perfil': '1',
      'empresa': '1',
      'telefono': '+1 (824) 589-2029',
      'direccion': '370 Lincoln Avenue, Florida',
      'fechaNacimiento': '2015-03-29',
      'imagen': 'assets/images/face-5.jpg',
      'password': '12345',
    },
    {
      'id': '6',
      'email': 'christiantorres084@gmail.com',
      'nombre': 'Galloway Fitzpatrick',
      'apellido': 'Prueba',
      'usuario': 'Usuario Prueba',
      'perfil': '2',
      'empresa': '3',
      'telefono': '+1 (907) 477-2375',
      'direccion': '296 Stuyvesant Avenue, Iowa',
      'fechaNacimiento': '2015-12-12',
      'imagen': 'assets/images/face-6.jpg',
      'password': '12345',
    },
    {
      'id': '7',
      'email': 'christiantorres084@gmail.com',
      'nombre': 'Watson Joyce',
      'apellido': 'Prueba',
      'usuario': 'Usuario Prueba',
      'perfil': '3',
      'empresa': '4',
      'telefono': '+1 (982) 500-3137',
      'direccion': '224 Visitation Place, Illinois',
      'fechaNacimiento': '2015-08-19',
      'imagen': 'assets/images/face-7.jpg',
      'password': '12345',
    },
    {
      'id': '8',
      'email': 'christiantorres084@gmail.com',
      'nombre': 'Ada Kidd',
      'apellido': 'Prueba',
      'usuario': 'Usuario Prueba',
      'perfil': '2',
      'empresa': '3',
      'telefono': '+1 (832) 531-2385',
      'direccion': '230 Oxford Street, South Dakota',
      'fechaNacimiento': '2016-08-11',
      'imagen': 'assets/images/face-1.jpg',
      'password': '12345',
    },
    {
      'id': '9',
      'email': 'christiantorres084@gmail.com',
      'nombre': 'Raquel Mcintyre',
      'apellido': 'Prueba',
      'usuario': 'Usuario Prueba',
      'perfil': '1',
      'empresa': '2',
      'telefono': '+1 (996) 443-2102',
      'direccion': '393 Sullivan Street, Palau',
      'fechaNacimiento': '2014-09-03',
      'imagen': 'assets/images/face-2.jpg',
      'password': '12345',
    },
    {
      'id': '10',
      'email': 'christiantorres084@gmail.com',
      'nombre': 'Juliette Hunter',
      'apellido': 'Prueba',
      'usuario': 'Usuario Prueba',
      'perfil': '4',
      'empresa': '1',
      'telefono': '+1 (876) 568-2964',
      'direccion': '191 Stryker Court, New Jersey',
      'fechaNacimiento': '2017-01-18',
      'imagen': 'assets/images/face-3.jpg',
      'password': '12345',
    },
    {
      'id': '11',
      'email': 'christiantorres084@gmail.com',
      'nombre': 'Workman Floyd',
      'apellido': 'Prueba',
      'usuario': 'Usuario Prueba',
      'perfil': '1',
      'empresa': '1',
      'telefono': '+1 (996) 481-2712',
      'direccion': '350 Imlay Street, Utah',
      'fechaNacimiento': '2017-05-01',
      'imagen': 'assets/images/face-4.jpg',
      'password': '12345',
    },
    {
      'id': '12',
      'email': 'christiantorres084@gmail.com',
      'nombre': 'Amanda Bean',
      'apellido': 'Prueba',
      'usuario': 'Usuario Prueba',
      'perfil': '3',
      'empresa': '3',
      'telefono': '+1 (894) 512-3907',
      'direccion': '254 Stockton Street, Vermont',
      'fechaNacimiento': '2014-08-30',
      'imagen': 'assets/images/face-5.jpg',
      'password': '12345',
    }
  ];

  constructor() { }

  getUsuarios() {
    return this.users;
  }

  getUsuario(id: string){
    return this.users.find( user => user.id === id);
  }
}
