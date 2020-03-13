import { Cliente } from "./cliente";
import { Obra } from './obra';
import { Usuario } from "./usuario";
import { Empresa } from "./empresa";

// SOLICITUD RECURSO

export interface PeticionSolicitudRecurso {
  idDetSolicitudRecurso?: number;
  idCategoriaSolicitudRecurso: number;
  desglose: string;
  importeSolicitado: number;
  importeAutorizado?: number;
  comentario?: string,
  idUsuarioModifico: number;
  idSolicitudRecurso: number;
  categoriaSolicitudRecurso: any[];
}

export interface SolicitudRecurso {
  idSolicitudRecurso?: number;
  idEmpresa: number;
  idObra: number;
  empresa?: Empresa;
  descripcion: string;
  idAdministrador: number;
  idJefeImediato: number;
  administrdor?: Usuario;
  jefeInmediato?: Usuario;
  obra?: Obra;
  idUsuarioModifico: number;
  idUsuarioSolicito: number;
  fechaSolicito: string;
  // usuarioSolicito?: Usuario;
  detSolicitudRecurso: PeticionSolicitudRecurso[];
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
  folio?: number;
  idEmpresaCliente: number;
  empresaCliente?: Cliente;
  idObra: number;
  obra?: Obra; 
  fechaSolicitud: string;
  telefono: string;
  email: string;
  fechaInicioUso: string;
  fechaFinalUso: string;
  lugar: string;
  descripcion: string;
  idServicioInteres: number;
  servicioInteres?: any;
  observacionAdicional?: string;
  idUsuarioSolicito: number;
  usuarioSolicito?: Usuario;
}

// •	Administración Central (idUsuarioAdministracion y usuarioAdministracion[objeto de usuario])
// •	Nombre Jefe inmediato (idUsuarioAutorizo y usuarioAutorizo[objeto de usuario])
//       idUsuarioAdministracion: new FormControl(''),
//       idJefeInmediato: new FormControl('')