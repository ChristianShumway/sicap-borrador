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
    ModificarImagenEmpresaComponent
  ],
  imports: [
  CommonModule,
    CatalogosAdministrativosRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
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
    ModalEliminarComponent
  ]
})
export class CatalogosAdministrativosModule { }
