import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { Usuario } from './../../../../shared/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {
  
  userEmail;
  usuario: Usuario
  @ViewChild(MatProgressBar, {static: false}) progressBar: MatProgressBar;
  @ViewChild(MatButton, {static: false}) submitButton: MatButton;

  constructor(
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submitEmail() {
    this.usuario = { 
      ...this.usuario,
      email: this.userEmail
    };
    console.log(this.usuario);
    this.autenticacionService.restoreUser(this.usuario).subscribe(
      success => {
        console.log(success); 
        if(success.estatus === '05'){
          this.submitButton.disabled = true;
          this.progressBar.mode = 'indeterminate';
          this.useAlerts(success.mensaje, ' ', 'success-dialog');
          this.router.navigate(['/login']);
        } 
      },
      error => {
        console.log(error);
        this.useAlerts('Correo electrónico no enviado', ' ', 'error-dialog');
        this.submitButton.disabled = true;
        this.progressBar.mode = 'determinate';
        this.userEmail = '';
      }
    );
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
