import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CatalogoManoObra } from '../models/catalogo-mano-obra';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogoManoObraService {

  private catalogoManoObra: CatalogoManoObra;
  private catalogoSubject = new BehaviorSubject<CatalogoManoObra>(null);

  constructor(
    private http: HttpClient
  ) { }
  
  getDataCatalogoManoObra(): Observable<CatalogoManoObra> {
    return this.catalogoSubject.asObservable();
  }

  private refresh() {
    this.catalogoSubject.next(this.catalogoManoObra);
  }

  getCatalogObservable(id:number, idUser: number){
    return this.http.get<CatalogoManoObra>(`${environment.apiURL}/obra/getFilesObra/${id}/4/${idUser}`).subscribe(
      (catalogo: CatalogoManoObra) => {
        this.catalogoManoObra = catalogo;
        this.refresh();
      },
      error => console.log(error)
    );
  }

  getCatalogoManoObra(id: number, idUser: number): Observable<any>{
    return this.http.get<CatalogoManoObra>(`${environment.apiURL}/obra/getFilesObra/${id}/4/${idUser}`);
  }

  removeCatalogoManoObra(idFile: number, idUser: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/obra/deleteFilesObra/${idFile}/${idUser}`);
  }

  createConceptoExtraordinario(extraordinario): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<CatalogoManoObra>(`${environment.apiURL}/obra/workforce`, JSON.stringify(extraordinario), { headers: headerss});
  }

}
