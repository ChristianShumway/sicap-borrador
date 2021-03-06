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
import { OwlModule } from 'ngx-owl-carousel';
import { AltaProyectoModule } from '../alta-proyecto/alta-proyecto.module';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxEchartsModule } from 'ngx-echarts';

import { ReportesEstadisticasRoutingModule } from './reportes-estadisticas-routing.module';

// import { DashboardRoutes } from "./dashboard.routing";
// import { AnalyticsComponent } from './analytics/analytics.component';
// import { DashboardDarkComponent } from './dashboard-dark/dashboard-dark.component';
// import { CryptocurrencyComponent } from './cryptocurrency/cryptocurrency.component';
// import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';

import { ObrasComponent } from './components/obras/obras.component';
import { ReporteAvanceSemanalComponent } from './components/reporte-avance-semanal/reporte-avance-semanal.component';
import { AlcanceReporteCostoAvanceGeneralComponent } from './components/alcance-reporte-costo-avance-general/alcance-reporte-costo-avance-general.component';
import { CostoReporteCostoAvanceGeneralComponent } from './components/costo-reporte-costo-avance-general/costo-reporte-costo-avance-general.component';
import { GraficasReporteCostoAvanceGeneralComponent } from './components/graficas-reporte-costo-avance-general/graficas-reporte-costo-avance-general.component';
import { ResumenSubcontratoComponent } from './components/resumen-subcontrato/resumen-subcontrato.component';
import { AlcanceResumenSubcontratoComponent } from './components/alcance-resumen-subcontrato/alcance-resumen-subcontrato.component';
import { PagosResumenSubcontratoComponent } from './components/pagos-resumen-subcontrato/pagos-resumen-subcontrato.component';
import { EstadoCuentaObraComponent } from './components/estado-cuenta-obra/estado-cuenta-obra.component';
import { AlcanceEstadoCuentaObraComponent } from './components/alcance-estado-cuenta-obra/alcance-estado-cuenta-obra.component';
import { IeResumenEstadoCuentaObraComponent } from './components/ie-resumen-estado-cuenta-obra/ie-resumen-estado-cuenta-obra.component';
import { IeGralEstadoCuentaObraComponent } from './components/ie-gral-estado-cuenta-obra/ie-gral-estado-cuenta-obra.component';
import { GraficasEstadoCuentaObraComponent } from './components/graficas-estado-cuenta-obra/graficas-estado-cuenta-obra.component';
import { ExpedienteUnicoObraComponent } from './components/expediente-unico-obra/expediente-unico-obra.component';
import { DocumentosExpedienteUnicoObraComponent } from './components/documentos-expediente-unico-obra/documentos-expediente-unico-obra.component';
import { ValidacionExpedienteUnicoObraComponent } from './components/validacion-expediente-unico-obra/validacion-expediente-unico-obra.component';
// import { ModalEliminarComponent } from './../alta-proyecto/components/modal-eliminar/modal-eliminar.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    ObrasComponent,
    ReporteAvanceSemanalComponent,
    AlcanceReporteCostoAvanceGeneralComponent,
    CostoReporteCostoAvanceGeneralComponent,
    GraficasReporteCostoAvanceGeneralComponent,
    ResumenSubcontratoComponent,
    AlcanceResumenSubcontratoComponent,
    PagosResumenSubcontratoComponent,
    EstadoCuentaObraComponent,
    AlcanceEstadoCuentaObraComponent,
    IeResumenEstadoCuentaObraComponent,
    IeGralEstadoCuentaObraComponent,
    GraficasEstadoCuentaObraComponent,
    ExpedienteUnicoObraComponent,
    DocumentosExpedienteUnicoObraComponent,
    ValidacionExpedienteUnicoObraComponent
  ],
  imports: [
    CommonModule,
    ReportesEstadisticasRoutingModule,
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
    AgmCoreModule,
    OwlModule,
    AltaProyectoModule,
    NgxMaskModule.forRoot(options),
    NgxEchartsModule
  ],
  exports: [
    // ModalEliminarComponent
  ],
  entryComponents: []
})
export class ReportesEstadisticasModule { }
