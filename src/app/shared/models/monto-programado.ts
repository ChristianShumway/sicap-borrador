export interface MontoProgramado {
  idPresupuesto?: number;
  monto: number;
  fechaInicial: string;
  fechaFinal: string;
  noPresupuesto?: number;
  estatus?: number;
  idUsuarioCreo?: number;
  idUsuarioModifico?: number;
  idObra?: number;
  idTipoPresupuesto: number;
  idTipoDuracion: number;
  tipoDuracion?: any;
  idTipoPeriodo?: number;
}
