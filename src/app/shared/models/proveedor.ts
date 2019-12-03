export interface Proveedor {
  idProveedor?: number;
  nombre: string;
  razonSocial: string;
  rfc: string;
  direccion: string;
  localizacion: string;
  telefono: string;
  familia: string;
  especialidad: string;
  activo?: number;
}
