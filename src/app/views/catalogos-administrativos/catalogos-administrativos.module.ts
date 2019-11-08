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
import { ModalEliminarUsuarioComponent } from './components/modal-eliminar-usuario/modal-eliminar-usuario.component';
import { EmpresasComponent } from './components/empresas/empresas.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    CrearUsuarioComponent,
    ModificarUsuarioComponent,
    VistaUsuarioComponent,
    ModalEliminarUsuarioComponent,
    EmpresasComponent
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
    QuillModule
  ],
  entryComponents:[
    VistaUsuarioComponent,
    ModalEliminarUsuarioComponent
  ]
})
export class CatalogosAdministrativosModule { }
