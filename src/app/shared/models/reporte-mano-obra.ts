import { ConceptoManoObra } from './concepto-mano-obra';

export interface ReporteManoObra {
  idCapturaManoObra?: number;
  idObra: number;
  fechaCaptura: string;
  observacion: string;
  idUsuarioModifico?: number;
  detManoObra?: ConceptoManoObra[];
  totalManoObra?: number;
}
