import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CatalogoSubcontrato } from '../models/catalogo-subcontrato';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogoSubcontratoService {

  private catalogoSubcontrato: CatalogoSubcontrato;
  private catalogoSubject = new BehaviorSubject<CatalogoSubcontrato>(null);

  constructor(
    private http: HttpClient
  ) { }
  
  getDataCatalogoSubcontrato(): Observable<CatalogoSubcontrato> {
    return this.catalogoSubject.asObservable();
  }

  private refresh() {
    this.catalogoSubject.next(this.catalogoSubcontrato);
  }

  getCatalogObservable(id:number, idUser: number){
    return this.http.get<CatalogoSubcontrato>(`${environment.apiURL}/obra/getFilesObra/${id}/2/${idUser}`).subscribe(
      (catalogo: CatalogoSubcontrato) => {
        this.catalogoSubcontrato = catalogo;
        this.refresh();
      },
      error => console.log(error)
    );
  }

  getCatalogoSubcontrato(id: number, idUser: number): Observable<any>{
    return this.http.get<CatalogoSubcontrato>(`${environment.apiURL}/obra/getFilesObra/${id}/2/${idUser}`);
  }

  removeCatalogoSubcontrato(idFile: number, idUser: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/obra/deleteFilesObra/${idFile}/${idUser}`);
  }

  createConceptoExtraordinario(extraordinario): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<CatalogoSubcontrato>(`${environment.apiURL}/obra/addSubContract`, JSON.stringify(extraordinario), { headers: headerss});
  }

}
