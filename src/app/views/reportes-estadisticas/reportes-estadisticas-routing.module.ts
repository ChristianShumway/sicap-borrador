import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObrasComponent } from './components/obras/obras.component';
import { ReporteAvanceSemanalComponent } from './components/reporte-avance-semanal/reporte-avance-semanal.component';
import { ResumenSubcontratoComponent } from './components/resumen-subcontrato/resumen-subcontrato.component';

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
        path: 'resumen-subcontrato/:idObra',
        component: ResumenSubcontratoComponent,
        data: {title: 'Resumen de Subcontrato', breadcrumb: 'Resumen de Subcontrato'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesEstadisticasRoutingModule { }
