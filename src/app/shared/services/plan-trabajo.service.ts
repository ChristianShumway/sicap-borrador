import { Injectable } from '@angular/core';
import { PlanTrabajo } from './../models/plan-trabajo';
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

  getUsuario(id: number): Observable<PlanTrabajo>{
    return this.http.get<PlanTrabajo>(`${environment.apiURL}/projectExecution/getWorkPlanById/${id}`);
  }

  createUsuario(newPlan): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/projectExecution/addWorkplan`, JSON.stringify(newPlan), { headers: headerss});
  }
}
