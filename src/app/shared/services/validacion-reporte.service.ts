import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConceptoValidado } from './../models/concepto-validado';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Rx';


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
  
}
