import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { ReporteMaquinariaEquipo } from './../models/reporte-maquinaria-equipo';
import { ConceptoMaquinariaEquipo } from './../models/concepto-maquinaria-equipo';

@Injectable({
  providedIn: 'root'
})
export class ReporteMaquinariaEquipoService {

  constructor(
    private http: HttpClient
  ) { }

  getReportsByObra(id: number): Observable<ReporteMaquinariaEquipo[]>{
    return this.http.get<ReporteMaquinariaEquipo[]>(`${environment.apiURL}/projectExecution/getEngineryAndTeamByIdObra/${id}`);
  }

  addReport(report): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<ReporteMaquinariaEquipo>(`${environment.apiURL}/projectExecution/addEngineryAndTeam`, JSON.stringify(report), { headers: headerss});
  }

  getCatalogByReport(id: number): Observable<ConceptoMaquinariaEquipo[]>{
    return this.http.get<ConceptoMaquinariaEquipo[]>(`${environment.apiURL}/projectExecution/getEngineryAndTeamlEmpty/${id}`);
  }

  deleteReport(report: Partial<ReporteMaquinariaEquipo>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteEngineryAndTeam`, JSON.stringify(report), { headers: headerss});
  }

}
