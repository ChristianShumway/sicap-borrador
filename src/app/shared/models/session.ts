import { Usuario } from './usuario';

export interface Session {
  token: string;
  user: Usuario;
}
