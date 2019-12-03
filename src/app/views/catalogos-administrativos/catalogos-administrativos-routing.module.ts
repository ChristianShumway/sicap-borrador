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
import { DestajistasComponent } from './components/destajistas/destajistas.component';
import { CrearDestajistaComponent } from './components/crear-destajista/crear-destajista.component';
import { ModificarDestajistaComponent } from './components/modificar-destajista/modificar-destajista.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { ModificarClienteComponent } from './components/modificar-cliente/modificar-cliente.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { CrearProveedorComponent } from './components/crear-proveedor/crear-proveedor.component';
import { ModificarProveedorComponent } from './components/modificar-proveedor/modificar-proveedor.component';

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
  { 
    path: 'destajistas', 
    component: DestajistasComponent,
    data: { title: 'Lista de Destajistas', breadcrumb: 'Destajistas'} 
  },
  { 
    path: 'crear-destajista', 
    component: CrearDestajistaComponent,
    data: { title: 'Crear Destajista', breadcrumb: 'Crear Destajista'} 
  },
  { 
    path: 'modificar-destajista/:id', 
    component: ModificarDestajistaComponent,
    data: { title: 'Modificar Destajista', breadcrumb: 'Modificar Destajista'} 
  },
  { 
    path: 'clientes', 
    component: ClientesComponent,
    data: { title: 'Lista de Clientes', breadcrumb: 'Clientes'} 
  },
  { 
    path: 'crear-cliente', 
    component: CrearClienteComponent,
    data: { title: 'Crear Cliente', breadcrumb: 'Crear Cliente'} 
  },
  { 
    path: 'modificar-cliente/:id', 
    component: ModificarClienteComponent,
    data: { title: 'Modificar Cliente', breadcrumb: 'Modificar Cliente'} 
  },
  { 
    path: 'proveedores', 
    component: ProveedoresComponent,
    data: { title: 'Lista de Proveedores', breadcrumb: 'Proveedores'} 
  },
  { 
    path: 'crear-proveedor', 
    component: CrearProveedorComponent,
    data: { title: 'Crear Proveedor', breadcrumb: 'Crear Proveedor'} 
  },
  { 
    path: 'modificar-proveedor/:id', 
    component: ModificarProveedorComponent,
    data: { title: 'Modificar Proveedor', breadcrumb: 'Modificar Proveedor'} 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CatalogosAdministrativosRoutingModule { }
