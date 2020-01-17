import { Injectable } from '@angular/core';
import { Obra } from './../models/obra';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { DocumentosObra } from './../models/documentos-obra';
import { MontoProgramado } from '../models/monto-programado';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  private obra: Obra;
  private obrasubject = new BehaviorSubject<Obra>(null);
  private archivoObra: DocumentosObra;
  private archivosObraSubject = new BehaviorSubject<DocumentosObra>(null);
  private montosObra: MontoProgramado;
  private montosObraSubject = new BehaviorSubject<MontoProgramado>(null);
  

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
  
  getArchivoObraObservable(id:number){
    return this.http.get<DocumentosObra>(`${environment.apiURL}/obra/getFilesObra/${id}`).subscribe(
      (documento: DocumentosObra) => {
        this.archivoObra = documento;
        this.refreshArchivos();
      },
      error => console.log(error)
    );
  }

  deleteDocument(id: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/obra/deleteFilesObra/${id}`);
  }

  getPresupuestosParaMontosObra(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiURL}/obra/getBudgetType`); 
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

}
