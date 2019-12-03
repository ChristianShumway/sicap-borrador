import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PerfilesService } from './../../../../shared/services/perfiles.service';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.scss']
})
export class CrearPerfilComponent implements OnInit {

  formData = {}
  console = console;
  createProfileForm: FormGroup;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private perfilesService: PerfilesService
  ) { }

  ngOnInit() {
    this.getValidations();
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
      const perfil = this.createProfileForm.value;
      this.perfilesService.createPerfil(perfil).subscribe(
        ((success:any) => {
          console.log(success);
          if(success.estatus === '05'){
            this.router.navigate(['/configuracion/perfiles']);
            this.useAlerts(success.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(success.mensaje, ' ', 'error-dialog');
          }
        }),
        (error => {
          console.log(error);
          this.useAlerts(error.mensaje, ' ', 'error-dialog');
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
