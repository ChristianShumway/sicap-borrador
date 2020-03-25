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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesSuministrosRoutingModule { }
