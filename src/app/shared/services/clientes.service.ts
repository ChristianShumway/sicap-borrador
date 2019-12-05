import { Injectable } from '@angular/core';
import { Cliente } from './../models/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientesTemp: Cliente[] = [
    {
      idCliente: 1,
      nombre: 'Gustavo Galindo',
      direccion: 'Conocida',
      rfc: 'AAAAAAAAAAAAA',
      telefono: '(472) 101 4838',
      activo: 1
    },
    {
      idCliente: 2,
      nombre: 'Edgar Carmona',
      direccion: 'Conocida',
      rfc: 'AAAAAAAAAAAAA',
      telefono: '(472) 101 4838',
      activo: 1
    }
  ];

  constructor(
    private http: HttpClient,
  ) { }

  getClientesTemp(){
    return this.clientesTemp;
  }

  getClientes(): Observable<Cliente[]>  {
    return this.http.get<Cliente[]>(`${environment.apiURL}/catalog/getAllCustomer`); 
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${environment.apiURL}/catalog/getCustomerByID/${id}`);
  }

  createCliente(cliente): Observable<Cliente>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Cliente>(`${environment.apiURL}/catalog/createCustomer`, JSON.stringify(cliente), { headers: headerss});
  }

  updateCliente(cliente: Partial<Cliente>): Observable<Cliente>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Cliente>(`${environment.apiURL}/catalog/updateCustomer`, JSON.stringify(cliente), { headers: headerss});
  }

  deleteCliente(cliente: Partial<Cliente>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Cliente>(`${environment.apiURL}/catalog/deleteCustomer`, JSON.stringify(cliente), { headers: headerss});
  }

}
