export interface Material {
  idMaterial?: number;
  noMaterial: number;
  descripcion: string;
  partida: string;
  familia: string;
  cantidad: number;
  unidad: string;
  precioUnitario: number;
  importe: number;
  tipo?: number;
  idObra?: number;
  idUsuarioModifico?: number;
}
