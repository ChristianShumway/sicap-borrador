import { Injectable } from '@angular/core';
import { Obra } from './../models/obra';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { DocumentosObra } from './../models/documentos-obra';
import { MontoProgramado } from '../models/monto-programado';
import { Observacion } from '../models/observacion';
import { LineaBase } from '../models/linea-base';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  private obra: Obra;
  private obrasubject = new BehaviorSubject<Obra>(null);
  private archivoObra: DocumentosObra;
  private archivosObraSubject = new BehaviorSubject<DocumentosObra>(null);
  private archivosValidosObra: any;
  private archivosValidosObraSubject = new BehaviorSubject<any>(null);
  private montosObra: MontoProgramado;
  private montosObraSubject = new BehaviorSubject<MontoProgramado>(null);
  private lineaBase: LineaBase;
  private lineaBaseSubject = new BehaviorSubject<LineaBase>(null);

  private observacionesObra: Observacion[];
  private observacionesObraSubject = new BehaviorSubject<Observacion[]>(null);
  

  constructor(
    private http: HttpClient
  ) { }

  getObras(): Observable<Obra[]>  {
    return this.http.get<Obra[]>(`${environment.apiURL}/obra/getAllObra`); 
  }

  getDataObra(): Observable<Obra> {
    return this.obrasubject.asObservable();
  }

  private refresh() {
    this.obrasubject.next(this.obra);
  }
  
  getObraObservable(id:number){
    return this.http.get<Obra>(`${environment.apiURL}/obra/getObraByID/${id}`).subscribe(
      (obra: Obra) => {
        this.obra = obra;
        this.refresh();
      },
      error => console.log(error)
    );
  }
  
  getObra(id: number): Observable<Obra>{
    return this.http.get<Obra>(`${environment.apiURL}/obra/getObraByID/${id}`);
  }

  createObra(obra): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/createObra`, JSON.stringify(obra), { headers: headerss});
  }

  updateObra(obra: Partial<Obra>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/updateObra`, JSON.stringify(obra), { headers: headerss});
  }

  deleteObra(obra: Partial<Obra>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/deleteObra`, JSON.stringify(obra), { headers: headerss});
  }


  getDataArchivoObra(): Observable<DocumentosObra> {
    return this.archivosObraSubject.asObservable();
  }

  private refreshArchivos() {
    this.archivosObraSubject.next(this.archivoObra);
  }
  
  getArchivoObraObservable(id:number, type:number, idUser: number){
    return this.http.get<DocumentosObra>(`${environment.apiURL}/obra/getFilesObra/${id}/${type}/${idUser}`).subscribe(
      (documento: DocumentosObra) => {
        this.archivoObra = documento;
        this.refreshArchivos();
      },
      error => console.log(error)
    );
  }

  // NUEVO LISTA DOCUMENTOS

  getDataArchivosValidosObra(): Observable<any> {
    return this.archivosValidosObraSubject.asObservable();
  }

  private refreshArchivosValidos() {
    this.archivosValidosObraSubject.next(this.archivosValidosObra);
  }
  
  getArchivosValidosObraObservable(idObra:number){
    return this.http.get<any>(`${environment.apiURL}/projectExecution/getExpedienteUnicoObra/${idObra}`).subscribe(
      (documento: any) => {
        this.archivosValidosObra = documento;
        this.refreshArchivosValidos();
      },
      error => console.log(error)
    );
  }

  viewArchivos(idObra:number){
    return this.http.get<any>(`${environment.apiURL}/projectExecution/getExpedienteUnicoObra/${idObra}`);
  }


  // eND NUEVO LISTA DOCUMENTOS

  // deleteDocument(id: number, idUser: number): Observable<any>{
  //   return this.http.get<any>(`${environment.apiURL}/obra/deleteFilesObra/${id}/${idUser}`);
  // }

  deleteDocument(idExpediente: number, idUser: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/projectExecution/deleteFileExpediente/${idExpediente}/${idUser}`);
  }

  getPresupuestosParaMontosObra(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiURL}/obra/getBudgetType`); 
  }

  geTiposObservacionParaMontosObra(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiURL}/projectExecution/getObservationType`); 
  }

  getDataMontosObra(): Observable<MontoProgramado> {
    return this.montosObraSubject.asObservable();
  }

  private refreshMontos() {
    this.montosObraSubject.next(this.montosObra);
  }
  
  getMontosObraObservable(id:number){
    return this.http.get<MontoProgramado>(`${environment.apiURL}/obra/getBudgetByObra/${id}`).subscribe(
      (montos: MontoProgramado) => {
        this.montosObra = montos;
        this.refreshMontos();
      },
      error => console.log(error)
    );
  }

  createUpdateMontoObra(monto): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/updateBudget`, JSON.stringify(monto), { headers: headerss});
  }

  deleteMontoObra(monto: Partial<MontoProgramado>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/deleteBudget`, JSON.stringify(monto), { headers: headerss});
  }

  getDataLineaBase(): Observable<LineaBase> {
    return this.lineaBaseSubject.asObservable();
  }

  private refreshLineaBase() {
    this.lineaBaseSubject.next(this.lineaBase);
  }
  
  getLineaBaseObservable(id:number){
    return this.http.get<LineaBase>(`${environment.apiURL}/obra/getBaseLineByObra/${id}`).subscribe(
      (montos: LineaBase) => {
        this.lineaBase = montos;
        this.refreshLineaBase();
      },
      error => console.log(error)
    );
  }

  getPorcentajesLineaBase(id:number){
    return this.http.get<any>(`${environment.apiURL}/obra/getBaseLineByObra/${id}`);
  }

  createUpdateLineaBaseObra(periodo): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/updateBaseLine`, JSON.stringify(periodo), { headers: headerss});
  }

  deleteLineaBaseObra(monto: Partial<LineaBase>): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/deleteBaseLine`, JSON.stringify(monto), { headers: headerss});
  }

  getTiposDuracion(): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/obra/getDurationType`);
  }

  createObservacionObra(observacion): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/createObservation`, JSON.stringify(observacion), { headers: headerss});
  }

  updateObservacionObra(observacion): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/updateObservation`, JSON.stringify(observacion), { headers: headerss});
  }

  deleteObservacionObra(observacion): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/deleteObservation`, JSON.stringify(observacion), { headers: headerss});
  }

  // getExportarFicha(id: number) {
  //   return this.http.get<any>(`${environment.apiURL}/obra/getFichaPlaneacion/${id}`);
  // }

  getExportarFicha(idObra:number): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': '"application/x-www-form-urlencoded'});
    return this.http.get(`${environment.apiURL}/obra/getFichaPlaneacion/${idObra}`, {headers: headerss, responseType: 'blob',});
  }



  getObservacionesObra(): Observable<Observacion[]> {
    return this.observacionesObraSubject.asObservable();
  }

  private refreshObservaciones() {
    this.observacionesObraSubject.next(this.observacionesObra);
  }
  
  getObservacionesObraObservable(idObra:number){
    return this.http.get<Observacion[]>(`${environment.apiURL}/projectExecution/getObservationByObra/${idObra}/2`).subscribe(
      (observaciones: Observacion[]) => {
        this.observacionesObra = observaciones;
        this.refreshObservaciones();
      },
      error => console.log(error)
    );
  }

}
