import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObrasComponent } from './components/obras/obras.component';
import { CrearObraComponent } from './components/crear-obra/crear-obra.component';
import { ModificarObraComponent } from './components/modificar-obra/modificar-obra.component';
import { VerObraComponent } from './components/ver-obra/ver-obra.component';
import { BitacoraObraComponent } from './components/bitacora-obra/bitacora-obra.component';
import { DatosObraComponent } from './components/datos-obra/datos-obra.component';

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
      },
      {
        path: 'ver-obra/:id',
        component: VerObraComponent,
        data: { title: 'Obra', breadcrumb: 'Obra'},
        children:[
          {
            path: 'bitacora/:id',
            component: BitacoraObraComponent,
            data: { title: 'Bitácora de Obra', breadcrumb: 'Bitácora de Obra'},
          },
          {
            path: 'datos/:id',
            component: DatosObraComponent,
            data: { title: 'Datos de la Obra', breadcrumb: 'Datos de la Obra'},
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaProyectoRoutingModule { }
