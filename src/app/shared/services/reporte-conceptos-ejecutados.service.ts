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

  getConceptExecutedByObra(id: number): Observable<ReporteConceptosEjecutados[]>{
    return this.http.get<ReporteConceptosEjecutados[]>(`${environment.apiURL}/projectExecution/getConceptExecutedByIdObra/${id}`);
  }

  addConceptExecuted(report): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<ReporteConceptosEjecutados>(`${environment.apiURL}/projectExecution/addConceptExecuted`, JSON.stringify(report), { headers: headerss});
  }

  getConceptsByReport(id: number): Observable<ConceptoEjecutado[]>{
    return this.http.get<ConceptoEjecutado[]>(`${environment.apiURL}/projectExecution/getConceptExecutedEmpty/${id}`);
  }

  deleteReportConceptExecuted(report: Partial<ReporteConceptosEjecutados>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteConceptExecuted`, JSON.stringify(report), { headers: headerss});
  }

}
