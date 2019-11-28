import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from './../../shared/shared.module';
import { QuillModule } from 'ngx-quill';

import { PerfilRoutingModule } from './perfil-routing.module';
import { SharedPipesModule } from './../../shared/pipes/shared-pipes.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';

@NgModule({
  declarations: [
    PerfilComponent,
    DetallesComponent,
    AjustesComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
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
  ]
})
export class PerfilModule { }
