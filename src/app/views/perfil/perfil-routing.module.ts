import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';

const routes: Routes = [
  {
    path:'',
    component: PerfilComponent,
    children: [
      {
        path:'inicio/:id',
        component: DetallesComponent,
        data: { title: 'Detalles', breadcrumb: 'Detalles' }
      },
      {
        path:'ajustes/:id',
        component: AjustesComponent,
        data: { title: 'Ajustes', breadcrumb: 'Ajustes' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
