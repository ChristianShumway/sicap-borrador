import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators } from 'ng2-validation';

import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { UsuariosService } from './../../../../shared/services/usuarios.service';
import { Usuario } from '../../../../shared/models/usuario';

@Component({
  selector: 'app-restaurar-password',
  templateUrl: './restaurar-password.component.html',
  styleUrls: ['./restaurar-password.component.scss']
})
export class RestaurarPasswordComponent implements OnInit {

  @ViewChild(MatProgressBar, { static: false }) progressBar: MatProgressBar;
  @ViewChild(MatButton, { static: false }) submitButton: MatButton;

  passwordForm: FormGroup;
  returnUrl: string;
  formData = {};
  existeUsuario= false;
  usuario: Usuario;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    private usuariosService: UsuariosService
  ) {
    // redirect to home if already logged in
    if (this.autenticacionService.currentUserValue) {
      // this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.getValidations();
    this.getUser();
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getValidations() {
    let contrasena = new FormControl('', [Validators.required, Validators.minLength(8), Validators.required]);
    let confirmarContrasena = new FormControl('', CustomValidators.equalTo(contrasena));

    this.passwordForm = new FormGroup({
      contrasena: contrasena,
      confirmarContrasena: confirmarContrasena,
    })
  }

  getUser(){
    this.route.params.subscribe( (data: Params) => {
      if(data.id){
        this.usuariosService.getUsuario(data.id).subscribe(
          (user: Usuario) => {
            this.usuario = user;
            if(this.usuario.cambiarContrasena === 0) {
              this.router.navigate(['/login']);
            }
          },
          error => console.log(error)
        );
      }
    })
  }

  restorePassword() {

    if(this.passwordForm.valid){
      const usuario = {
        idUsuario: this.usuario.idUsuario,
        ...this.passwordForm.value,
      };
      console.log(usuario);
      this.submitButton.disabled = true;
      this.progressBar.mode = 'indeterminate';
      this.autenticacionService.updatePassword(usuario).subscribe(
        success => {
          console.log(success);
          if(success.estatus === '05'){
            this.useAlerts(success.mensaje, ' ', 'success-dialog');
            this.autenticacionService.logout();
            this.router.navigate(['/login']);
          }
        },
        error => {
          console.log(error);
          this.useAlerts('Contraseña no se ha cambiado', ' ', 'error-dialog');
        }
      );
    }
  }

  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
