import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { ReporteMaterial } from './../models/reporte-material';
import { ConceptoMaterial } from './../models/concepto-material';

@Injectable({
  providedIn: 'root'
})
export class ReporteMaterialService {

  constructor(
    private http: HttpClient
  ) { }

  getReportsByObra(id: number): Observable<ReporteMaterial[]>{
    return this.http.get<ReporteMaterial[]>(`${environment.apiURL}/projectExecution/getWorkForceByIdObra/${id}`);
  }

  addReport(report): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<ReporteMaterial>(`${environment.apiURL}/projectExecution/addWorkforce`, JSON.stringify(report), { headers: headerss});
  }

  getCatalogByReport(id: number): Observable<ConceptoMaterial[]>{
    return this.http.get<ConceptoMaterial[]>(`${environment.apiURL}/projectExecution/getWorkForceEmpty/${id}`);
  }

  deleteReport(report: Partial<ReporteMaterial>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteWorkForce`, JSON.stringify(report), { headers: headerss});
  }

}
