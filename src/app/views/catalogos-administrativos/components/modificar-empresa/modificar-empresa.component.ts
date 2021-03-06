import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { EmpresasService } from './../../../../shared/services/empresas.service';
import { Empresa } from './../../../../shared/models/empresa';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';

@Component({
  selector: 'app-modificar-empresa',
  templateUrl: './modificar-empresa.component.html',
  styleUrls: ['./modificar-empresa.component.scss']
})
export class ModificarEmpresaComponent implements OnInit {

  empresa: Empresa;
  formData = {}
  console = console;
  updateCompanyForm: FormGroup;
  empresaId;
  idUsuarioLogeado;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private empresasService: EmpresasService,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getEmpresa();
    this.getValidations();
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
  }

  getEmpresa() {
    this.activatedRoute.params.subscribe((data: Params) => {
       this.empresaId = data.id;
      if (this.empresaId) {
        this.empresasService.getEmpresa(this.empresaId).subscribe(
          ( (empresa: Empresa) => {
            // console.log(empresa);
            this.updateCompanyForm.patchValue(empresa);
          }),
          (error => console.log(error))
        );
      }
    })
  }

  updateCompany(){
    if(this.updateCompanyForm.valid){
      const company = {
        idEmpresa: parseInt(this.empresaId),
        ...this.updateCompanyForm.value,
        // usuarioModifico: this.idUsuarioLogeado
      };
      console.log(company);
      this.empresasService.updateEmpresa(company).subscribe(
        ( (response: any) => {
          console.log(response);
          if(response.estatus === '05'){
            this.router.navigate(['/configuracion/empresas']);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        }),
        ( error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        })
      );
    }
  }

  getValidations() {
    this.updateCompanyForm = new FormGroup({
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

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
