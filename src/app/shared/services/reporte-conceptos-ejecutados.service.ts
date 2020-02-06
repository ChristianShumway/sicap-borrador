import { Injectable } from '@angular/core';
import { ReporteConceptosEjecutados } from './../models/reporte-conceptos-ejecutados';
import { ConceptoEjecutado} from './../models/concepto-ejecutado';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteConceptosEjecutadosService {

  constructor(
    private http: HttpClient
  ) { }

  getWorkPlanByObra(id: number): Observable<ReporteConceptosEjecutados[]>{
    return this.http.get<ReporteConceptosEjecutados[]>(`${environment.apiURL}/projectExecution/getWorkPlanByIdObra/${id}`);
  }

  addWorkPlan(report): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<ReporteConceptosEjecutados>(`${environment.apiURL}/projectExecution/addWorkplan`, JSON.stringify(report), { headers: headerss});
  }

  getConceptsByWorkPlan(id: number): Observable<ConceptoEjecutado[]>{
    return this.http.get<ConceptoEjecutado[]>(`${environment.apiURL}/projectExecution/getConceptWorkPlanEmpty/${id}`);
  }

  deleteWorkPlan(report: Partial<ReporteConceptosEjecutados>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteWorkplan`, JSON.stringify(report), { headers: headerss});
  }

  deleteConceptOfWorkPlan(concept: Partial<ReporteConceptosEjecutados>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteConceptWorkplan `, JSON.stringify(concept), { headers: headerss});
  }
}
