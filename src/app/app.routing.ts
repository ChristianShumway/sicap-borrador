import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard';

export const rootRouterConfig: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: '', 
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'login', 
        loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule),
        data: { title: 'Inicio de Sesión'} 
      }
    ]
  },
  {
    path: '', 
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'sessions', 
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session'} 
      }
    ]
  },
  {
    path: '', 
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'dashboard', 
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboards', breadcrumb: 'DASHBOARD'}
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./views/catalogos-administrativos/catalogos-administrativos.module').then(m =>m.CatalogosAdministrativosModule),
        data: { title: 'Configuración', breadcrumb: 'Configuración'}
      },
      {
        path: 'perfil/:id',
        loadChildren: () => import('./views/perfil/perfil.module').then(m =>m.PerfilModule),
        data: { title: 'Perfil', breadcrumb: 'PROFILE'}
      },
      {
        path: 'alta-proyecto',
        loadChildren: () => import('./views/alta-proyecto/alta-proyecto.module').then(m =>m.AltaProyectoModule),
        data: { title: 'Alta de Proyecto', breadcrumb: 'Alta de Proyecto'}
      },
      {
        path: 'ejecucion-proyecto',
        loadChildren: () => import('./views/ejecucion-proyecto/ejecucion-proyecto.module').then(m =>m.EjecucionProyectoModule),
        data: { title: 'Ejecución de Proyecto', breadcrumb: 'Ejecución de Proyecto'}
      },
      {
        path: 'solicitudes-suministros',
        loadChildren: () => import('./views/solicitudes-suministros/solicitudes-suministros.module').then( m => m.SolicitudesSuministrosModule),
        data: { title: 'Solicitudes y Suministros', breadcrumb: 'Solicitudes y Suministros'}
      },
      {
        path: 'reportes-estadisticas',
        loadChildren: () => import('./views/reportes-estadisticas/reportes-estadisticas.module').then( m => m.ReportesEstadisticasModule),
        data: { title: 'Reportes y Estadisticas', breadcrumb: 'Reportes y Estadisticas'}
      },
      {
        path: 'cierre-proyecto',
        loadChildren: () => import('./views/cierre-proyecto/cierre-proyecto.module').then( m => m.CierreProyectoModule),
        data: { title: 'Cierre del Proyecto', breadcrumb: 'Cierre del Proyecto'}
      },
      {
        path: 'material', 
        loadChildren: () => import('./views/material-example-view/material-example-view.module').then(m => m.MaterialExampleViewModule), 
        data: { title: 'Material', breadcrumb: 'MATERIAL'}
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'sessions/404'
  }
];

