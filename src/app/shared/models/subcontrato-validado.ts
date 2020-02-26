export interface SubcontratoValidado {
  idSubContrato: number;
  descripcion: string;
  unidad: string;
  cantidadOriginal: number;
  cantidadReportada: number;
  precioUnitarioReportado: number;
  importeReportado: number;
  cantidadValidada: number;
  idDetConceptoEjecutado?: number;
  precioUnitarioValidado: number;
  importeValidado: number;
  idValidacionReporte?: number;
  observacion: string;
  idUsuarioModifico: number;
  idObra: number;
  fechaInicial?: string;
  fechaFinal?: string;
}
