import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObrasComponent } from './components/obras/obras.component';
import { SolicitarRecursosComponent } from './components/solicitar-recursos/solicitar-recursos.component';
import { SolicitarMaterialesHerramientasComponent } from './components/solicitar-materiales-herramientas/solicitar-materiales-herramientas.component';
import { SolicitarVehiculosComponent } from './components/solicitar-vehiculos/solicitar-vehiculos.component';
import { ListaSolicitudesComponent } from './components/lista-solicitudes/lista-solicitudes.component';
import { TableroControlComponent } from './components/tablero-control/tablero-control.component';
import { ModificarSolicitudRecursoComponent } from './components/modificar-solicitud-recurso/modificar-solicitud-recurso.component';
import { ModificarSolicitudMaterialesComponent } from './components/modificar-solicitud-materiales/modificar-solicitud-materiales.component';
import { ModificarSolicitudVehiculosComponent } from './components/modificar-solicitud-vehiculos/modificar-solicitud-vehiculos.component';
import { ValidarSolicitudesComponent } from './components/validar-solicitudes/validar-solicitudes.component';
import { GenerarOrdenPagoRecursosComponent } from './components/generar-orden-pago-recursos/generar-orden-pago-recursos.component';
import { GenerarOrdenPagoMaterialesComponent } from './components/generar-orden-pago-materiales/generar-orden-pago-materiales.component';
import { ListaSolicitudesValidadasComponent } from './components/lista-solicitudes-validadas/lista-solicitudes-validadas.component';
import { GenerarOrdenPagoVehiculosComponent } from './components/generar-orden-pago-vehiculos/generar-orden-pago-vehiculos.component';
import { ModificarOrdenTrabajoRecursosComponent } from './components/modificar-orden-trabajo-recursos/modificar-orden-trabajo-recursos.component';
import { ModificarOrdenTrabajoMaterialesComponent } from './components/modificar-orden-trabajo-materiales/modificar-orden-trabajo-materiales.component';
import { ModificarOrdenTrabajoVehiculosComponent } from './components/modificar-orden-trabajo-vehiculos/modificar-orden-trabajo-vehiculos.component';
import { ValidarOrdenesTrabajoComponent } from './components/validar-ordenes-trabajo/validar-ordenes-trabajo.component';

const routes: Routes = [
  {
    path:'obras',
    component: ObrasComponent,
    data: {title: 'Obras', breadcrumb: 'Obras'}
  },
  {
    path:'solicitar-recursos/:idObra',
    component: SolicitarRecursosComponent,
    data: {title: 'Solicitud de recursos', breadcrumb: 'Solicitud de recursos'}
  },
  {
    path:'solicitar-materiales-herramientas/:idObra',
    component: SolicitarMaterialesHerramientasComponent,
    data: {title: 'Solicitud de materiales y herramientas', breadcrumb: 'Solicitud de materiales y herramientas'}
  },
  {
    path:'solicitar-vehiculos/:idObra',
    component: SolicitarVehiculosComponent,
    data: {title: 'Solicitud de vehículos, equipo y maquinaria', breadcrumb: 'Solicitud de vehículos, equipo y maquinaria'}
  },
  {
    path:'solicitudes-realizadas',
    component: ListaSolicitudesComponent,
    data: {title: 'Solicitudes Realizadas', breadcrumb: 'Solicitudes Realizadas'}
  },
  {
    path:'tablero-control',
    component: TableroControlComponent,
    data: {title: 'Tablero de Control', breadcrumb: 'Tablero de Control'}
  },
  {
    path:'modificar-solicitud-recursos/:idSolicitud',
    component: ModificarSolicitudRecursoComponent,
    data: {title: 'Modificar Solicitud de Recursos', breadcrumb: 'Modificar Solicitud de Recursos'}
  },
  {
    path:'modificar-solicitud-materiales/:idSolicitud',
    component: ModificarSolicitudMaterialesComponent,
    data: {title: 'Modificar Solicitud de Materiales', breadcrumb: 'Modificar Solicitud de Materiales'}
  },
  {
    path:'modificar-solicitud-vehiculos/:idSolicitud',
    component: ModificarSolicitudVehiculosComponent,
    data: {title: 'Modificar Solicitud de Vehículos, Equipo y Maquinaria', breadcrumb: 'Modificar Solicitud de Vehículos, Equipo y Maquinaria'}
  },
  {
    path:'validar-solicitudes',
    component: ValidarSolicitudesComponent,
    data: {title: 'Lista Solicitudes para Validar', breadcrumb: 'Lista Solicitudes para Validar'}
  },
  {
    path:'lista-solicitudes-validadas',
    component: ListaSolicitudesValidadasComponent,
    data: {title: 'Lista de Solicitudes Validadas', breadcrumb: 'Lista de Solicitudes Validadas'}
  },
  {
    path:'orden-pago-recursos/:idSolicitud',
    component: GenerarOrdenPagoRecursosComponent,
    data: {title: 'Generar Orden de Trabajo de Recursos', breadcrumb: 'Generar Orden de Trabajo de Recursos'}
  },
  {
    path:'orden-pago-materiales/:idSolicitud',
    component: GenerarOrdenPagoMaterialesComponent,
    data: {title: 'Generar Orden de Trabajo de Materiales', breadcrumb: 'Generar Orden de Trabajo de Materiales'}
  },
  {
    path:'orden-pago-vehiculos/:idSolicitud',
    component: GenerarOrdenPagoVehiculosComponent,
    data: {title: 'Generar Orden de Trabajo de Vehículos, Equipo y Maquinaria', breadcrumb: 'Generar Orden de Trabajo de Vehículos, Equipo y Maquinaria'}
  },
  {
    path:'modificar-orden-trabajo-recursos/:idOrdenTrabajo',
    component: ModificarOrdenTrabajoRecursosComponent,
    data: {title: 'Modificar Orden Trabajo Recursos', breadcrumb: 'Modificar Orden Trabajo Recursos'}
  },
  {
    path:'modificar-orden-trabajo-materiales/:idOrdenTrabajo',
    component: ModificarOrdenTrabajoMaterialesComponent,
    data: {title: 'Modificar Orden Trabajo Materiales', breadcrumb: 'Modificar Orden Trabajo Materiales'}
  },
  {
    path:'modificar-orden-trabajo-vehiculos/:idOrdenTrabajo',
    component: ModificarOrdenTrabajoVehiculosComponent,
    data: {title: 'Modificar Orden Trabajo Vehículos', breadcrumb: 'Modificar Orden Trabajo Vehículos'}
  },
  {
    path:'autorizar-ordenes-trabajo',
    component: ValidarOrdenesTrabajoComponent,
    data: {title: 'Lista Ordenes de Trabajo por Autorizar', breadcrumb: 'Lista Ordenes de Trabajo por Autorizar'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesSuministrosRoutingModule { }
