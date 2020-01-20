import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListaMaquinariaEquipo } from '../models/lista-maquinaria-equipo';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaMaquinariaEquipoService {

  private listaMaquinariaEquipo: ListaMaquinariaEquipo;
  private listaSubject = new BehaviorSubject<ListaMaquinariaEquipo>(null);

  constructor(
    private http: HttpClient
  ) { }
  
  getDataListaMaquinariaEquipo(): Observable<ListaMaquinariaEquipo> {
    return this.listaSubject.asObservable();
  }

  private refresh() {
    this.listaSubject.next(this.listaMaquinariaEquipo);
  }

  getListObservable(id:number){
    return this.http.get<ListaMaquinariaEquipo>(`${environment.apiURL}/obra/getMaterialsByObra/${id}`).subscribe(
      (lista: ListaMaquinariaEquipo) => {
        this.listaMaquinariaEquipo = lista;
        this.refresh();
      },
      error => console.log(error)
    );
  }

  getListaMaquinariaEquipo(id: number): Observable<any>{
    return this.http.get<ListaMaquinariaEquipo>(`${environment.apiURL}/obra/getMaterialsByObra/${id}`);
  }

  removeListaMaquinariaEquipo(id: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/obra/removeMaterials/${id}`);
  }

}
