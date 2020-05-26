import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { ReporteManoObra } from './../models/reporte-mano-obra';
import { ConceptoManoObra } from './../models/concepto-mano-obra';

@Injectable({
  providedIn: 'root'
})
export class ReporteManoObraService {

  constructor(
    private http: HttpClient
  ) { }

  getReportsByObra(id: number): Observable<ReporteManoObra[]>{
    return this.http.get<ReporteManoObra[]>(`${environment.apiURL}/projectExecution/getWorkForceByIdObra/${id}`);
  }

  addReport(report): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<ReporteManoObra>(`${environment.apiURL}/projectExecution/addWorkforce`, JSON.stringify(report), { headers: headerss});
  }

  getCatalogByReport(id: number): Observable<ConceptoManoObra[]>{
    return this.http.get<ConceptoManoObra[]>(`${environment.apiURL}/projectExecution/getWorkForceEmpty/${id}`);
  }

  deleteReport(report: Partial<ReporteManoObra>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteWorkForce`, JSON.stringify(report), { headers: headerss});
  }

  getExportable(idObra:number, idUsuario:number): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': '"application/x-www-form-urlencoded'});
    return this.http.get(`${environment.apiURL}/projectExecution/exportWorkForce/${idObra}/${idUsuario}`, {headers: headerss, responseType: 'blob',});
  }

  getExportableBitacota(idObra:number): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': '"application/x-www-form-urlencoded'});
    return this.http.get(`${environment.apiURL}/projectExecution/exportLogObra/${idObra}`, {headers: headerss, responseType: 'blob',});
  }

}
