export interface MaterialesConcepto {
  cantidadAntesDeLaOperacion?: number;
  cantidadDisponible: number;
  cantidadOriginal: number;
  cantidadSeleccionada: number;
  descripcion: string;
  idConcepto: number;
  idMaterial: number;
  idRelacionConceptoMaterial?: number;
  idUsuarioModifico: number;
  message?: string;
  statusCode?: number;
}
