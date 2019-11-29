import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { RestaurarPasswordComponent } from './components/restaurar-password/restaurar-password.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path:'', component: LoginComponent },
      { path:'recuperar', component: RecuperarComponent },  
      { path:'restaurar-password/:id', component: RestaurarPasswordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginRoutingModule { }
