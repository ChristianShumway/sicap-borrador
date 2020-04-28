import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { EmpresasService } from './../../../../shared/services/empresas.service';
import { Empresa } from './../../../../shared/models/empresa';
import { PerfilesService } from '../../../../shared/services/perfiles.service';
import { Perfil } from './../../../../shared/models/perfil';
import { Usuario } from '../../../../shared/models/usuario';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { Cliente } from '../../../../shared/models/cliente';
import { ClientesService } from '../../../../shared/services/clientes.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {
  formData = {}
  console = console;
  updateUserForm: FormGroup; 
  empresas: Empresa[];
  perfiles: Perfil[];
  clientes: Cliente[];
  usuario: Usuario;
  idUser;
  fechaNacimientoFinal;
  pipe = new DatePipe('en-US');
  idUsuarioLogeado;
  esCliente = false;
  
  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private empresasService: EmpresasService,
    private perfilesService: PerfilesService,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    private clientesService: ClientesService,
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getUser();
    // this.getCatalogos();
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
  }

  getUser() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idUser = data.id;
      if(this.idUser) {
        this.usuarioService.getUsuario(this.idUser).subscribe(
          (user: Usuario) => {
            console.log(user);
            this.usuario = user;
            this.getCatalogos();
            this.getClientesOrEmpresas(this.usuario.idPerfil);

            
            let fechaString = user.fechaNacimiento;
            this.fechaNacimientoFinal = new Date(fechaString);
            this.fechaNacimientoFinal.setDate(this.fechaNacimientoFinal.getDate()+1);
            this.updateUserForm.patchValue(user);
          },
          error => console.log(error)
        );
      }
    });
  }

  getValidations() {
    this.updateUserForm = new FormGroup({
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
      apellidoMaterno: new FormControl(''),
      usuario: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      idPerfil: new FormControl('', [
        Validators.required
      ]),
      idEmpresa: new FormControl('', [
        Validators.required
      ]),
      idCliente: new FormControl('', [
        Validators.required
      ]),
      telefono: new FormControl('', Validators.required),
      direccion: new FormControl('', [
        Validators.required,
      ]),
      fechaNacimiento: new FormControl(this.fechaNacimientoFinal),
    })
  }

  public onFechaNacimiento(event): void {
    this.fechaNacimientoFinal = event.value;
  }

  updateUser(){
    if(this.updateUserForm.valid){
      const format = 'yyyy/MM/dd';
      const myFormatedDate = this.pipe.transform(this.fechaNacimientoFinal, format);
      console.log(myFormatedDate);
      const usuario = {
        idUsuario: parseInt(this.idUser),
        ...this.updateUserForm.value,
        fechaNacimiento: myFormatedDate,
        // usuarioModifico: this.idUsuarioLogeado
      };
      console.log(usuario);

      this.usuarioService.updateUsuario(usuario).subscribe(
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
    this.perfilesService.getAllPerfiles().subscribe(
      (perfiles: Perfil[]) => this.perfiles = perfiles.filter( perfil => perfil.activo === 1 && perfil.nombre !== 'Bajas'),
      error => console.log(error)
    );
  }

  getClientesOrEmpresas(idPerfil){
    // console.log(idPerfil);
    if (idPerfil === 11) {
      this.esCliente = true;
      this.clientesService.getClientes().subscribe(
        (clientes: Cliente[]) => {
          this.clientes = clientes.filter( (cliente:Cliente) => cliente.activo === 1);
          this.updateUserForm.controls['idEmpresa'].setValue(0);
          // console.log(this.clientes);
        },
        error => console.log(error)
      );

    } else {
      this.esCliente = false;
      this.empresasService.getAllEmpresas().subscribe(
        (empresas: Empresa[]) => {
          this.empresas = empresas.filter( empresa => empresa.activo === 1);
          this.updateUserForm.controls['idCliente'].setValue(0);
        },
        error => console.log(error)
      );
    }
    // console.log(this.esCliente);
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
