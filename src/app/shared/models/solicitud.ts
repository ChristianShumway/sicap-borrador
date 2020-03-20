import { Cliente } from "./cliente";
import { Obra } from './obra';
import { Usuario } from "./usuario";
import { Empresa } from "./empresa";

// SOLICITUD RECURSO

export interface PeticionSolicitudRecurso {
  idDetSolicitudRecurso?: number;
  idCategoriaSolicitudRecurso: number;
  desglose: string;
  importeSolicitadoSinFactura: number;
  importeSolicitadoConFactura: number;
  importeAutorizado?: number;
  comentario?: string
  comentarioRevision?: string,
  idUsuarioModifico: number;
  idSolicitudRecurso: number;
  categoriaSolicitudRecurso: any[];
}

export interface SolicitudRecurso {
  idSolicitudRecurso?: number;
  idEmpresa: number;
  idObra: number;
  descripcion: string;
  obra?: Obra;
  idUsuarioModifico: number;
  idUsuarioSolicito: number;
  fechaSolicito: string;
  detSolicitudRecurso: PeticionSolicitudRecurso[];
  empresa?: Empresa;
  pk?: number;
}

// SOLICITUD MATERIAL

export interface MaterialParaSolicitud {
  idMaterial?: number;
  noMaterial?: number;
  descripcion: string;
  unidad: string;
  idObra?: number;
  cantidadSolictada: number;
  comentario?: string;
  idDetSolicitudMateral?: number;
  idUsuarioModifico?: number;
  idSolicitudMaterial?: number;
  pk?: number;
} 

export interface SolicitudMaterial {
  idSolicitudMaterial?: number;
  idEmpresa: number;
  idObra: number;
  descripcion: string;
  fechaRequiere: string;
  lugarRecepcion: string;
  idUsuarioSolicito: number;
  fechaSolicito: string;
  idUsuarioModifico: number;
  obra?: Obra;
  detSolicitudMaterial?: MaterialParaSolicitud[];
}

// SOLICITUD VEHICULO

export interface SolicitudVehiculo {
  idSolicitudMaquinariaEquipo?: number;
  folio?: number;
  descripcion: string;
  idObra: number;
  fechaSolicitud: string;
  telefonoContacto: string;
  correoElectronico: string;
  fechaInicialUso: string;
  fechaFinalUso: string;
  lugar: string;
  idUsuarioSolicito: number;
  idUsuarioModifico: number;
  fechaModificacion?: number;
  obra?: Obra; 
  observacion?: string;
  idServicioInteres: number;
  servicioInteres?: any;
  // idEmpresa: number;
  // empresa?: Cliente;
}

export interface TableroControl {
  idSolicitud?: number;
  folio: string;
  descripcion: string;
  empresa?: Empresa;
  obra?: Obra;
  solicitante?: Usuario;
  fechaSolicitud?: string;
  fechaValidacion?: string;
  fechaOrdenTrabajo?: string;
  fechaAutorizacionSuministro?: string;
}
