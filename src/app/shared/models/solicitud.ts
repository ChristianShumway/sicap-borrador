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
  categoriaSolicitudRecurso: any;
}


export interface SolicitudRecurso {
  idSolicitudRecurso?: number;
  idEmpresa: number;
  empresa?: Empresa;
  idObra: number;
  obra?: Obra;
  fechaSolicitud: string;
  descripcion: string;
  // idUsuariosolicito: number;
  // usuarioSolicito?: Usuario;
  idAdministrador: number;
  administrador?: Usuario;
  idJefeImediato: number;
  jefeInmediato?: Usuario;
  idUsuarioModifico: number;
  detSolicitudRecurso: PeticionSolicitudRecurso[];
}

// SOLICITUD MATERIAL

export interface MaterialParaSolicitud {
  noMaterial?: number;
  conceptos: string;
  unidad: string;
  cantidad: number;
  comentarios?: string
}

export interface SolicitudMaterial {
  idSolicitud?: number;
  idEmpresa: number;
  empresa?: Empresa;
  idObra: number;
  obra?: Obra;
  fechaSolicitud: string;
  fechaRequiere: string;
  lugar: string;
  idUsuarioSolicito: number;
  usuarioSolicito?: Usuario;
  material?: MaterialParaSolicitud[];
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