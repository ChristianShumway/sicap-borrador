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
  idUser;
  
  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private empresasService: EmpresasService,
    private perfilesService: PerfilesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getUser();
    this.getCatalogos();
  }

  getUser() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idUser = data.id;
      if(this.idUser) {
        this.usuarioService.getUsuario(this.idUser).subscribe(
          ( (user: Usuario) => {
            console.log(user);
            this.updateUserForm.patchValue(user);
          }),
          (error => console.log(error))
        );
      }
    });
  }

  getValidations() {
    this.updateUserForm = new FormGroup({
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
      fechaNacimiento: new FormControl(),
    })
  }

  updateUser(){
    if(this.updateUserForm.valid){
      const usuario = {
        idUsuario: parseInt(this.idUser),
        ...this.updateUserForm.value,
        fechaNacimiento: "2019-11-18",
      };
      console.log(usuario);

      this.usuarioService.updateUsuario(usuario).subscribe(
        ( success => {
          console.log(success);
          this.router.navigate(['/catalogos-administrativos/usuarios']);
          this.useAlerts('Modificación de Usuario', 'Correcto', 'success-dialog');
        }),
        (error => {
          this.useAlerts('Modificación de Usuario', 'Incorrecto', 'error-dialog');
          console.log(error);
        })
      );
    }
  }

  getCatalogos() {
    this.empresasService.getAllEmpresas().subscribe(
      ( (empresas: Empresa[]) => {
        this.empresas = empresas;
      }),
      (error => console.log(error))
    );
    this.perfilesService.getAllPerfiles().subscribe(
      ( (perfiles: Perfil[]) => {
        this.perfiles = perfiles;
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
