import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PerfilesService } from './../../../../shared/services/perfiles.service';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.scss']
})
export class CrearPerfilComponent implements OnInit {

  formData = {}
  console = console;
  createProfileForm: FormGroup;
  idUsuarioLogeado;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private perfilesService: PerfilesService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getValidations();
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
  }

  getValidations() {
    this.createProfileForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
      ]),
      descripcion: new FormControl(),
    })
  }

  createProfile(){
    if(this.createProfileForm.valid){
      const perfil = {
        ...this.createProfileForm.value,
        // usuarioCreo: this.idUsuarioLogeado
      }
      this.perfilesService.createPerfil(perfil).subscribe(
        ((response:any) => {
          console.log(response);
          if(response.estatus === '05'){
            this.router.navigate(['/configuracion/perfiles']);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        }),
        (error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        })
      );
      console.log(perfil);
    }
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
