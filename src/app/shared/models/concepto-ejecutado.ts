export interface ConceptoEjecutado {
  idConcepto: number;
  noConcepto: number;
  descripcion: string;
  unidad: string;
  precioUnitario: number;
  importe: number;
  tipo?: number;
  idObra: number;
  cantidadOriginal: number;
  idDetConceptoEjecutado: number;
  cantidadEjecutada: number;
  precioUnitarioEjecutado: number;
  importeEjecutado: number;
}

