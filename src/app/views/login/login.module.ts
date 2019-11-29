import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './components/login/login.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { RestaurarPasswordComponent } from './components/restaurar-password/restaurar-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RecuperarComponent,
    RestaurarPasswordComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule
  ]
})
export class LoginModule { }
