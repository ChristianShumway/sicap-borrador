import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Material } from '../models/material';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'environments/environment';
import { MaterialesConcepto } from './../models/materiales-concepto';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  getDataColumns() {
    return [
      {
        prop: 'noMaterial',
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

  private catalogo: Material;
  private catalogoSubject = new BehaviorSubject<Material>(null);

  constructor(
    private http: HttpClient
  ) { }

  getDataCatalogo(): Observable<Material> {
    return this.catalogoSubject.asObservable();
  }

  private refresh() {
    this.catalogoSubject.next(this.catalogo);
  }

  getCatalogObservable(id:number){
    return this.http.get<Material>(`${environment.apiURL}/obra/getMaterialsByObra/${id}`).subscribe(
      (catalog: Material) => {
        this.catalogo = catalog;
        this.refresh();
      },
      error => console.log(error)
    );
  }

  getCatalogoMateriales(id: number): Observable<any>{
    return this.http.get<Material>(`${environment.apiURL}/obra/getMaterialsByObra/${id}`);
  }

  createMaterialExtraordinario(extraordinario): Observable<any>{
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Material>(`${environment.apiURL}/obra/addMaterial`, JSON.stringify(extraordinario), { headers: headerss});
  }

  getMaterialAvailable(idObra, idConcepto){
    return this.http.get<MaterialesConcepto[]>(`${environment.apiURL}/obra/getMaterialAvailable/${idObra}/${idConcepto}`);
  }

  addMaterialsToConcept(materials){
    const headerss = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${environment.apiURL}/obra/addMaterialToConcept`, JSON.stringify(materials), { headers: headerss});
  }
}
