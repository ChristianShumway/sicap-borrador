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
import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { Cliente } from './../../../../shared/models/cliente';
import { ClientesService } from '../../../../shared/services/clientes.service';
import { filter } from 'rxjs/operators';
import { Usuario } from '../../../../shared/models/usuario';

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
  fechaNacimientoFinal;
  pipe = new DatePipe('en-US');
  idUsuarioLogeado;
  esCliente: boolean = false;
  clientes: Cliente[];
  
  constructor(
    private router: Router,
    private empresasService: EmpresasService,
    private perfilesService: PerfilesService,
    private snackBar: MatSnackBar,
    private usuariosService: UsuariosService,
    private autenticacionService: AutenticacionService,
    private clientesService: ClientesService,
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getCatalogos();
    this.fechaNacimientoFinal = new Date(this.createUserForm.controls['fechaNacimiento'].value);
    this.fechaNacimientoFinal.setDate(this.fechaNacimientoFinal.getDate());
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
  }

  getValidations() {
    let contrasena = new FormControl('', [Validators.required,  Validators.minLength(8),]);
    let confirmarContrasena = new FormControl('', CustomValidators.equalTo(contrasena));

    this.createUserForm = new FormGroup({
      puesto: new FormControl('', [
        Validators.required,
      ]),
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
      apellidoMaterno: new FormControl(),
      usuario: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      idPerfil: new FormControl('', [
        Validators.required
      ]),
      idCliente: new FormControl('', Validators.required),
      idEmpresa: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
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
      const usuario:Usuario = {
        ...this.createUserForm.value,
        imagen: 'user-temp.png',
        fechaNacimiento: myFormatedDate,
        cambiarContrasena: 0,
        // idUsuarioModifico: this.idUsuarioLogeado
      };
      console.log(usuario);
      this.usuariosService.createUsuario(usuario).subscribe(
        response => {
          if(response.estatus === '05'){
            this.router.navigate(['/configuracion/usuarios']);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        },
        error => this.useAlerts(error.message, ' ', 'error-dialog')
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

  getClientes(idPerfil){
    if (idPerfil === 11) {
      // console.log(idPerfil);
      this.esCliente = true;
      this.clientesService.getClientes().subscribe(
        (clientes: Cliente[]) => {
          this.clientes = clientes.filter( (cliente:Cliente) => cliente.activo === 1);
          this.createUserForm.controls['idEmpresa'].setValue(0);
          // console.log(this.clientes);
        },
        error => console.log(error)
      );
    } else {
      this.esCliente = false;
      this.createUserForm.controls['idCliente'].setValue(0);
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