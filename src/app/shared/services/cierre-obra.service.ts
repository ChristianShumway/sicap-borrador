import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';
import { CierreObra, LeccionAprendida } from './../models/cierre-obra';

@Injectable({
  providedIn: 'root'
})
export class CierreObraService {

  constructor(
    private http: HttpClient
  ) { }
  
  getCierreObra(idObra: number): Observable<CierreObra>{
    return this.http.get<CierreObra>(`${environment.apiURL}/closeObra/getCloseObra/${idObra}`);
  }

  createCierreObra(cierreObra): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/closeObra/createCierreObra`, JSON.stringify(cierreObra), { headers: headerss});
  }

  createLeccionAprendida(leccion): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/closeObra/createLearnedLesson`, JSON.stringify(leccion), { headers: headerss});
  }

  deleteLeaccionAprendida(leccion: Partial<LeccionAprendida>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<LeccionAprendida>(`${environment.apiURL}/closeObra/deleteLearnedLesson`, JSON.stringify(leccion), { headers: headerss});
  }

  cerrarProyecto(proyecto: Partial<any>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/closeObra/closeProject`, JSON.stringify(proyecto), { headers: headerss});
  }

  descargarReporteCierreObra(idObra:number): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': '"application/x-www-form-urlencoded'});
    return this.http.get(`${environment.apiURL}/closeObra/printCloseObra/${idObra}`, {headers: headerss, responseType: 'blob',});
  }
}
