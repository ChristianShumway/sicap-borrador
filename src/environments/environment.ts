// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiURL: '',
  //apiURL: '/Sicap/',
  imageServe:'Sicap',
  imgRUL: 'Sicap',
  // host:'192.168.8.103:8080'
  // host: 'localhost:8080'
  host: '108.175.5.160:8080',
  permisosEspeciales: [
    {
      idOpcion: 32,
      nombre: 'Eliminar Reportes',
      descripcion: 'eliminar reportes del modulo ejecución de proyectos',
      tooltip: 'eliminar-reporte',
      component: 'lista-plan-trabajo',
      activo: 1
    },
    {
      idOpcion: 33,
      nombre: 'Modificar Reportes',
      descripcion: 'Modificar reportes del modulo ejecución de proyectos',
      tooltip: 'modificar-reporte',
      component: 'lista-plan-trabajo',
      activo: 1
    },
  ]
};
