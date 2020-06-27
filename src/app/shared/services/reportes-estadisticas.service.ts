import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReportesEstadisticasService {

  constructor(
    private http: HttpClient
  ) { }

  getControlAvanceSemanal(idObra:number, fechaInicio, fechaFin): Observable<any>  {
    return this.http.get<any>(`${environment.apiURL}/reportsandstatistics/getReportsandstatistics/${idObra}/${fechaInicio}/${fechaFin}`); 
  }

  descargarControlAvanceGeneral(idObra:number, fechaInicio, fechaFin): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': '"application/x-www-form-urlencoded'});
    return this.http.get(`${environment.apiURL}/reportsandstatistics/printReportsandstatistics/${idObra}/${fechaInicio}/${fechaFin}`, {headers: headerss, responseType: 'blob',});
  }

  getResumenSubcontrato(idObra:number, fechaInicio, fechaFin): Observable<any>  {
    return this.http.get<any>(`${environment.apiURL}/reportsandstatistics/getReportSubcontract/${idObra}/${fechaInicio}/${fechaFin}`); 
  }

  descargarResumenSubcontrato(idObra:number, fechaInicio, fechaFin): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': '"application/x-www-form-urlencoded'});
    return this.http.get(`${environment.apiURL}/reportsandstatistics/printReportSubcontract/${idObra}/${fechaInicio}/${fechaFin}`, {headers: headerss, responseType: 'blob',});
  }

  getEstadoCuentaObra(idObra:number, fechaInicio, fechaFin): Observable<any>  {
    return this.http.get<any>(`${environment.apiURL}/reportsandstatistics/getAccounStatus/${idObra}/${fechaInicio}/${fechaFin}`); 
  }

  descargarEstadoCuentaObra(idObra:number, fechaInicio, fechaFin): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': '"application/x-www-form-urlencoded'});
    return this.http.get(`${environment.apiURL}/reportsandstatistics/printAccounStatus/${idObra}/${fechaInicio}/${fechaFin}`, {headers: headerss, responseType: 'blob',});
  }

  getExpedienteUnicoObra(idObra:number): Observable<any>  {
    return this.http.get<any>(`${environment.apiURL}/reportsandstatistics/getProceedings/${idObra}`); 
  }
}
