// import {Http, Response} from "@angular/http";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Usuario } from './../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  loginUser(user) {
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/dashboard/autenticacion`, JSON.stringify(user), { headers: headerss})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user.idUsuario));
        this.currentUserSubject.next(user.idUsuario);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // loginUser(user): Observable<any>{
  //   const headerss = new HttpHeaders({'Content-Type': 'application/json'});
  //   return this.http.post<any>(`${environment.apiURL}/dashboard/autenticacion`, JSON.stringify(user), { headers: headerss});
  // }


}
