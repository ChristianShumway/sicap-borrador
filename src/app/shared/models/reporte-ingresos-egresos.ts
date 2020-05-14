export interface ReporteIngresosEgresos {
  idMovimientoMonetario?: number;
  idObra: number;
  fecha: string;
  descripcion:string;
  idReferencia: number;
  monto: number;
  egreso?: number;
  ingreso?: number;
  acumulado: number;
  idTipoMovimientoMonetario: number;
  idCategoriaMovimientoMonetario: number;
  idUsuarioModifico?: number;
  referencia?: any;
  tipoMovimiento?: any;
  categoriaMovimientoMonetario?: any;
}
