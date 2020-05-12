export interface ConceptoManoObra {
  idDetManoObra?: number;
  idManoObra: number;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  importe: number;
  cantidadTotalCapturada: number;
  cantidadCapturada: number;
  precioUnitarioCapturado: number;
  importeCapturado: number;
  idUsuarioModifico?: number;
  idCapturaManoObra?: number;
  unidad: string;
  partida: string;
  extraordinario?: number;
}
