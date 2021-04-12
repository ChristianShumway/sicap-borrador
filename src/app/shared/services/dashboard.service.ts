import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getDataObras(): Observable<any[]>  {
    return this.http.get<any[]>(`${environment.apiURL}/dashboard/getTotalObra`); 
  }
}
