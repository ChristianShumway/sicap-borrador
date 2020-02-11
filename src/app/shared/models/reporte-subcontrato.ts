import { ConceptoSubcontrato } from "./concepto-subcontrato";

export interface ReporteSubcontrato {
  idReporteSubcontrato?: number;
  idObra: number;
  latitud: number;
  longitud: number;
  fechaInicio: string;
  fechaFinal: string;
  idUsuarioModifico?: number;
  observacion: string;
  viewReportSubContract?: ConceptoSubcontrato[];
}
