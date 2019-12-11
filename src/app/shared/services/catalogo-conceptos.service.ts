import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatalogoConceptos } from '../models/catalogo-conceptos';

@Injectable({
  providedIn: 'root'
})
export class CatalogoConceptosService {

  catalogoConceptosTemp: CatalogoConceptos[] = [
    {
      numero: 1,
      descricion: 'Poda de Árbol tipo "A"',
      unidad: 'Árbol',
      cantidad: 720,
      precioUnitario: 152.99,
      importe:  110152.80 
    }
  ];

  constructor(
    private http: HttpClient
  ) { }
}
