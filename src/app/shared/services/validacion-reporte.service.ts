import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';
import { ConceptoValidado } from './../models/concepto-validado';
import { SubcontratoValidado } from '../models/subcontrato-validado';


@Injectable({
  providedIn: 'root'
})
export class ValidacionReporteService {

  constructor(
    private http: HttpClient
  ) { }

  getValidationConceptExecuted(idObra: number, fechaInicio, fechaFin){
    return this.http.get<ConceptoValidado[]>(`${environment.apiURL}/projectExecution/getValidationConceptExecuted/${idObra}/${fechaInicio}/${fechaFin}`);
  }

  saveValidation(conceptsValidation): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/saveValidationConcepts`, JSON.stringify(conceptsValidation), { headers: headerss});
  }

  getValidationSubcontract(idObra: number, fechaInicio, fechaFin){
    return this.http.get<SubcontratoValidado[]>(`${environment.apiURL}/projectExecution/getValidationReportSubContract/${idObra}/${fechaInicio}/${fechaFin}`);
  }

  saveValidationSubcontract(conceptsValidation): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/saveReportSubContract`, JSON.stringify(conceptsValidation), { headers: headerss});
  }
  
}
