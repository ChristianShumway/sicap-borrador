import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { CustomValidators } from 'ng2-validation';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariosService } from 'app/shared/services/usuarios.service';
import { Usuario } from '../../../../shared/models/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  usuario: Usuario;
  updateUserForm: FormGroup;
  fechaNacimientoFinal;
  pipe = new DatePipe('en-US');
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar,
    private router: Router,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getDataUser();
    this.getValidations();
  }

  getDataUser(){
    this.activatedRoute.params
    .subscribe( (data: Params) => {
        if(data.id){
          this.usuariosService.getUsuario(data.id).subscribe(
            (user: Usuario) => {
              this.usuario = user;
              let fechaString = user.fechaNacimiento;
              this.fechaNacimientoFinal = new Date(fechaString);
              this.fechaNacimientoFinal.setDate(this.fechaNacimientoFinal.getDate()+1);
              console.log(this.fechaNacimientoFinal);
              this.updateUserForm.patchValue(user);
            },
            error => console.log(error)
          );
        }
    });
  }

  public onFechaNacimiento(event): void {
    this.fechaNacimientoFinal = event.value;
  }

  updateUser(){
    if(this.updateUserForm.valid){
      const format = 'yyyy/MM/dd';
      const myFormatedDate = this.pipe.transform(this.fechaNacimientoFinal, format);
      this.usuario = {
        ...this.usuario,
        ...this.updateUserForm.value,
        fechaNacimiento: myFormatedDate,
      };
      this.usuariosService.updateUsuario(this.usuario).subscribe(
        (success => {
          // console.log(success);
          if(success.estatus === '05'){
            this.useAlerts(success.mensaje, ' ', 'success-dialog');
            this.autenticacionService.logout();
            this.router.navigate(['/login']);
          } else {
            this.useAlerts(success.mensaje, ' ', 'error-dialog');
          }
        }),
        (error => {
          console.log(error);
          this.useAlerts(error.mensaje, ' ', 'error-dialog');
        })
      );
    }
  }
 

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
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
      telefono: new FormControl('', CustomValidators.phone('BD')),
      direccion: new FormControl('', [
        Validators.required,
      ]),
      fechaNacimiento: new FormControl(this.fechaNacimientoFinal),
    })
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
