export interface ConceptoValidado {
  idConcepto: number;
  descripcion: string;
  unidad: string;
  cantidadOriginal: number;
  cantidadEjecutada: number;
  precioUnitarioEjecutado: number;
  importeEjecutado: number;
  cantidadValidada: number;
  idDetConceptoEjecutado?: number;
  precioUnitarioValidado: number;
  importeValidado: number;
  idValidacionConcepto?: number;
  observacion: string;
  idUsuarioModifico: number;
  idObra: number;
  fechaInicial?: string;
  fechaFinal?: string;
  cantidadValidadaAnterior?: number;
}

