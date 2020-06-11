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
}
