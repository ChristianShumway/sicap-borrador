import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { EmpresasService } from './../../../../shared/services/empresas.service';
import { Empresa } from './../../../../shared/models/empresa';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private empresasService: EmpresasService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getEmpresa();
    this.getValidations();
  }

  getEmpresa() {
    this.activatedRoute.params.subscribe((data: Params) => {
       this.empresaId = data.id;
      if (this.empresaId) {
        // this.empresa = this.empresasService.getEmpresa(empresaId);
        this.empresasService.getEmpresa(this.empresaId).subscribe(
          ( (empresa: Empresa) => {
            console.log(empresa);
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
        ...this.updateCompanyForm.value
      };
      console.log(company);
      this.empresasService.updateEmpresa(company).subscribe(
        ( success => {
          console.log(success);
          this.router.navigate(['catalogos-administrativos/empresas']);
          this.useAlerts('Modificación de Empresa', 'Correcto', 'success-dialog');
        }),
        (error => console.log(error))
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
      telefono: new FormControl('', CustomValidators.phone('BD')),
      rfc: new FormControl('', [
        Validators.required,
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
