export interface Observacion {
  idObservacion?: number;
  evidenciaObservacion?: EvidenciaObservacion[];
  fechaCreo: string;
  idObra: number;
  comentario: string;
  idTipoObservacion: number;
  idUsuarioModifico: number;
  tipo: number;
}

export interface EvidenciaObservacion {
  extension: string;
  idEvidenciaObservacion?: number;
  idObservacion: number;
  idUsuarioAgrego: number;
  nombre: string;
  rutaLocal: string;
  url: string;
}
