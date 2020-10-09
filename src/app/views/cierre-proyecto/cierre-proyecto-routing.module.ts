import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObrasComponent } from './components/obras/obras.component';
import { CierreObraComponent } from './components/cierre-obra/cierre-obra.component';
import { VerCierreObraComponent } from './components/ver-cierre-obra/ver-cierre-obra.component';
import { DataCierreObraComponent } from './components/data-cierre-obra/data-cierre-obra.component';

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
        path: 'cierre-obra/:id',
        component: CierreObraComponent,
        data: {title: 'Cierre de Obra', breadcrumb: 'Cierre de Obra'}
      },
      {
        path: 'ver-cierre-obra/:idObra',
          component: VerCierreObraComponent,
          data: { title: 'Cierre Obra', breadcrumb: ' Cierre Obra'},
          children:[
            {
              path: '',
              component: VerCierreObraComponent,
              data: { title: ' Cierre de Obra', breadcrumb: ' Cierre de Obra'},
            },
            {
              path: 'ficha-cierre-obra/:id',
              component: DataCierreObraComponent,
              data: { title: 'Ficha de Cierre de Obra', breadcrumb: 'Ficha de Cierre de Obra'},
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
export class CierreProyectoRoutingModule { }
