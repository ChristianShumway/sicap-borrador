import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObrasComponent } from './components/obras/obras.component';
import { CrearObraComponent } from './components/crear-obra/crear-obra.component';
import { ModificarObraComponent } from './components/modificar-obra/modificar-obra.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'obras',
        component: ObrasComponent,
        data: {title: 'Obras', breadcrumb: 'Obras'}
      },
      {
        path: 'crear-obra',
        component: CrearObraComponent,
        data: { title: 'Crear Obra', breadcrumb: 'Crear Obra'}
      },
      {
        path: 'modificar-obra/:id',
        component: ModificarObraComponent,
        data: { title: 'Modificar Obra', breadcrumb: 'Modificar Obra'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaProyectoRoutingModule { }
