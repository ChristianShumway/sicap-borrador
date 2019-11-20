import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
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
      console.log(perfil);
      this.router.navigate(['/catalogos-administrativos/perfiles']);
      this.useAlerts('Creación de Perfil', 'Correcto', 'success-dialog');
    }
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
