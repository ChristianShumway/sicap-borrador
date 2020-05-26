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
    return this.http.get<ReporteMaterial[]>(`${environment.apiURL}/projectExecution/getMaterialByIdObra/${id}`);
  }

  addReport(report): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<ReporteMaterial>(`${environment.apiURL}/projectExecution/addMaterial`, JSON.stringify(report), { headers: headerss});
  }

  getCatalogByReport(id: number): Observable<ConceptoMaterial[]>{
    return this.http.get<ConceptoMaterial[]>(`${environment.apiURL}/projectExecution/getMaterialEmpty/${id}`);
  }

  deleteReport(report: Partial<ReporteMaterial>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteMaterial`, JSON.stringify(report), { headers: headerss});
  }

  getExportable(idObra:number, idUsuario:number): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': '"application/x-www-form-urlencoded'});
    return this.http.get(`${environment.apiURL}/projectExecution/exportMaterial/${idObra}/${idUsuario}`, {headers: headerss, responseType: 'blob',});
  }

}
