import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { EmpresasComponent } from './components/empresas/empresas.component';

const routes: Routes = [
  { 
    path: 'usuarios', 
    component: UsuariosComponent,
    data: { title: 'Lista de Usuarios', breadcrumb: 'Usuarios'} 
  },
  { 
    path: 'crear-usuario', 
    component: CrearUsuarioComponent,
    data: { title: 'Crear Usuario', breadcrumb: 'Crear Usuario'} 
  },
  { 
    path: 'modificar-usuario/:id', 
    component: ModificarUsuarioComponent,
    data: { title: 'Modificar Usuario', breadcrumb: 'Modificar Usuario'} 
  },
  { 
    path: 'empresas', 
    component: EmpresasComponent,
    data: { title: 'Lista de Empresas', breadcrumb: 'Empresas'} 
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CatalogosAdministrativosRoutingModule { }
