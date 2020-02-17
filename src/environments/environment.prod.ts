export const environment = {
  production: true,
  apiURL: '',
  //apiURL: '/Sicap/',
  imgRUL: 'Sicap',
  imageServe:'Sicap',
  // host:'192.168.8.103:8080'
  // host: 'localhost:8080'
  host: '108.175.5.160:8080',
  permisosEspeciales: [
    {
      idOpcion: 32,
      nombre: 'Eliminar Reportes',
      descripcion: 'eliminar reportes del modulo ejecución de proyectos',
      activo: 1
    },
    {
      idOpcion: 33,
      nombre: 'Modificar Reportes',
      descripcion: 'Modificar reportes del modulo ejecución de proyectos',
      activo: 1
    },
  ]
};
