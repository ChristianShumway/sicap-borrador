import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { Empresa } from './../../../../shared/models/empresa';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EmpresasService } from '../../../../shared/services/empresas.service';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.scss']
})
export class CrearEmpresaComponent implements OnInit {

  formData = {}
  console = console;
  createCompanyForm: FormGroup;
  idUsuarioLogeado;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private empresasService: EmpresasService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getValidations();
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
  }

  getValidations() {
    this.createCompanyForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
      ]),
      direccion: new FormControl('', [
        Validators.required,
      ]),
      telefono: new FormControl('', Validators.required),
      rfc: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(13),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      descripcion: new FormControl(),
    })
  }

  createCompany(){
    if(this.createCompanyForm.valid){
      const empresa: Empresa = {
        ...this.createCompanyForm.value,
        imagen: 'cima.png',
        // usuarioCreo: this.idUsuarioLogeado
      };
      console.log(empresa);
      this.empresasService.createEmpresa(empresa).subscribe(
        ( (response: any) => {
          console.log(response);
          if(response.estatus === '05'){
            this.router.navigate(['/configuracion/empresas']);
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

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
