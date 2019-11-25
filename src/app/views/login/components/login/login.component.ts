import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

import { AutenticacionService } from './../../../../shared/services/autenticacion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  @ViewChild(MatProgressBar, {static: false}) progressBar: MatProgressBar;
  @ViewChild(MatButton, {static: false}) submitButton: MatButton;

  signinForm: FormGroup;
  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService
  ) { 
    // redirect to home if already logged in
    if (this.autenticacionService.currentUserValue) {
      // this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('',[ Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(8)]),
      // rememberMe: new FormControl(false)
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  signin() {
    const signinData = this.signinForm.value
    console.log(signinData);
    if(signinData){
      this.autenticacionService.loginUser(signinData)
      .pipe(first()) 
      .subscribe(
        user => {
          console.log(user);
          if(user.email){
            this.useAlerts('Acceso de Usuario', 'Correcto', 'success-dialog');
            this.router.navigate(['dashboard']);
          } else {
            this.useAlerts('Usuario no encontrado', 'Incorrecto', 'error-dialog');
            this.submitButton.disabled = false;
            this.progressBar.mode = 'determinate';
          }
        },
        error => {
          console.log(error);
          this.useAlerts('Acceso de Usuario', 'Incorrecto', 'error-dialog');
          this.submitButton.disabled = false;
          this.progressBar.mode = 'determinate';
        }
      )
    }
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
