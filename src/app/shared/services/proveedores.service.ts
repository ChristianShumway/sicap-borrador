import { Injectable } from '@angular/core';
import { Proveedor } from './../models/proveedor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  proveedoresTemp: Proveedor[] = [
    {
      idProveedor: 1,
      nombre: 'Gustavo Galindo',
      razonSocial: 'i',
      rfc: 'ASDFGHJKL',
      direccion: 'Conocida',
      localizacion: 'Silao',
      telefono: '(472) 101 4838',
      familia: 'no conocida',
      especialidad: 'conocida',
      activo: 1
    },
    {
      idProveedor: 2,
      nombre: 'Edgar Carmona',
      razonSocial: 'i',
      rfc: 'ASDFGHJKL',
      direccion: 'Conocida',
      localizacion: 'Puebla',
      telefono: '(472) 101 4838',
      familia: 'no conodida',
      especialidad: 'conocida',
      activo: 1
    }
  ];

  constructor(
    private http: HttpClient,
  ) { }

  getProveedores(): Observable<Proveedor[]>  {
    return this.http.get<Proveedor[]>(`${environment.apiURL}/catalog/getProveedores`); 
  }

  getProveedor(id: number): Observable<Proveedor>{
    return this.http.get<Proveedor>(`${environment.apiURL}/catalog/getProveedorByID/${id}`);
  }

  createProveedor(proveedor): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Proveedor>(`${environment.apiURL}/catalog/createProveedor`, JSON.stringify(proveedor), { headers: headerss});
  }

  updateProveedor(proveedor: Partial<Proveedor>): Observable<Proveedor>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Proveedor>(`${environment.apiURL}/catalog/updateProveedor`, JSON.stringify(proveedor), { headers: headerss});
  }

  deleteProveedor(proveedor: Partial<Proveedor>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/catalog/deleteProveedor`, JSON.stringify(proveedor), { headers: headerss});
  }

}
