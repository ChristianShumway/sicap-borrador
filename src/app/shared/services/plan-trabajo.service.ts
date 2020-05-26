import { Injectable } from '@angular/core';
import { PlanTrabajo } from './../models/plan-trabajo';
import { ConceptoPlanTrabajo} from './../models/concepto-plan-trabajo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanTrabajoService {

  constructor(
    private http: HttpClient,
  ) { }

  getWorkPlanByObra(id: number): Observable<PlanTrabajo[]>{
    return this.http.get<PlanTrabajo[]>(`${environment.apiURL}/projectExecution/getWorkPlanByIdObra/${id}`);
  }

  addWorkPlan(plan): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<PlanTrabajo>(`${environment.apiURL}/projectExecution/addWorkplan`, JSON.stringify(plan), { headers: headerss});
  }

  getConceptsByWorkPlan(id: number): Observable<ConceptoPlanTrabajo[]>{
    return this.http.get<ConceptoPlanTrabajo[]>(`${environment.apiURL}/projectExecution/getConceptWorkPlanEmpty/${id}`);
  }

  deleteWorkPlan(plan: Partial<PlanTrabajo>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteWorkplan`, JSON.stringify(plan), { headers: headerss});
  }

  deleteConceptOfWorkPlan(concept: Partial<ConceptoPlanTrabajo>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/deleteConceptWorkplan `, JSON.stringify(concept), { headers: headerss});
  }

  getExportable(idPlan:number): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': '"application/x-www-form-urlencoded'});
    return this.http.get(`${environment.apiURL}/projectExecution/exportWorkPlan/${idPlan}`, {headers: headerss, responseType: 'blob',});
  }

}
