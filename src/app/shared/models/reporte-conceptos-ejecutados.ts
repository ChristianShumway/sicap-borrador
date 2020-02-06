import { ConceptoEjecutado } from './concepto-ejecutado';

export interface ReporteConceptosEjecutados {
  idReporteConceptoEjecutado?: number;
  fechaInicio: string;
  fechaFinal: string;
  latitud: number;
  longitud: number;
  idObra: number;
  observacion: string;
  viewConceptWorkPlan?: ConceptoEjecutado[];
  idUsuarioModifico?: number;
}
