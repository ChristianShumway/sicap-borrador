import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogosAdministrativosRoutingModule } from './catalogos-administrativos-routing.module';
import { MaterialModule } from './../material/material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from './../../shared/shared.module';
import { QuillModule } from 'ngx-quill';

// import { WizardComponent } from './wizard/wizard.component';

import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { VistaUsuarioComponent } from './components/vista-usuario/vista-usuario.component';
import { ModalEliminarComponent } from './components/modal-eliminar/modal-eliminar.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { CrearEmpresaComponent } from './components/crear-empresa/crear-empresa.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { SharedPipesModule } from './../../shared/pipes/shared-pipes.module';
import { ModificarEmpresaComponent } from './components/modificar-empresa/modificar-empresa.component';
import { ModificarImagenEmpresaComponent } from './components/modificar-imagen-empresa/modificar-imagen-empresa.component';
import { CrearPerfilComponent } from './components/crear-perfil/crear-perfil.component';
import { ModificarPerfilComponent } from './components/modificar-perfil/modificar-perfil.component';
import { PermisosComponent } from './components/permisos/permisos.component';
import { ModalPerfilesComponent } from './components/modal-perfiles/modal-perfiles.component';
import {MatListModule} from '@angular/material/list';
import { DestajistasComponent } from './components/destajistas/destajistas.component';
import { CrearDestajistaComponent } from './components/crear-destajista/crear-destajista.component';
import { ModificarDestajistaComponent } from './components/modificar-destajista/modificar-destajista.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { CrearProveedorComponent } from './components/crear-proveedor/crear-proveedor.component';
import { ModificarClienteComponent } from './components/modificar-cliente/modificar-cliente.component';
import { ModificarProveedorComponent } from './components/modificar-proveedor/modificar-proveedor.component';
@NgModule({
  declarations: [
    UsuariosComponent,
    CrearUsuarioComponent,
    ModificarUsuarioComponent,
    VistaUsuarioComponent,
    ModalEliminarComponent,
    EmpresasComponent,
    CrearEmpresaComponent,
    PerfilesComponent,
    ModificarEmpresaComponent,
    ModificarImagenEmpresaComponent,
    CrearPerfilComponent,
    ModificarPerfilComponent,
    PermisosComponent,
    ModalPerfilesComponent,
    DestajistasComponent,
    CrearDestajistaComponent,
    ModificarDestajistaComponent,
    ClientesComponent,
    ProveedoresComponent,
    CrearClienteComponent,
    CrearProveedorComponent,
    ModificarClienteComponent,
    ModificarProveedorComponent,
  ],
  imports: [
  CommonModule,
    CatalogosAdministrativosRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule,
    SharedModule,
    QuillModule,
    SharedPipesModule
  ],
  entryComponents:[
    VistaUsuarioComponent,
    ModalEliminarComponent,
    ModalPerfilesComponent
  ]
})
export class CatalogosAdministrativosModule { }
