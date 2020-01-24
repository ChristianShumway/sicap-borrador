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

import { AltaProyectoRoutingModule } from './alta-proyecto-routing.module';
import { ObrasComponent } from './components/obras/obras.component';
import { CrearObraComponent } from './components/crear-obra/crear-obra.component';
import { ModificarObraComponent } from './components/modificar-obra/modificar-obra.component';
import { ModalEliminarComponent } from './components/modal-eliminar/modal-eliminar.component';
import { VerObraComponent } from './components/ver-obra/ver-obra.component';
import { DatosObraComponent } from './components/datos-obra/datos-obra.component';
import { BitacoraObraComponent } from './components/bitacora-obra/bitacora-obra.component';
import { ObraDataComponent } from './components/obra-data/obra-data.component';
import { CatalogoConceptosComponent } from './components/catalogo-conceptos/catalogo-conceptos.component';
import { AgregarConceptoExtraordinarioComponent } from './components/agregar-concepto-extraordinario/agregar-concepto-extraordinario.component';
import { CatalogoMaterialesComponent } from './components/catalogo-materiales/catalogo-materiales.component';
import { AgregarMaterialExtraordinarioComponent } from './components/agregar-material-extraordinario/agregar-material-extraordinario.component';
import { MaterialesPorConceptoComponent } from './components/materiales-por-concepto/materiales-por-concepto.component';
import { BibliotecaComponent } from './components/biblioteca/biblioteca.component';
import { AsignarMaterialesConceptoComponent } from './components/asignar-materiales-concepto/asignar-materiales-concepto.component';
import { AltaDocumentoComponent } from './components/alta-documento/alta-documento.component';
import { MontosProgramadosComponent } from './components/montos-programados/montos-programados.component';
import { ModificarMontoProgramadoComponent } from './components/modificar-monto-programado/modificar-monto-programado.component';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import { ListaMaquinariaEquipoComponent } from './components/lista-maquinaria-equipo/lista-maquinaria-equipo.component';
import { ListaPersonalComponent } from './components/lista-personal/lista-personal.component';
import { CatalogoSubcontratoComponent } from './components/catalogo-subcontrato/catalogo-subcontrato.component';
import { CatalogoManoObraComponent } from './components/catalogo-mano-obra/catalogo-mano-obra.component';
// import { NgxDocViewerModule } from 'modules';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    ObrasComponent,
    CrearObraComponent,
    ModificarObraComponent,
    ModalEliminarComponent,
    VerObraComponent,
    DatosObraComponent,
    BitacoraObraComponent,
    ObraDataComponent,
    CatalogoConceptosComponent,
    AgregarConceptoExtraordinarioComponent,
    CatalogoMaterialesComponent,
    AgregarMaterialExtraordinarioComponent,
    MaterialesPorConceptoComponent,
    BibliotecaComponent,
    AsignarMaterialesConceptoComponent,
    AltaDocumentoComponent,
    MontosProgramadosComponent,
    ModificarMontoProgramadoComponent,
    ListaMaquinariaEquipoComponent,
    ListaPersonalComponent,
    CatalogoSubcontratoComponent,
    CatalogoManoObraComponent
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
    SharedPipesModule,
    NgxMaskModule.forRoot(options),
    NgxDocViewerModule
  ],
  entryComponents: [
    ModalEliminarComponent,
    AgregarConceptoExtraordinarioComponent,
    AgregarMaterialExtraordinarioComponent,
    AsignarMaterialesConceptoComponent,
    AltaDocumentoComponent,
    ModificarMontoProgramadoComponent
  ]
})
export class AltaProyectoModule { }
