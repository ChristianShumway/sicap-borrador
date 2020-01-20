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

  getListObservable(id:number){
    return this.http.get<ListaPersonal>(`${environment.apiURL}/obra/getMaterialsByObra/${id}`).subscribe(
      (lista: ListaPersonal) => {
        this.listaPersonal = lista;
        this.refresh();
      },
      error => console.log(error)
    );
  }

  getListaPersonal(id: number): Observable<any>{
    return this.http.get<ListaPersonal>(`${environment.apiURL}/obra/getMaterialsByObra/${id}`);
  }

  removeListaPersonal(id: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/obra/removeMaterials/${id}`);
  }
  
}
