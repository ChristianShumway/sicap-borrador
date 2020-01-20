export interface ListaMaquinariaEquipo {
  idMaterial?: number;
  noMaterial: number;
  descripcion: string;
  unidad: string;
  cantidad: number;
  precioUnitario: number;
  importe: number;
  tipo?: number;
  idObra?: number;
}
