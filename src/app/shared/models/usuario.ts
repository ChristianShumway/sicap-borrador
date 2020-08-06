import { Empresa } from "./empresa";
import { Perfil } from "./perfil";

export interface Usuario {
  idUsuario?: number;
  email: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombreCompleto?: string;
  usuario: string;
  idPerfil: number;
  perfil?: Perfil;
  idEmpresa?: number;
  idCliente?: number;
  empresa?: Empresa;
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  imagen?: string;
  contrasena?: string;
  cambiarContrasena: number;
  token?: string;
}
