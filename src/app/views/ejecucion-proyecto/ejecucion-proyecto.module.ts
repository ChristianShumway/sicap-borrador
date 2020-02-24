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

import { EjecucionProyectoRoutingModule } from './ejecucion-proyecto-routing.module';
import { ObrasComponent } from './components/obras/obras.component';
import { CrearNotaBitacoraComponent } from './components/crear-nota-bitacora/crear-nota-bitacora.component';
import { ObservacionObraGeneralComponent } from './components/observacion-obra-general/observacion-obra-general.component';
import { PlanTrabajoComponent } from './components/plan-trabajo/plan-trabajo.component';
import { ReporteSubcontratosComponent } from './components/reporte-subcontratos/reporte-subcontratos.component';
import { ValidacionPlanTrabajoComponent } from './components/validacion-plan-trabajo/validacion-plan-trabajo.component';
import { ValidacionReporteConceptosEjecutadosComponent } from './components/validacion-reporte-conceptos-ejecutados/validacion-reporte-conceptos-ejecutados.component';
import { ValidacionReporteSubcontratosComponent } from './components/validacion-reporte-subcontratos/validacion-reporte-subcontratos.component';
import { ListaPlanTrabajoComponent } from './components/lista-plan-trabajo/lista-plan-trabajo.component';
import { ModalEliminarComponent } from './components/modal-eliminar/modal-eliminar.component';
import { ModificarPlanTrabajoComponent } from './components/modificar-plan-trabajo/modificar-plan-trabajo.component';
import { ListaReporteConceptosEjecutadosComponent } from './components/lista-reporte-conceptos-ejecutados/lista-reporte-conceptos-ejecutados.component';
import { SubirEvidenciasComponent } from './components/subir-evidencias/subir-evidencias.component';
import { ModificarReporteConceptosEjecutadosComponent } from './components/modificar-reporte-conceptos-ejecutados/modificar-reporte-conceptos-ejecutados.component';
import { ListaReporteSubcontratosComponent } from './components/lista-reporte-subcontratos/lista-reporte-subcontratos.component';
import { ModificarReporteSubcontratosComponent } from './components/modificar-reporte-subcontratos/modificar-reporte-subcontratos.component';
import { ConceptosListaComponent } from './components/conceptos-lista/conceptos-lista.component';
import { CarouselEvidenciasComponent } from './components/carousel-evidencias/carousel-evidencias.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ObservacionValidacionConceptoComponent } from './components/observacion-validacion-concepto/observacion-validacion-concepto.component';

@NgModule({
  declarations: [
    ObrasComponent, 
    CrearNotaBitacoraComponent, 
    ObservacionObraGeneralComponent, 
    PlanTrabajoComponent, 
    ReporteSubcontratosComponent, 
    ValidacionPlanTrabajoComponent, 
    ValidacionReporteConceptosEjecutadosComponent, 
    ValidacionReporteSubcontratosComponent, 
    ListaPlanTrabajoComponent,
    ModalEliminarComponent,
    ModificarPlanTrabajoComponent,
    ListaReporteConceptosEjecutadosComponent,
    SubirEvidenciasComponent,
    ModificarReporteConceptosEjecutadosComponent,
    ListaReporteSubcontratosComponent,
    ModificarReporteSubcontratosComponent,
    ConceptosListaComponent,
    CarouselEvidenciasComponent,
    GalleryComponent,
    ObservacionValidacionConceptoComponent
  ],
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
    AgmCoreModule,
    OwlModule
  ],
  entryComponents: [
    ObservacionObraGeneralComponent,
    ModalEliminarComponent,
    SubirEvidenciasComponent,
    ObservacionValidacionConceptoComponent
  ]
})
export class EjecucionProyectoModule { }
