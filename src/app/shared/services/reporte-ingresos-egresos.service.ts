import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { ReporteIngresosEgresos } from './../models/reporte-ingresos-egresos';

@Injectable({
  providedIn: 'root'
})
export class ReporteIngresosEgresosService {

  constructor(
    private http: HttpClient
  ) { }

  getReportsByObra(id: number): Observable<ReporteIngresosEgresos[]>{
    return this.http.get<ReporteIngresosEgresos[]>(`${environment.apiURL}/projectExecution/getWorkForceByIdObra/${id}`);
  }

  addReport(report): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<ReporteIngresosEgresos>(`${environment.apiURL}/projectExecution/addWorkforce`, JSON.stringify(report), { headers: headerss});
  }

  deleteReport(report: Partial<ReporteIngresosEgresos>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteWorkForce`, JSON.stringify(report), { headers: headerss});
  }

}
