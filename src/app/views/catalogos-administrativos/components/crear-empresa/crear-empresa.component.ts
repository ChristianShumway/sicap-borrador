import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { Empresa } from './../../../../shared/models/empresa';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EmpresasService } from '../../../../shared/services/empresas.service';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.scss']
})
export class CrearEmpresaComponent implements OnInit {

  formData = {}
  console = console;
  createCompanyForm: FormGroup;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private empresasService: EmpresasService
  ) { }

  ngOnInit() {
    this.getValidations();
  }

  getValidations() {
    this.createCompanyForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
      ]),
      direccion: new FormControl('', [
        Validators.required,
      ]),
      telefono: new FormControl('', CustomValidators.phone('BD')),
      rfc: new FormControl('', [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
      ]),
      descripcion: new FormControl(),
    })
  }

  createCompany(){
    if(this.createCompanyForm.valid){
      const empresa: Empresa = {
        ...this.createCompanyForm.value,
        imagen: 'cima.png'
      };
      console.log(empresa);
      this.empresasService.createEmpresa(empresa).subscribe(
        ( (success: any) => {
          console.log(success);
          if(success.estatus === '05'){
            this.router.navigate(['/configuracion/empresas']);
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
