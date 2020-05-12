export interface CatalogoSubcontrato {
  idSubcontrato?: number;
  noSubcontrato: number
  descripcion: string;
  unidad: string;
  cantidad: number;
  precio: number;
  importe: number;
  idArchivoObra?: number;
  partida: string;
  tipo?: number;
  extraordinario?: number;
}
