import { Empresa } from './empresa';
import { Cliente } from './cliente';
import { Usuario } from './usuario';
import { Destajista } from './destajista';

export interface Obra {
  idObra?: number;
  idEmpresa: number
  empresa?: Empresa;
  idCliente: number;
  cliente?: Cliente;
  noContrato: string;
  noLicitacion: string;
  nombreObra: string;
  lugarTrabajo: string;
  objetivo: string;
  fechaInicio: string;
  fechaFin: string;
  plazoEjecucion?: number;
  idGerente: number;
  gerente?: Usuario;
  idPlaneacionPresupuesto: number;
  planeacionPresupuesto?: Usuario;
  idControlObra: number;
  controlObra?: Usuario;
  idCompras: number;
  compras?: Usuario;
  idSupervisor?: number
  supervisor?: Usuario[];
  idDestajista?: number;
  destajista?: Destajista[];
  cantidadPersonal?: number;
  presupuestoTotal: number;
  presupuestoMaterial: number;
  presupuestoManoObra: number;
  presupuestoSubcontrato: number;
  presupuestoMaquinaria: number;
  importeIndirecto: number;
  importeFinanciamiento: number;
  utilidadEsperada: number;
  cargosAdicionales: number;
  presupuestoDestajo?: number;
  observacion?: any[];
  activo?: number;
  idUsuarioModifico?: number;
}
