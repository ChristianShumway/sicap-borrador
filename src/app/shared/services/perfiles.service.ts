import { Injectable } from '@angular/core';
import { Perfil } from './../models/perfil';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  // perfiles: Perfil[] = [
  //   {
  //     idPerfil: 1,
  //     nombre: 'Gerencia',
  //     descripcion: 'Perfil con todos los permisos'
  //   },
  //   {
  //     idPerfil: 2,
  //     nombre: 'Planeación y Presupuestos',
  //     descripcion: 'Perfil para usuario que realizaran planeación de obra y presupuesto de la misma'
  //   },
  //   {
  //     idPerfil: 3,
  //     nombre: 'Control de Obra',
  //     descripcion: 'Perfil en el cual se podrá llevar el contro de la obra'
  //   },
  //   {
  //     idPerfil: 4,
  //     nombre: 'Compras y Materiales',
  //     descripcion: 'Perfil para usuarios que llevarán el control de compras de materiales'
  //   },
  //   {
  //     idPerfil: 5,
  //     nombre: 'Supervisión',
  //     descripcion: 'Perfil para usuarios que llevarán la supervisión de una obra'
  //   },
  // ];

  constructor(
    private http: HttpClient
  ) { }

  getAllPerfiles() {
    return this.http.get<Perfil[]>(`${environment.apiURL}/catalog/getAllPerfiles`);
  };

  getPerfil(idPerfil: number){
    return this.http.get<Perfil>(`${environment.apiURL}/catalog/getPerfilByID/${idPerfil}`);
  }

  createPerfil(newProfile): Observable<Perfil>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Perfil>(`${environment.apiURL}/catalog/createPerfil`, JSON.stringify(newProfile), { headers: headerss});
  }

  updatePerfil(profile: Partial<Perfil>): Observable<Perfil>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Perfil>(`${environment.apiURL}/catalog/updatePerfil`, JSON.stringify(profile), { headers: headerss});
  }

}
