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
import { AgmCoreModule } from '@agm/core';

import { EjecucionProyectoRoutingModule } from './ejecucion-proyecto-routing.module';
import { ObrasComponent } from './components/obras/obras.component';
import { CrearNotaBitacoraComponent } from './components/crear-nota-bitacora/crear-nota-bitacora.component';
import { ObservacionObraGeneralComponent } from './components/observacion-obra-general/observacion-obra-general.component';

@NgModule({
  declarations: [ObrasComponent, CrearNotaBitacoraComponent, ObservacionObraGeneralComponent],
  imports: [
  CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule,
    SharedModule,
    QuillModule,
    SharedPipesModule,
    EjecucionProyectoRoutingModule,
    AgmCoreModule
  ],
  entryComponents: [
    ObservacionObraGeneralComponent,
  ]
})
export class EjecucionProyectoModule { }
