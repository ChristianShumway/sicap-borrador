import { Injectable } from '@angular/core';
import { Usuario } from './../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient,
  ) { }

  getUsuarios(): Observable<Usuario[]>  {
    //return this.users;
    return this.http.get<Usuario[]>(`${environment.apiURL}/user/getUsuarios`); 
  }

  createUsuario(newUser): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/user/createUser`, JSON.stringify(newUser), { headers: headerss});
  }

  getUsuario(id: number){
    // return this.users.find( user => user.idUsuario == id);
  }
}
