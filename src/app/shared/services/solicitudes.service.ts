import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment'; 
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { SolicitudRecurso, SolicitudMaterial, SolicitudVehiculo, MaterialParaSolicitud, PeticionSolicitudRecurso } from './../models/solicitud';

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

  deletePeticion(idPeticion: number, tipoSolicitud: number): Observable<any>{
    return this.http.get<PeticionSolicitudRecurso>(`${environment.apiURL}/requestAndSupplies/deletedetRequest/${idPeticion}/${tipoSolicitud}`);
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

  addAdditionalMaterial(material): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/addAdditionalMaterial`, JSON.stringify(material), { headers: headerss});
  }

  // GENERAL
  // /getWorkOrden/{idUserio}/{etapa}/{tipoSolicitud}"
  getSolicitudesPorUsuario(idUsuario: number, etapa: number, tipoSolicitud: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/getWorkOrden/${idUsuario}/${etapa}/${tipoSolicitud}`);
  }
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

  validarSolicitudes(solicitud): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/setRequestValidation`, JSON.stringify(solicitud), { headers: headerss});
  }

  getSolicitudesValidadas(idUsuario: number, idEstado: number, idTipo: number) {
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/getWorkOrden/${idUsuario}/${idEstado}/${idTipo}`);
  }


  // ORDEN TRABAJO RECURSOS
  getSolicitudParaOrdenTrabajo(tipoSolicitud: number, idSolicitud: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/getEmptyOrdenWorked/${tipoSolicitud}/${idSolicitud}`);
  }
  
  createOrdenTrabajoRecursos(solicitud): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/createWokedOrdenResource`, JSON.stringify(solicitud), { headers: headerss});
  }


  
  updateOrdenTrabajo(orden: Partial<any>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/updateWokedOrdenResource`, JSON.stringify(orden), { headers: headerss});
  }

  // ORDEN TRABAJO MATERIALES
  createOrdenTrabajoMateriales(solicitud): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/createWokedOrdenMaterial`, JSON.stringify(solicitud), { headers: headerss});
  }

  updateOrdenTrabajoMateriales(orden: Partial<any>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/updateWokedOrdenMaterial`, JSON.stringify(orden), { headers: headerss});
  }

  //ORDEN TRABAJO VEHICULOS

  createOrdenTrabajoVehiculos(solicitud): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/createWokedOrdenEngineryAndTeam`, JSON.stringify(solicitud), { headers: headerss});
  }

  updateOrdenTrabajoVehiculos(orden: Partial<any>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/updateWokedOrdenEngineryAndTeam`, JSON.stringify(orden), { headers: headerss});
  }

  deleteDetalleOrdenTrabajo(idDetOrdenTrabajo: number, tipoOrden: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/deletedetOrder/${idDetOrdenTrabajo}/${tipoOrden}`);
  }

  deleteOrdenTrabajo(idOrdenTrabajo: number, tipoOrden: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/deleteOrden/${idOrdenTrabajo}/${tipoOrden}`);
  }

  getOrdenTrabajoById(tipoSolicitud: number, idOrdenTrabajo: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/getWorkedOrdenById/${tipoSolicitud}/${idOrdenTrabajo}`);
  }

  getVehiculosByObra(idObra: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/getVehicle/${idObra}`);
  }

  autorizarSolicitud(solicitud): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/setRequestAuthorize`, JSON.stringify(solicitud), { headers: headerss});
  }

  suministrarSolicitud(solicitud): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/requestAndSupplies/setSupply`, JSON.stringify(solicitud), { headers: headerss});
  }

  descargarSolicitud(idSolicitud: number, tipoSolicitud: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/printReource/${idSolicitud}/${tipoSolicitud}`);
  }
  
  descargarOrdenTrabajo(idOrdenTrabajo: number, tipoOrdenTrabajo: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/printWorkOrden/${idOrdenTrabajo}/${tipoOrdenTrabajo}`);
  }

  // getVehiculosByObra/{idObra}

  // getOrdenTrabajoById(tipoSolicitud: number, idOrdenTrabajo: number): Observable<any>{
  //   return this.http.get<any>(`${environment.apiURL}/requestAndSupplies/getWorkedOrdenById/${tipoSolicitud}/${idOrdenTrabajo}`);
  // }

}
