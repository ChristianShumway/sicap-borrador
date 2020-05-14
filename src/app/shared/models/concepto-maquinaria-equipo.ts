export interface ConceptoMaquinariaEquipo {
  idDetMaquinariaEquipo?: number;
  idVehiculo: number;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  importe: number;
  cantidadTotalCapturado: number;
  cantidadCapturada: number;
  precioUnitarioCapturado: number;
  importeCapturado: number;
  idUsuarioModifico?: number;
  idCapturaMaquinariaEquipo?: number;
  unidad: string;
  partida?: string;
  extraordinario?: number;
}
