import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObrasComponent } from './components/obras/obras.component';
import { CrearObraComponent } from './components/crear-obra/crear-obra.component';
import { ModificarObraComponent } from './components/modificar-obra/modificar-obra.component';
import { VerObraComponent } from './components/ver-obra/ver-obra.component';
import { BitacoraObraComponent } from './components/bitacora-obra/bitacora-obra.component';
import { DatosObraComponent } from './components/datos-obra/datos-obra.component';
import { CatalogoConceptosComponent } from './components/catalogo-conceptos/catalogo-conceptos.component';
import { CatalogoMaterialesComponent } from './components/catalogo-materiales/catalogo-materiales.component';
import { MaterialesPorConceptoComponent } from './components/materiales-por-concepto/materiales-por-concepto.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';

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
        path: 'materiales-concepto/:id',
        component: MaterialesPorConceptoComponent,
        data: { title: 'Asignación de Materiales por Concepto', breadcrumb: 'Asinación de Materiales por Concepto'},
      },
      {
        path: 'ver-obra/:id',
        component: VerObraComponent,
        data: { title: 'Obra', breadcrumb: 'Obra'},
        children:[
          {
            path: '',
            component: VerObraComponent,
            data: { title: 'Obra', breadcrumb: 'Obra'},
          },
          {
            path: 'cronograma/:id',
            component: BitacoraObraComponent,
            data: { title: 'Cronograma de Obra', breadcrumb: 'Cronograma de Obra'},
          },
          {
            path: 'ficha-planeacion/:id',
            component: DatosObraComponent,
            data: { title: 'Ficha de Planeación de la Obra', breadcrumb: 'Ficha de Planeación de la Obra'},
          },
          {
            path: 'catalogo-conceptos/:id',
            component: CatalogoConceptosComponent,
            data: { title: 'Catálogo de Conceptos', breadcrumb: 'Catálogo de Conceptos'},
          },
          {
            path: 'lista-materiales/:id',
            component: CatalogoMaterialesComponent,
            data: { title: 'Lista de Materiales', breadcrumb: 'Lista de Materiales'},
          },
          {
            path: 'biblioteca/:id',
            component: BibliotecaComponent,
            data: { title: 'Biblioteca de la Obra', breadcrumb: 'Biblioteca de la Obra'},
          },
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
