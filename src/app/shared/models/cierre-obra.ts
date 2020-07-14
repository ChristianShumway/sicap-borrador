export interface CierreObra {
  idCierreObra?: number;
  idObra: number;
  idUsuarioModifico?: number;
  leccionesAprendidas: LeccionAprendida[];
  totalCargoAdicional: number;
  totalFinanciamiento: number;
  totalIndirecto: number;
  totalManoObra: number;
  totalMaquinariaEquipo: number;
  totalMaterial: number;
  totalObra: number;
  totalSubcontrato: number;
  totalUtilidadEsperada: number;
  diasTotales: number;
  fechaInicio: string;
  fechaFin: string;
  estatus: number;
}

export interface LeccionAprendida {
  idLeccionAprendida?: number;
  idCierreObra: number;
  idUsuarioModifico: number;
  comentario: string;
}
