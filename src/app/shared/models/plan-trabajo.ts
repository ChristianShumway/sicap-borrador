import { ConceptoPlanTrabajo } from "./concepto-plan-trabajo";

export interface PlanTrabajo {
  idPlanTrabajo?: number;
  fechaInicio: string;
  fechaFinal: string;
  idObra: number;
  observacion?: string;
  viewConceptWorkPlan?: ConceptoPlanTrabajo[];
  idUsuarioModifico?: number;
}
