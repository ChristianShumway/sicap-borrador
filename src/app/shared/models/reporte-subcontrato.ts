import { ConceptoSubcontrato } from "./concepto-subcontrato";

export interface ReporteSubcontrato {
  idReporteSubContrato?: number;
  idObra: number;
  latitud: number;
  longitud: number;
  fechaInicio: string;
  fechaFinal: string;
  idUsuarioModifico?: number;
  observacion: string;
  viewReportSubContract?: ConceptoSubcontrato[];
}
