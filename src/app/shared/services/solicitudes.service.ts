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

  updateSolicitudRecurso(solicitud: Partial<SolicitudRecurso>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/updateRequesResource`, JSON.stringify(solicitud), { headers: headerss});
  }

  deleteSolicitud(idSolicitud: number, tipoSolicitud: number): Observable<any>{
    return this.http.get<SolicitudRecurso>(`${environment.apiURL}/requestAndSupplies/deleteRequest/${idSolicitud}/${tipoSolicitud}`);
  }

  // SOLICITUD MATERIALES

  createSolicitudMateriales(solicitud): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<SolicitudMaterial>(`${environment.apiURL}/requestAndSupplies/createRequestMaterial`, JSON.stringify(solicitud), { headers: headerss});
  }

  getSolicitudMaterialesById(tipoSolicitud: number, idSolicitud: number): Observable<SolicitudMaterial>{
    return this.http.get<SolicitudMaterial>(`${environment.apiURL}/requestAndSupplies/getRequestById/${tipoSolicitud}/${idSolicitud}`);
  }

  getListMaterialForResource(idObra: number): Observable<MaterialParaSolicitud[]> {
    return this.http.get<MaterialParaSolicitud[]>(`${environment.apiURL}/requestAndSupplies/getRequestMaterialEmpty/${idObra}`);
  }

  updateSolicitudMateriales(solicitud: Partial<SolicitudMaterial>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/updateRequestMaterial`, JSON.stringify(solicitud), { headers: headerss});
  }

  // SOLICITUD MAQUINARIA Y EQUIPO

  createSolicitudMaquinariaEquipo(solicitud): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<SolicitudVehiculo>(`${environment.apiURL}/requestAndSupplies/createRequestMaterialAndTeam`, JSON.stringify(solicitud), { headers: headerss});
  }

  getSolicitudMaquinariaEquipoById(tipoSolicitud: number, idSolicitud: number): Observable<SolicitudVehiculo>{
    return this.http.get<SolicitudVehiculo>(`${environment.apiURL}/requestAndSupplies/getRequestById/${tipoSolicitud}/${idSolicitud}`);
  }

  updateSolicitudVehiculos(solicitud: Partial<SolicitudVehiculo>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/updateRequestMaterialAndTeam`, JSON.stringify(solicitud), { headers: headerss});
  }

  // GENERAL
  showStepByStepInResource(idSolicitud: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/getEstatusRequest/${idSolicitud}`);
  }

  getResourcesByUser(idUser: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/getRequestMaterialByUser/${idUser}`);
  }

  getLogRequest(): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/getLogRequest`);
  }

  getSolicitudesParaValidar(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/getRequestPending`);
  }

}
