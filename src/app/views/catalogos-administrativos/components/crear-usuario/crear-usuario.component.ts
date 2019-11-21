import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { EmpresasService } from './../../../../shared/services/empresas.service';
import { Empresa } from './../../../../shared/models/empresa';
import { PerfilesService } from '../../../../shared/services/perfiles.service';
import { Perfil } from './../../../../shared/models/perfil';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UsuariosService } from 'app/shared/services/usuarios.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {
  
  formData = {}
  console = console;
  createUserForm: FormGroup;
  empresas: Empresa[];
  perfiles: Perfil[];
  
  constructor(
    private router: Router,
    private empresasService: EmpresasService,
    private perfilesService: PerfilesService,
    private snackBar: MatSnackBar,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getCatalogos();
  }

  getValidations() {
    let contrasena = new FormControl('', Validators.required);
    let confirmarContrasena = new FormControl('', CustomValidators.equalTo(contrasena));

    this.createUserForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      nombre: new FormControl('', [
        Validators.required,
      ]),
      apellidoPaterno: new FormControl('', [
        Validators.required,
      ]),
      apellidoMaterno: new FormControl('', [
        Validators.required,
      ]),
      usuario: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      idEmpresa: new FormControl('', [
        Validators.required
      ]),
      idPerfil: new FormControl('', [
        Validators.required
      ]),
      telefono: new FormControl('', CustomValidators.phone('BD')),
      direccion: new FormControl('', [
        Validators.required,
      ]),
      // fechaNacimiento: new FormControl(),
      contrasena: contrasena,
      confirmarContrasena: confirmarContrasena,
      // imagen: new FormControl(),
    })
  }

  createUser(){
    if(this.createUserForm.valid){
      const usuario = {
        ...this.createUserForm.value,
        imagen: 'user-temp.png',
        fechaNacimiento: "2019-11-18",
        cambiarContrasena: 0
      };
      console.log(usuario);

      this.usuariosService.createUsuario(usuario).subscribe(
        (data => {
          console.log(data);
          this.router.navigate(['/catalogos-administrativos/usuarios']);
          this.useAlerts('Creación de Usuario', 'Correcto', 'success-dialog');
        }),
        (error => console.log(error))
      );
    }
  }

  getCatalogos() {
    this.empresas = this.empresasService.getAllEmpresas();
    this.perfiles = this.perfilesService.getAllPerfiles();
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
