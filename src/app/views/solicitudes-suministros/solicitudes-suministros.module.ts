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

import { SolicitudesSuministrosRoutingModule } from './solicitudes-suministros-routing.module';
import { EjecucionProyectoModule } from '../ejecucion-proyecto/ejecucion-proyecto.module';
import { ObrasComponent } from './components/obras/obras.component';
import { ModalEliminarComponent } from './../ejecucion-proyecto//components/modal-eliminar/modal-eliminar.component';
import { SolicitarRecursosComponent } from './components/solicitar-recursos/solicitar-recursos.component';
import { SolicitarMaterialesHerramientasComponent } from './components/solicitar-materiales-herramientas/solicitar-materiales-herramientas.component';
import { SolicitarVehiculosComponent } from './components/solicitar-vehiculos/solicitar-vehiculos.component';
import { ListaSolicitudesComponent } from './components/lista-solicitudes/lista-solicitudes.component';
import { TableroControlComponent } from './components/tablero-control/tablero-control.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    ObrasComponent,
    SolicitarRecursosComponent,
    SolicitarMaterialesHerramientasComponent,
    SolicitarVehiculosComponent,
    ListaSolicitudesComponent,
    TableroControlComponent,
    // ModalEliminarComponent,
  ],
  imports: [
    CommonModule,
    SolicitudesSuministrosRoutingModule,
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
    EjecucionProyectoModule,
    NgxMaskModule.forRoot(options),
  ],
  entryComponents:[
    // ModalEliminarComponent
  ]

})
export class SolicitudesSuministrosModule { }
