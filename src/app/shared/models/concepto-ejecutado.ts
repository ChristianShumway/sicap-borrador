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
  idConceptoPlanTrabajo: number;
  cantidadPlaneada: number;
  precioUnitarioPlaneado: number;
  importePlaneado: number;
}

