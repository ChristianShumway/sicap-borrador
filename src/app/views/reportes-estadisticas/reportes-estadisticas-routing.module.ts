import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObrasComponent } from './components/obras/obras.component';
import { ReporteAvanceSemanalComponent } from './components/reporte-avance-semanal/reporte-avance-semanal.component';
import { ResumenSubcontratoComponent } from './components/resumen-subcontrato/resumen-subcontrato.component';
import { EstadoCuentaObraComponent } from './components/estado-cuenta-obra/estado-cuenta-obra.component';
import { ExpedienteUnicoObraComponent } from './components/expediente-unico-obra/expediente-unico-obra.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'proyectos/:reporte',
        component: ObrasComponent,
        data: {title: 'Proyectos', breadcrumb: 'Proyectos'}
      },
      {
        path: 'control-avance-semanal/:idObra',
        component: ReporteAvanceSemanalComponent,
        data: {title: 'Control de Avance Semanal', breadcrumb: 'Control de Avance Semanal'}
      },
      {
        path: 'reporte-subcontrato/:idObra',
        component: ResumenSubcontratoComponent,
        data: {title: 'Resumen de Subcontrato', breadcrumb: 'Reporte de Subcontrato'}
      },
      {
        path: 'estado-cuenta-obra/:idObra',
        component: EstadoCuentaObraComponent,
        data: {title: 'Estado de Cuenta de Obra', breadcrumb: 'Estado de Cuenta de Obra'}
      },
      {
        path: 'expediente-unico-obra/:idObra',
        component: ExpedienteUnicoObraComponent,
        data: {title: 'Expediente Único de Obra', breadcrumb: 'Expediente Único de Obra'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesEstadisticasRoutingModule { }
