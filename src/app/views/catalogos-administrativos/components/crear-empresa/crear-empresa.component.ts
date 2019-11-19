import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { Empresa } from './../../../../shared/models/empresa';


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
    private router: Router
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
        idEmpresa: 6,
        ...this.createCompanyForm.value,
        imagen: 'assets/images/logos/cima.png'
      };
      console.log(empresa);
      this.router.navigate(['/catalogos-administrativos/empresas']);
    }
  }

}
