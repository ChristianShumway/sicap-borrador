import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListaPersonal } from '../models/lista-personal';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaPersonalService {

  private listaPersonal: ListaPersonal;
  private listaSubject = new BehaviorSubject<ListaPersonal>(null);

  constructor(
    private http: HttpClient
  ) { }
  
  getDataListaPersonal(): Observable<ListaPersonal> {
    return this.listaSubject.asObservable();
  }

  private refresh() {
    this.listaSubject.next(this.listaPersonal);
  }

  getListObservable(id:number, idUser: number){
    return this.http.get<ListaPersonal>(`${environment.apiURL}/obra/getFilesObra/${id}/2/${idUser}`).subscribe(
      (lista: ListaPersonal) => {
        this.listaPersonal = lista;
        this.refresh();
      },
      error => console.log(error)
    );
  }

  getListaPersonal(id: number, idUser: number): Observable<any>{
    return this.http.get<ListaPersonal>(`${environment.apiURL}/obra/getFilesObra/${id}/2/${idUser}`);
  }

  removeListaPersonal(idFile: number, idUser: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/obra/deleteFilesObra/${idFile}/${idUser}`);
  }

  createPersonalExtra(personal): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<ListaPersonal>(`${environment.apiURL}/obra/addStaff`, JSON.stringify(personal), { headers: headerss});
  }

  
}
