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
import { DatePipe } from '@angular/common';

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
  fechaNacimientoFinal = Date;
  pipe = new DatePipe('en-US');
  
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
      fechaNacimiento: new FormControl(new Date()),
      contrasena: contrasena,
      confirmarContrasena: confirmarContrasena,
      // imagen: new FormControl(),
    })
  }

  public onFechaNacimiento(event): void {
    this.fechaNacimientoFinal = event.value;
  }

  createUser(){
    if(this.createUserForm.valid){
      const format = 'yyyy/MM/dd';
      const myFormatedDate = this.pipe.transform(this.fechaNacimientoFinal, format);
      const usuario = {
        ...this.createUserForm.value,
        imagen: 'user-temp.png',
        fechaNacimiento: myFormatedDate,
        cambiarContrasena: 0
      };
      // console.log(usuario);
      this.usuariosService.createUsuario(usuario).subscribe(
        (response => {
          // console.log(response);
          if(response.estatus === '05'){
            this.router.navigate(['/configuracion/usuarios']);
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
    }
  }

  getCatalogos() {
    this.empresasService.getAllEmpresas().subscribe(
      ( (empresas: Empresa[]) => {
        this.empresas = empresas.filter( empresa => empresa.activo === 1);
      }),
      (error => console.log(error))
    );
    this.perfilesService.getAllPerfiles().subscribe(
      ( (perfiles: Perfil[]) => {
        this.perfiles = perfiles.filter( perfil => perfil.activo === 1 && perfil.nombre !== 'Bajas');
      }),
      (error => console.log(error))
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