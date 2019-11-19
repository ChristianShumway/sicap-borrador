import { Empresa } from "./empresa";
import { Perfil } from "./perfil";

export interface Usuario {
  idUsuario: number,
  email: string,
  nombre: string,
  apellido: string,
  usuario: string,
  idPerfil: number,
  perfil?: Perfil,
  idEmpresa: number,
  empresa?: Empresa,
  telefono: string,
  direccion: string,
  fechaNacimiento: string,
  imagen: string,
  password: string,
}
