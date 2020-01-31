import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObrasComponent } from './components/obras/obras.component';
import { CrearNotaBitacoraComponent } from './components/crear-nota-bitacora/crear-nota-bitacora.component';
import { PlanTrabajoComponent } from './components/plan-trabajo/plan-trabajo.component';
import { ReporteSubcontratosComponent } from './components/reporte-subcontratos/reporte-subcontratos.component';
import { ValidacionPlanTrabajoComponent } from './components/validacion-plan-trabajo/validacion-plan-trabajo.component';
import { ValidacionReporteConceptosEjecutadosComponent } from './components/validacion-reporte-conceptos-ejecutados/validacion-reporte-conceptos-ejecutados.component';
import { ValidacionReporteSubcontratosComponent } from './components/validacion-reporte-subcontratos/validacion-reporte-subcontratos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'proyectos/:tipo',
        component: ObrasComponent,
        data: {title: 'Proyectos', breadcrumb: 'Proyectos'}
      },
      {
        path: 'plan-trabajo/:id',
        component: PlanTrabajoComponent,
        data: {title: 'Plan de trabajo', breadcrumb: 'Plan de trabajo'}
      },
      {
        path: 'reporte-conceptos-ejecutados/:id',
        component: CrearNotaBitacoraComponent,
        data: {title: 'Reporte de Conceptos Ejecutados', breadcrumb: 'Reporte de Conceptos Ejecutados'}
      },
      {
        path: 'reporte-subcontratos/:id',
        component: ReporteSubcontratosComponent,
        data: {title: 'Reporte de Subcontratos', breadcrumb: 'Reporte de Subcontratos'}
      },
      {
        path: 'validacion-plan-trabajo/:id',
        component: ValidacionPlanTrabajoComponent,
        data: {title: 'Validación de Plan de Trabajo', breadcrumb: 'Validación de Plan de Trabajo'}
      },
      {
        path: 'validacion-conceptos-ejecutados/:id',
        component: ValidacionReporteConceptosEjecutadosComponent,
        data: {title: 'Validación de Conceptos Ejecutados', breadcrumb: 'Validación de Conceptos Ejecutados'}
      },
      {
        path: 'validacion-subcontratos/:id',
        component: ValidacionReporteSubcontratosComponent,
        data: {title: 'Validación de Subcontratos', breadcrumb: 'Validación de Subcontratos'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjecucionProyectoRoutingModule { }
