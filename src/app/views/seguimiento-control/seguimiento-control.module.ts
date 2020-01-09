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

import { SeguimientoControlRoutingModule } from './seguimiento-control-routing.module';
import { ObrasComponent } from './components/obras/obras.component';
import { CrearNotaBitacoraComponent } from './components/crear-nota-bitacora/crear-nota-bitacora.component';

@NgModule({
  declarations: [ObrasComponent, CrearNotaBitacoraComponent],
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
    SeguimientoControlRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBK9scW-xOTnRY_OIUy6VscLFbAfsZeft8',
      libraries: ['places']
    })
  ]
})
export class SeguimientoControlModule { }
