export interface ConceptoMaterial {
  idDetMaterial?: number;
  idMaterial: number;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  importe: number;
  cantidadTotalCapturado: number;
  cantidadCapturada: number;
  precioUnitarioCapturado: number;
  importeCapturado: number;
  idUsuarioModifico?: number;
  idCapturaMaterial?: number;
  unidad: string;
  partida?: string;
  extraordinario?: number;
}
