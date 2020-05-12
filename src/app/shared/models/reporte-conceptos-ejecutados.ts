import { ConceptoEjecutado } from './concepto-ejecutado';

export interface ReporteConceptosEjecutados {
  idConceptoEjecutado?: number;
  idObra: number;
  latitud: number;
  longitud: number;
  fechaInicio: string;
  fechaFinal?: string;
  idUsuarioModifico?: number;
  observacion: string;
  viewConceptExecuted?: ConceptoEjecutado[];
}
