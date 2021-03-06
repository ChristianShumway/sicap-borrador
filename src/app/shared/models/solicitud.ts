import { Cliente } from "./cliente";
import { Obra } from './obra';
import { Usuario } from "./usuario";
import { Empresa } from "./empresa";

// SOLICITUD RECURSO

export interface PeticionSolicitudRecurso {
  idDetSolicitudRecurso?: number;
  idTipoMovimientoMonetario: number;
  idCategoriaMovimientoMonetario: number;
  desglose: string;
  importeSolicitadoSinFactura: number;
  importeSolicitadoConFactura: number;
  comentario?: string
  idUsuarioModifico: number;
  idSolicitudRecurso?: number;
  tipoMovimientoMonetario?: any[];
  categoriaMovimientoMonetario?: any[];
}

export interface SolicitudRecurso {
  idSolicitudRecurso?: number;
  idEmpresa: number;
  idObra: number;
  descripcion?: string;
  observacionesAdicionales?: string;
  obra?: Obra;
  idUsuarioModifico: number;
  idUsuarioSolicito: number;
  fechaSolicito: string;
  detSolicitudRecurso: PeticionSolicitudRecurso[];
  empresa?: Empresa;
  pk?: number;
  serieFolio?: string;
  usuarioSolicito?: Usuario;
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
  familia: string;
  idCategoriaSolicitudMaterial: number;
  categoriaSolicitudMaterial?: any;
  proveedor?: string;
  precio?: number;
  importe?: number;
} 

export interface SolicitudMaterial {
  idSolicitudMaterial?: number;
  idEmpresa: number;
  idObra: number;
  descripcion?: string;
  observacionesAdicionales?: string;
  fechaRequiere: string;
  lugarRecepcion: string;
  idUsuarioSolicito: number;
  fechaSolicito: string;
  idUsuarioModifico: number;
  obra?: Obra;
  detSolicitudMaterial?: MaterialParaSolicitud[];
  serieFolio?: string;
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
  observacion: string;
  idServicioInteres: number;
  servicioInteres?: any;
  serieFolio?: string;
  detSolicitudMaquinriaEquipo?: any[];
  // idEmpresa: number;
  // empresa?: Cliente;
}

export interface TableroControl {
  colorEditarSolitud: string;
  colorEliminarSolitud: string;
  colorValidar: string;
  editarSolicitud: boolean;
  eliminarSolicitud: boolean;
  estatus: string;
  fechaRechazo: string;
  fechaSolicito: string;
  fechaValidacion: string;
  folio: string;
  idObra: number;
  idSolicitud: number;
  idTipo: number;
  idUsuarioRechazo: number;
  idUsuarioSolicito: number;
  idUsuarioValido: number;
  obra: Obra;
  tipo: string;
  usuarioRechazo: any;
  usuarioSolicito: Usuario;
  usuarioValido: any;
  validar: boolean;
}

// ORDENES DE TRABAJO

export interface DetallesOrdenTrabajoRecurso {
  idDetOrdenTrabajoRecurso?: number;
  idOrdenTrabajoRecurso: number;
  idCategoriaSolicitudRecurso: number;
  importeSolicitadoSinFactura: number;
  importeSolicitadoConFactura: number;
  comentario: string;
  idUsuarioModifico: number;
  pk?: number;
}

export interface OrdenTrabajoRecurso {
  idOrdenTrabajoRecurso?: number;
  idSolicitudRecurso: number;
  folio?: string;
  idUsuarioModifico: number;
  detOrdenTrabajoRecurso: DetallesOrdenTrabajoRecurso[];
  idSolicitud: number;
  observacion?: string;
}

export interface OrdenPagoMaterial {
  solicitud: any[];
  idUsuarioModifico: number;
  idUsuarioGeneroOrden: number;
  fechaRealizo: string;
}
