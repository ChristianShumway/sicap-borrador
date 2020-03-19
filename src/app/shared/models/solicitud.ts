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
  fechaRequiere: string;
  lugarRecepcion: string;
  descripcion?: string;
  idAdministrador: number;
  idJefeInmediato: number;
  idUsuarioSolicito: number;
  fechaSolicito: string;
  idUsuarioModifico: number;
  administrdor?: Usuario;
  jefeInmediato?: Usuario;
  obra?: Obra;
  // empresa?: Empresa;
  // usuarioSolicito?: Usuario;
  detSolicitudMaterial?: MaterialParaSolicitud[];
}

// SOLICITUD VEHICULO

export interface SolicitudVehiculo {
  idSolicitudMaquinariaEquipo?: number;
  idObra: number;
  fechaSolicitud: string;
  telefonoContacto: string;
  correoElectronico: string;
  fechaInicialUso: string;
  fechaFinalUso: string;
  lugar: string;
  descripcionServicio: string;
  idUsuarioSolicito: number;
  idUsuarioModifico: number;
  obra?: Obra; 
  folio?: number;
  idEmpresa: number;
  empresa?: Cliente;
  idServicioInteres: number;
  servicioInteres?: any;
  observacionAdicional?: string;
}

// •	Administración Central (idUsuarioAdministracion y usuarioAdministracion[objeto de usuario])
// •	Nombre Jefe inmediato (idUsuarioAutorizo y usuarioAutorizo[objeto de usuario])
//       idUsuarioAdministracion: new FormControl(''),
//       idJefeInmediato: new FormControl('')