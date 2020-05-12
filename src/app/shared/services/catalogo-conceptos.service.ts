import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CatalogoConceptos } from '../models/catalogo-conceptos';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';
import { CatalogoManoObra } from '../models/catalogo-mano-obra';
import { CatalogoSubcontrato } from '../models/catalogo-subcontrato';

@Injectable({
  providedIn: 'root'
})
export class CatalogoConceptosService {

  getDataColumns() {
    return [
      {
        prop: 'noConcepto',
        name: 'No'
      },
      {
        prop: 'descripcion',
        name: 'Descripcion'
      },
      {
        prop: 'unidad',
        name: 'Unidad'
      },
      {
        prop: 'cantidad',
        name: 'Cantidad'
      },
      {
        prop: 'precioUnitario',
        name: 'Precio Unitario'
      },
      {
        prop: 'importe',
        name: 'Importe'
      }
    ];
  }

  private catalogo: CatalogoConceptos;
  private catalogoSubject = new BehaviorSubject<CatalogoConceptos>(null);
  
  constructor(
    private http: HttpClient
  ) { }

  getDataCatalogo(): Observable<CatalogoConceptos> {
    return this.catalogoSubject.asObservable();
  }

  private refresh() {
    this.catalogoSubject.next(this.catalogo);
  }

  getCatalogObservable(id:number){
    return this.http.get<CatalogoConceptos>(`${environment.apiURL}/obra/getConceptsByObra/${id}`).subscribe(
      (catalog: CatalogoConceptos) => {
        this.catalogo = catalog;
        this.refresh();
      },
      error => console.log(error)
    );
  }

  getCatalogoObra(id: number): Observable<any>{
    return this.http.get<CatalogoConceptos>(`${environment.apiURL}/obra/getConceptsByObra/${id}`);
  }

  createConceptoExtraordinario(extraordinario): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<CatalogoConceptos>(`${environment.apiURL}/obra/addConcepts`, JSON.stringify(extraordinario), { headers: headerss});
  }

  removeCatalogoObra(id: number): Observable<any>{
    return this.http.get<any>(`${environment.apiURL}/obra/removeConcepts/${id}`);
  }

}
