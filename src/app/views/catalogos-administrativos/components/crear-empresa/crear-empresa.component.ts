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
        ( success => {
          console.log(success);
          this.router.navigate(['/catalogos-administrativos/empresas']);
          this.useAlerts('Creación de Empresa', 'Correcto', 'success-dialog');
        }),
        (error => {
          console.log(error);
          this.useAlerts('Creación de Empresa', 'Incorrecto', 'error-dialog');
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
