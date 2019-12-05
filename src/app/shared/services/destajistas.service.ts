import { Injectable } from '@angular/core';
import { Destajista } from './../models/destajista';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestajistasService {

  destajistasTemp: Destajista[] = [
    {
      idDestajista: 1,
      nombre: 'Gustavo Galindo',
      direccion: 'Conocida',
      ciudad: 'Silao',
      idEstado: 1,
      telefono: '(472) 101 4838',
      especialidad: 'conocida',
      activo: 1
    },
    {
      idDestajista: 2,
      nombre: 'Edgar Carmona',
      direccion: 'Conocida',
      ciudad: 'Puebla',
      idEstado: 2,
      telefono: '(472) 101 4838',
      especialidad: 'conocida',
      activo: 1
    }
  ];

  constructor(
    private http: HttpClient,
  ) { }

  getDestajistas(): Observable<Destajista[]>  {
    return this.http.get<Destajista[]>(`${environment.apiURL}/catalog/getAllDestajista`); 
  }

  getDestajista(id: number): Observable<Destajista>{
    return this.http.get<Destajista>(`${environment.apiURL}/catalog/getDestajistaID/${id}`);
  }

  createDestajista(destajista): Observable<Destajista>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Destajista>(`${environment.apiURL}/catalog/createDestajista`, JSON.stringify(destajista), { headers: headerss});
  }

  updateDestajista(destajista: Partial<Destajista>): Observable<Destajista>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Destajista>(`${environment.apiURL}/catalog/updateDestajista`, JSON.stringify(destajista), { headers: headerss});
  }

  deleteDestajista(destajista: Partial<Destajista>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Destajista>(`${environment.apiURL}/catalog/deleteDestajista`, JSON.stringify(destajista), { headers: headerss});
  }


}
