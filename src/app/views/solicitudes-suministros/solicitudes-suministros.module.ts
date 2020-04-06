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
import { SolicitarRecursosComponent } from './components/solicitar-recursos/solicitar-recursos.component';
import { SolicitarMaterialesHerramientasComponent } from './components/solicitar-materiales-herramientas/solicitar-materiales-herramientas.component';
import { SolicitarVehiculosComponent } from './components/solicitar-vehiculos/solicitar-vehiculos.component';
import { ListaSolicitudesComponent } from './components/lista-solicitudes/lista-solicitudes.component';
import { TableroControlComponent } from './components/tablero-control/tablero-control.component';
import { ModificarSolicitudRecursoComponent } from './components/modificar-solicitud-recurso/modificar-solicitud-recurso.component';
import { ModificarSolicitudMaterialesComponent } from './components/modificar-solicitud-materiales/modificar-solicitud-materiales.component';
import { ModificarSolicitudVehiculosComponent } from './components/modificar-solicitud-vehiculos/modificar-solicitud-vehiculos.component';
import { ValidarSolicitudesComponent } from './components/validar-solicitudes/validar-solicitudes.component';
import { ModalDatosSolicitudComponent } from './components/modal-datos-solicitud/modal-datos-solicitud.component';
import { GenerarOrdenPagoRecursosComponent } from './components/generar-orden-pago-recursos/generar-orden-pago-recursos.component';
import { GenerarOrdenPagoMaterialesComponent } from './components/generar-orden-pago-materiales/generar-orden-pago-materiales.component';
import { GenerarOrdenPagoVehiculosComponent } from './components/generar-orden-pago-vehiculos/generar-orden-pago-vehiculos.component';
import { ListaSolicitudesValidadasComponent } from './components/lista-solicitudes-validadas/lista-solicitudes-validadas.component';
import { ModificarOrdenTrabajoRecursosComponent } from './components/modificar-orden-trabajo-recursos/modificar-orden-trabajo-recursos.component';
import { ModificarOrdenTrabajoMaterialesComponent } from './components/modificar-orden-trabajo-materiales/modificar-orden-trabajo-materiales.component';
import { ModificarOrdenTrabajoVehiculosComponent } from './components/modificar-orden-trabajo-vehiculos/modificar-orden-trabajo-vehiculos.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    ObrasComponent,
    SolicitarRecursosComponent,
    SolicitarMaterialesHerramientasComponent,
    SolicitarVehiculosComponent,
    ListaSolicitudesComponent,
    TableroControlComponent,
    ModificarSolicitudRecursoComponent,
    ModificarSolicitudMaterialesComponent,
    ModificarSolicitudVehiculosComponent,
    ValidarSolicitudesComponent,
    ModalDatosSolicitudComponent,
    GenerarOrdenPagoRecursosComponent,
    GenerarOrdenPagoMaterialesComponent,
    GenerarOrdenPagoVehiculosComponent,
    ListaSolicitudesValidadasComponent,
    ModificarOrdenTrabajoRecursosComponent,
    ModificarOrdenTrabajoMaterialesComponent,
    ModificarOrdenTrabajoVehiculosComponent,
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
    ModalDatosSolicitudComponent
  ]

})
export class SolicitudesSuministrosModule { }
