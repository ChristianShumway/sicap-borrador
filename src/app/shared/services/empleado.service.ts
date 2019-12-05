import { Injectable } from '@angular/core';
import { Empleado } from './../models/empleado';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  empleadosTemp: Empleado[] = [
    {
      idEmpleado: 1,
      nombre: 'Gustavo Galindo',
      idEmpresa: 1,
      puesto: 'Conocida',
      telefono: '(472) 101 4838',
      especialidad: 'conocida',
      activo: 1
    },
    {
      idEmpleado: 2,
      nombre: 'Edgar Carmona',
      idEmpresa: 1,
      puesto: 'Conocida',
      telefono: '(472) 101 4838',
      especialidad: 'conocida',
      activo: 1
    }
  ];

  constructor(
    private http: HttpClient,
  ) { }

  getEmpleados(): Observable<Empleado[]>  {
    return this.http.get<Empleado[]>(`${environment.apiURL}/catalog/getAllEmpleado`); 
  }

  getEmpleado(id: number): Observable<Empleado>{
    return this.http.get<Empleado>(`${environment.apiURL}/catalog/getEmplyByID/${id}`);
  }

  createEmpleado(empleado): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Empleado>(`${environment.apiURL}/catalog/createEmploye`, JSON.stringify(empleado), { headers: headerss});
  }

  updateEmpleado(empleado: Partial<Empleado>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Empleado>(`${environment.apiURL}/catalog/updateEmploye`, JSON.stringify(empleado), { headers: headerss});
  }

  deleteEmpleado(empleado: Partial<Empleado>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/catalog/deleteEmploye`, JSON.stringify(empleado), { headers: headerss});
  }

}
