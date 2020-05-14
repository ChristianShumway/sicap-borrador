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

  getCatalogoReferencia(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiURL}/projectExecution/getReference`);
  }

  getCatalogoTipo(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiURL}/projectExecution/getType`);
  }

  getCatalogoCategoria(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiURL}/projectExecution/getCategory`);
  }

  getReportsByObra(id: number): Observable<ReporteIngresosEgresos[]>{
    return this.http.get<ReporteIngresosEgresos[]>(`${environment.apiURL}/projectExecution/getMovementMonetaryByObra/${id}`);
  }

  addReport(report): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<ReporteIngresosEgresos>(`${environment.apiURL}/projectExecution/addMovementMonetary`, JSON.stringify(report), { headers: headerss});
  }

  deleteReport(report: Partial<ReporteIngresosEgresos>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteMovementMonetary`, JSON.stringify(report), { headers: headerss});
  }

}
