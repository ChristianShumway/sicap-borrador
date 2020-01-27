export interface CatalogoSubcontrato {
  idSubcontrato?: number;
  noSubcontrato: number
  descripcion: string;
  unidad: string;
  cantidad: number;
  precio: number;
  importe: number;
  idArchivoObra?: number;
  tipo?: number;
}
