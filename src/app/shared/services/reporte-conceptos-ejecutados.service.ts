import { Injectable } from '@angular/core';
import { ReporteConceptosEjecutados } from './../models/reporte-conceptos-ejecutados';
import { ConceptoEjecutado} from './../models/concepto-ejecutado';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { EvidenciaReporte } from './../models/evidencia-reporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteConceptosEjecutadosService {

  private evidencia: EvidenciaReporte[];
  private evidenciasubject = new BehaviorSubject<EvidenciaReporte[]>(null);

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

  getDataEvidence(): Observable<EvidenciaReporte[]> {
    return this.evidenciasubject.asObservable();
  }

  private refreshEvidence() {
    this.evidenciasubject.next(this.evidencia);
  }
  
  getEvidenceObservable(idConcept:number, idUser:number, fecha, tipo: number){
    return this.http.get<EvidenciaReporte[]>(`${environment.apiURL}/projectExecution/getEvidenciaByConcept/${idConcept}/${idUser}/${fecha}/${tipo}`).subscribe(
      (evidencia: EvidenciaReporte[]) => {
        this.evidencia = evidencia;
        this.refreshEvidence();
      },
      error => console.log(error)
    );
  }

  getEvidenceNormal(idConcept:number, idUser:number, fecha, tipo: number){
    return this.http.get<EvidenciaReporte[]>(`${environment.apiURL}/projectExecution/getEvidenciaByConcept/${idConcept}/${idUser}/${fecha}/${tipo}`);
  }

  deleteEvidenceConcept(evidence: Partial<EvidenciaReporte>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteEvidenceConcept`, JSON.stringify(evidence), { headers: headerss});
  }


}
