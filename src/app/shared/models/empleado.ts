import {Empresa} from './../../shared/models/empresa';

export interface Empleado {
  idEmpleado?: number;
  nombre: string;
  idEmpresa: number;
  empresa?: Empresa;
  puesto: string;
  telefono: string;
  especialidad: string;
  activo?: number;
}
