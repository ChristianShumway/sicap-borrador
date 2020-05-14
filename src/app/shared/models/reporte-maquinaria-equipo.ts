import { ConceptoMaquinariaEquipo } from "./concepto-maquinaria-equipo";

export interface ReporteMaquinariaEquipo {
  idCapturaMaquinariaEquipo?: number;
  idObra: number;
  fechaCaptura: string;
  observacion: string;
  totalMaquinariaEquipo?: number;
  idUsuarioModifico?: number;
  detMaquinariaEquipo?: ConceptoMaquinariaEquipo[];
}
