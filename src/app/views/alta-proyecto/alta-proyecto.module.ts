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
import { SharedPipesModule } from './../../shared/pipes/shared-pipes.module';

import { AltaProyectoRoutingModule } from './alta-proyecto-routing.module';
import { ObrasComponent } from './components/obras/obras.component';
import { CrearObraComponent } from './components/crear-obra/crear-obra.component';
import { ModificarObraComponent } from './components/modificar-obra/modificar-obra.component';
import { ModalEliminarComponent } from './components/modal-eliminar/modal-eliminar.component';
import { VerObraComponent } from './components/ver-obra/ver-obra.component';
import { DatosObraComponent } from './components/datos-obra/datos-obra.component';
import { BitacoraObraComponent } from './components/bitacora-obra/bitacora-obra.component';

@NgModule({
  declarations: [
    ObrasComponent,
    CrearObraComponent,
    ModificarObraComponent,
    ModalEliminarComponent,
    VerObraComponent,
    DatosObraComponent,
    BitacoraObraComponent
  ],
  imports: [
    CommonModule,
    AltaProyectoRoutingModule,
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
  entryComponents: [
    ModalEliminarComponent
  ]
})
export class AltaProyectoModule { }
