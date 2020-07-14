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
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { AltaProyectoModule } from '../alta-proyecto/alta-proyecto.module';

import { CierreProyectoRoutingModule } from './cierre-proyecto-routing.module';
import { ObrasComponent } from './components/obras/obras.component';
import { CierreObraComponent } from './components/cierre-obra/cierre-obra.component';
import { VerCierreObraComponent } from './components/ver-cierre-obra/ver-cierre-obra.component';
import { DataCierreObraComponent } from './components/data-cierre-obra/data-cierre-obra.component';
import { CierreObraDataComponent } from './components/cierre-obra-data/cierre-obra-data.component';
import { ModalCerrarComponent } from './components/modal-cerrar/modal-cerrar.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    ObrasComponent,
    CierreObraComponent,
    VerCierreObraComponent,
    DataCierreObraComponent,
    CierreObraDataComponent,
    ModalCerrarComponent
  ],
  imports: [
    CommonModule,
    CierreProyectoRoutingModule,
    CommonModule,
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
    SharedPipesModule,
    NgxMaskModule.forRoot(options),
    AltaProyectoModule
  ],
  entryComponents: [
    ModalCerrarComponent
  ]
})
export class CierreProyectoModule { }
