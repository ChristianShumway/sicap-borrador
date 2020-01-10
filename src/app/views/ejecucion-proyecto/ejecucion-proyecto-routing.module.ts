import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObrasComponent } from './components/obras/obras.component';
import { CrearNotaBitacoraComponent } from './components/crear-nota-bitacora/crear-nota-bitacora.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'proyectos',
        component: ObrasComponent,
        data: {title: 'Proyectos', breadcrumb: 'Proyectos'}
      },
      {
        path: 'crear-nota-bitacora/:id',
        component: CrearNotaBitacoraComponent,
        data: {title: 'Bitácora', breadcrumb: 'Nota Bitácora'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjecucionProyectoRoutingModule { }
