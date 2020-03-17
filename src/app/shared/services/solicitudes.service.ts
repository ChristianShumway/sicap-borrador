import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { SolicitudRecurso, SolicitudMaterial, SolicitudVehiculo, MaterialParaSolicitud } from './../models/solicitud';


@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(
    private http: HttpClient,
  ) { }

  // SOLICITUD RECURSO

  createSolicitudRecurso(solicitud): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<SolicitudRecurso>(`${environment.apiURL}/requestAndSupplies/createRequesResource`, JSON.stringify(solicitud), { headers: headerss});
  }

  getSolicitudRecursoById(tipoSolicitud: number, idSolicitud: number): Observable<SolicitudRecurso>{
    return this.http.get<SolicitudRecurso>(`${environment.apiURL}/requestAndSupplies/getRequestById/${tipoSolicitud}/${idSolicitud}`);
  }

  getCategoriasSolicitudRecursos(): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/getCategoriesRequesResources`);
  }
  // updateRequesResource
  // updateRequestMaterial

  // SOLICITUD MATERIALES

  createSolicitudMateriales(solicitud): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<SolicitudMaterial>(`${environment.apiURL}/requestAndSupplies/createRequestMaterial`, JSON.stringify(solicitud), { headers: headerss});
  }

  getSolicitudMaterialesById(tipoSolicitud: number, idSolicitud: number): Observable<SolicitudMaterial>{
    return this.http.get<SolicitudMaterial>(`${environment.apiURL}/requestAndSupplies/getRequestById/${tipoSolicitud}/${idSolicitud}`);
    // http://localhost:8080/requestAndSupplies/getRequestById/2/3
  }

  getListMaterialForResource(idObra: number): Observable<MaterialParaSolicitud[]> {
    return this.http.get<MaterialParaSolicitud[]>(`${environment.apiURL}/requestAndSupplies/getRequestMaterialEmpty/${idObra}`);
  }

  // GENERAL
  showStepByStepInResource(idSolicitud: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/getEstatusRequest/${idSolicitud}`);
    // http://108.175.5.160:8080/Sicap/requestAndSupplies/getEstatusRequest/1
  }
}
