import { Injectable } from '@angular/core';
import { Obra } from './../models/obra';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { CatalogoConceptos } from './../models/catalogo-conceptos';

@Injectable({
  providedIn: 'root'
})
export class ObraSupervisionService {

  // private obra: Obra[] = [];
  // private obrasubject = new BehaviorSubject<Obra[]>([]);
  private catalogo: CatalogoConceptos[] = [];
  private catalogoSubject = new BehaviorSubject<CatalogoConceptos[]>([]);
  
  constructor(
    private http: HttpClient
  ) { }

  
  // getDataObra(): Observable<Obra[]> {
  //   return this.obrasubject.asObservable();
  // }

  // private refresh() {
  //   this.obrasubject.next(this.obra);
  // }
  
  // getObraObservable(id:number){
  //   return this.http.get<Obra[]>(`${environment.apiURL}/obra/getObraByID/${id}`).subscribe(
  //     (obra: Obra[]) => {
  //       this.obra = obra;
  //       console.log(this.obra);
  //       this.refresh();
  //     },
  //     error => console.log(error)
  //   );
  // }

  getDataCatalogo(): Observable<CatalogoConceptos[]> {
    return this.catalogoSubject.asObservable();
  }

  private refresh() {
    this.catalogoSubject.next(this.catalogo);
  }

  getCatalogObservable(id:number){
    return this.http.get<CatalogoConceptos[]>(`${environment.apiURL}/obra/getConceptsByObra/${id}`).subscribe(
      (catalog: CatalogoConceptos[]) => {
        this.catalogo = catalog;
        this.refresh();
      },
      error => console.log(error)
    );
  }
  

}
