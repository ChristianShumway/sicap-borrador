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
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxEchartsModule } from 'ngx-echarts';


import { DashboardSicapRoutingModule } from './dashboard-sicap-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardSicapRoutingModule,
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
    NgxEchartsModule,
    NgxMaskModule.forRoot(options),
  ]
})
export class DashboardSicapModule { }
