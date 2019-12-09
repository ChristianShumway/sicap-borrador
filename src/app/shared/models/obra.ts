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
  nombreObra: string;
  presupuestoTotal: number;
  fechaInicio: string;
  fechaFin: string;
  plazoEjecucion?: number;
  lugarTrabajo: string;
  idSupervisor: number
  supervisor?: Usuario;
  idDestajista: number;
  destajista?: Destajista;
  presupuestoMaterial: number;
  presupuestoManoObra: number;
  presupuestoMaquinaria: number;
  presupuestoDestajo: number;
  activo?: number;
}
