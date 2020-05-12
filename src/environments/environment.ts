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
      component: 'plan-trabajo',
      activo: 1
    },
    {
      idOpcion: 33,
      nombre: 'Modificar Reportes',
      descripcion: 'Modificar reportes del modulo ejecución de proyectos',
      tooltip: 'modificar-reporte',
      component: 'plan-trabajo',
      activo: 1
    },
    {
      idOpcion: 32,
      nombre: 'Eliminar Reportes',
      descripcion: 'eliminar reportes del modulo ejecución de proyectos',
      tooltip: 'eliminar-reporte',
      component: 'reporte-conceptos-ejecutados',
      activo: 1
    },
    {
      idOpcion: 33,
      nombre: 'Modificar Reportes',
      descripcion: 'Modificar reportes del modulo ejecución de proyectos',
      tooltip: 'modificar-reporte',
      component: 'reporte-conceptos-ejecutados',
      activo: 1
    },
    {
      idOpcion: 32,
      nombre: 'Eliminar Reportes',
      descripcion: 'eliminar reportes del modulo ejecución de proyectos',
      tooltip: 'eliminar-reporte',
      component: 'reporte-subcontratos',
      activo: 1
    },
    {
      idOpcion: 33,
      nombre: 'Modificar Reportes',
      descripcion: 'Modificar reportes del modulo ejecución de proyectos',
      tooltip: 'modificar-reporte',
      component: 'reporte-subcontratos',
      activo: 1
    },
    {
      idOpcion: 32,
      nombre: 'Eliminar Reportes',
      descripcion: 'eliminar reportes del modulo ejecución de proyectos',
      tooltip: 'eliminar-reporte',
      component: 'reporte-mano-obra',
      activo: 1
    },
    {
      idOpcion: 33,
      nombre: 'Modificar Reportes',
      descripcion: 'Modificar reportes del modulo ejecución de proyectos',
      tooltip: 'modificar-reporte',
      component: 'reporte-mano-obra',
      activo: 1
    },
    {
      idOpcion: 32,
      nombre: 'Eliminar Reportes',
      descripcion: 'eliminar reportes del modulo ejecución de proyectos',
      tooltip: 'eliminar-reporte',
      component: 'reporte-materiales',
      activo: 1
    },
    {
      idOpcion: 33,
      nombre: 'Modificar Reportes',
      descripcion: 'Modificar reportes del modulo ejecución de proyectos',
      tooltip: 'modificar-reporte',
      component: 'reporte-materiales',
      activo: 1
    },
    {
      idOpcion: 32,
      nombre: 'Eliminar Reportes',
      descripcion: 'eliminar reportes del modulo ejecución de proyectos',
      tooltip: 'eliminar-reporte',
      component: 'reporte-maquinaria-equipo',
      activo: 1
    },
    {
      idOpcion: 33,
      nombre: 'Modificar Reportes',
      descripcion: 'Modificar reportes del modulo ejecución de proyectos',
      tooltip: 'modificar-reporte',
      component: 'reporte-maquinaria-equipo',
      activo: 1
    },
    {
      idOpcion: 32,
      nombre: 'Eliminar Reportes',
      descripcion: 'eliminar reportes del modulo ejecución de proyectos',
      tooltip: 'eliminar-reporte',
      component: 'reporte-ingresos-egresos',
      activo: 1
    },
    {
      idOpcion: 33,
      nombre: 'Modificar Reportes',
      descripcion: 'Modificar reportes del modulo ejecución de proyectos',
      tooltip: 'modificar-reporte',
      component: 'reporte-ingresos-egresos',
      activo: 1
    },
    {
      idOpcion: 34,
      nombre: 'Validar Reportes',
      descripcion: 'Opción para el usuario poder validar conceptos ejecutados por un supervisor',
      tooltip: 'validar-reporte-conceptos',
      component: 'validacion-reportes',
      activo: 1
    },
    {
      idOpcion: 35,
      nombre: 'Validar Reportes',
      descripcion: 'Opción para el usuario poder validar subcontratos por un supervisor',
      tooltip: 'validar-reporte-subcontratos',
      component: 'validacion-reportes',
      activo: 1
    },
    {
      idOpcion: 38,
      nombre: 'Generar Solicitud',
      descripcion: 'Opción para generar una solicitud de recursos',
      tooltip: 'solicitud-recursos',
      component: 'solicitudes-suministros-obras',
      activo: 1
    },
    {
      idOpcion: 39,
      nombre: 'Generar Solicitud',
      descripcion: 'Opción para generar una solicitud de materiales',
      tooltip: 'solicitud-materiales',
      component: 'solicitudes-suministros-obras',
      activo: 1
    },
    {
      idOpcion: 40,
      nombre: 'Generar Solicitud',
      descripcion: 'Opción para generar una solicitud de materiales y equipo',
      tooltip: 'solicitud-vehiculos',
      component: 'solicitudes-suministros-obras',
      activo: 1
    },
  ]
};
