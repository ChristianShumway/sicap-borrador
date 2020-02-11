import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObrasComponent } from './components/obras/obras.component';
import { CrearNotaBitacoraComponent } from './components/crear-nota-bitacora/crear-nota-bitacora.component';
import { PlanTrabajoComponent } from './components/plan-trabajo/plan-trabajo.component';
import { ReporteSubcontratosComponent } from './components/reporte-subcontratos/reporte-subcontratos.component';
import { ValidacionPlanTrabajoComponent } from './components/validacion-plan-trabajo/validacion-plan-trabajo.component';
import { ValidacionReporteConceptosEjecutadosComponent } from './components/validacion-reporte-conceptos-ejecutados/validacion-reporte-conceptos-ejecutados.component';
import { ValidacionReporteSubcontratosComponent } from './components/validacion-reporte-subcontratos/validacion-reporte-subcontratos.component';
import { ListaPlanTrabajoComponent } from './components/lista-plan-trabajo/lista-plan-trabajo.component';
import { ModificarPlanTrabajoComponent } from './components/modificar-plan-trabajo/modificar-plan-trabajo.component';
import { ListaReporteConceptosEjecutadosComponent } from './components/lista-reporte-conceptos-ejecutados/lista-reporte-conceptos-ejecutados.component';
import { ModificarReporteConceptosEjecutadosComponent } from './components/modificar-reporte-conceptos-ejecutados/modificar-reporte-conceptos-ejecutados.component';
import { ListaReporteSubcontratosComponent } from './components/lista-reporte-subcontratos/lista-reporte-subcontratos.component';
import { ModificarReporteSubcontratosComponent } from './components/modificar-reporte-subcontratos/modificar-reporte-subcontratos.component';

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
        path: 'lista-plan-trabajo/:id',
        component: ListaPlanTrabajoComponent,
        data: {title: 'Lista de Plan de trabajo', breadcrumb: 'Lista de Plan de trabajo'}
      },
      {
        path: 'lista-plan-trabajo/:idObra/modificar-plan-trabajo/:idPlanTrabajo',
        component: ModificarPlanTrabajoComponent,
        data: {title: 'Modificar Plan de trabajo', breadcrumb: 'Modificar Plan de trabajo'}
      },
      {
        path: 'reporte-conceptos-ejecutados/:id',
        component: CrearNotaBitacoraComponent,
        data: {title: 'Reporte de Conceptos Ejecutados', breadcrumb: 'Reporte de Conceptos Ejecutados'}
      },
      {
        path: 'lista-reportes-conceptos-ejecutados/:id',
        component: ListaReporteConceptosEjecutadosComponent,
        data: {title: 'Lista de Reportes de Conceptos Ejecutados', breadcrumb: 'Lista de Reportes de Conceptos Ejecutados'}
      },
      {
        path: 'lista-reportes-conceptos-ejecutados/:idObra/modificar-reporte-conceptos-ejecutados/:idPlanTrabajo',
        component: ModificarReporteConceptosEjecutadosComponent,
        data: {title: 'Modificar Reporte de Conceptos Ejecutados', breadcrumb: 'Modificar Reporte de Conceptos Ejecutados'}
      },
      {
        path: 'reporte-subcontratos/:id',
        component: ReporteSubcontratosComponent,
        data: {title: 'Reporte de Subcontratos', breadcrumb: 'Reporte de Subcontratos'}
      },
      {
        path: 'lista-reportes-subcontratos/:idObra',
        component: ListaReporteSubcontratosComponent,
        data: {title: 'Lista de Reportes Subcontratos', breadcrumb: 'Lista de Reportes Subcontratos'}
      },
      {
        path: 'lista-reportes-subcontratos/:idObra/modificar-reporte-subcontrato/:idReporte',
        component: ModificarReporteSubcontratosComponent,
        data: {title: 'Modificar Reporte de Subcontratos', breadcrumb: 'Modificar Reporte de Subcontratos'}
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
