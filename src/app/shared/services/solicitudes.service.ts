import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { SolicitudRecurso, SolicitudVehiculo } from './../models/solicitud';


@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(
    private http: HttpClient,
  ) { }

  createSolicitudRecurso(solicitud): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/createRequesResource`, JSON.stringify(solicitud), { headers: headerss});
  }

  getSolicitudRecurso(tipoSolicitud: number, idSolicitud: number): Observable<SolicitudRecurso>{
    return this.http.get<SolicitudRecurso>(`${environment.apiURL}/requestAndSupplies/getRequestById/${tipoSolicitud}/${idSolicitud}`);
  }

  getCategoriasSolicitudRecursos(): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/getCategoriesRequesResources`);
  }


}
