import { ConceptoMaterial } from "./concepto-material";

export interface ReporteMaterial {
  idCapturaMaterial?: number;
  idObra: number;
  fechaCaptura: string;
  totalMaterial?: number;
  observacion: string;
  idUsuarioModifico?: number;
  detMaterial?: ConceptoMaterial[];
}
