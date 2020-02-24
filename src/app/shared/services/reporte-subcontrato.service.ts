import { Injectable } from '@angular/core';
import { ReporteSubcontrato } from './../models/reporte-subcontrato';
import { ConceptoSubcontrato} from './../models/concepto-subcontrato';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { EvidenciaReporte } from './../models/evidencia-reporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteSubcontratoService {

  constructor(
    private http: HttpClient
  ) { }

  getReportSubContractdByObra(id: number): Observable<ReporteSubcontrato[]>{
    return this.http.get<ReporteSubcontrato[]>(`${environment.apiURL}/projectExecution/getReportSubContractdByIdObra/${id}`);
  }

  addReportSubcontract(report): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<ReporteSubcontrato>(`${environment.apiURL}/projectExecution/addReportSubcontract`, JSON.stringify(report), { headers: headerss});
  }

  getConceptsByReport(id: number): Observable<ConceptoSubcontrato[]>{
    return this.http.get<ConceptoSubcontrato[]>(`${environment.apiURL}/projectExecution/getSubContractExecutedEmpty/${id}`);
  }

  deleteReportSubcontract(report: Partial<ReporteSubcontrato>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteReportSubcontract`, JSON.stringify(report), { headers: headerss});
  }

  deleteEvidenceSubcontrat(evidence: Partial<EvidenciaReporte>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteEvidenceSubcontract`, JSON.stringify(evidence), { headers: headerss});
  }


}
