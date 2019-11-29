import { Injectable } from '@angular/core';
import { Usuario } from './../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuario = new BehaviorSubject<Usuario[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  getUsuarios(): Observable<Usuario[]>  {
    return this.http.get<Usuario[]>(`${environment.apiURL}/user/getUsuarios`); 
  }

  getUsuario(id: number){
    return this.http.get<Usuario>(`${environment.apiURL}/user/getUsuariosByID/${id}`);
  }

  createUsuario(newUser): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/user/createUser`, JSON.stringify(newUser), { headers: headerss});
  }

  updateUsuario(user: Partial<Usuario>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/user/updateUser`, JSON.stringify(user), { headers: headerss});
  }

}
