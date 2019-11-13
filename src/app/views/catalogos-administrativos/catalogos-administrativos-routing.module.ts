import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { CrearEmpresaComponent } from './components/crear-empresa/crear-empresa.component';
import { ModificarEmpresaComponent } from './components/modificar-empresa/modificar-empresa.component';
import { ModificarImagenEmpresaComponent } from './components/modificar-imagen-empresa/modificar-imagen-empresa.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { CrearPerfilComponent } from './components/crear-perfil/crear-perfil.component';
import { ModificarPerfilComponent } from './components/modificar-perfil/modificar-perfil.component';
import { PermisosComponent } from './components/permisos/permisos.component';


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
  { 
    path: 'crear-empresa', 
    component: CrearEmpresaComponent,
    data: { title: 'Crear Empresa', breadcrumb: 'Crear Empresa'} 
  },
  { 
    path: 'modificar-empresa/:id', 
    component: ModificarEmpresaComponent,
    data: { title: 'Modificar Empresa', breadcrumb: 'Modificar Empresa'} 
  },
  { 
    path: 'actualizar-perfil/:id', 
    component: ModificarImagenEmpresaComponent,
    data: { title: 'Actualizar Logo Empresa', breadcrumb: 'Actualizar Logo Empresa'} 
  },
  { 
    path: 'perfiles', 
    component: PerfilesComponent,
    data: { title: 'Lista de Perfiles', breadcrumb: 'Perfiles'} 
  },
  { 
    path: 'crear-perfil', 
    component: CrearPerfilComponent,
    data: { title: 'Crear Perfil', breadcrumb: 'Crear Perfil'} 
  },
  { 
    path: 'modificar-perfil/:id', 
    component: ModificarPerfilComponent,
    data: { title: 'Modificar Perfil', breadcrumb: 'Modificar Perfil'} 
  },
  { 
    path: 'permisos', 
    component: PermisosComponent,
    data: { title: 'Permisos', breadcrumb: 'Asignación de Permisos'} 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CatalogosAdministrativosRoutingModule { }
