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
      estado: 'Guanajuato',
      telefono: '(472) 101 4838',
      especialidad: 'conocida',
      activo: 1
    },
    {
      idDestajista: 2,
      nombre: 'Edgar Carmona',
      direccion: 'Conocida',
      ciudad: 'Puebla',
      estado: 'Puebla',
      telefono: '(472) 101 4838',
      especialidad: 'conocida',
      activo: 1
    }
  ];

  constructor(
    private http: HttpClient,
  ) { }

  getDestajistaTemp(){
    return this.destajistasTemp;
  }

  getDestajistas(): Observable<Destajista[]>  {
    return this.http.get<Destajista[]>(`${environment.apiURL}/catalog/getDestajistas`); 
  }

  getDestajista(id: number): Observable<Destajista>{
    return this.http.get<Destajista>(`${environment.apiURL}/catalog/getDestajistasByID/${id}`);
  }

  createDestajista(destajista): Observable<Destajista>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Destajista>(`${environment.apiURL}/catalog/createDestajista`, JSON.stringify(destajista), { headers: headerss});
  }

  updateDestajista(destajista: Partial<Destajista>): Observable<Destajista>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Destajista>(`${environment.apiURL}/catalog/updateDestajista`, JSON.stringify(destajista), { headers: headerss});
  }

  deleteDestajista(destajista: Partial<Destajista>): Observable<Destajista>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Destajista>(`${environment.apiURL}/catalog/deleteDestajista`, JSON.stringify(destajista), { headers: headerss});
  }


}
