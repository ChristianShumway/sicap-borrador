import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { EmpresasService } from './../../../../shared/services/empresas.service';
import { Empresa } from './../../../../shared/models/empresa';

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private empresasService: EmpresasService
  ) { }

  ngOnInit() {
    this.getEmpresa();
    this.getValidations();
  }

  updateCompany(){
    if(this.updateCompanyForm.valid){
      const company = this.updateCompanyForm.value;
      this.router.navigate(['catalogos-administrativos/empresas']);
      console.log(company);
    }
  }

  getEmpresa() {
    this.activatedRoute.params.subscribe((data: Params) => {
      const empresaId = data.id;
      if (empresaId) {
        this.empresa = this.empresasService.getEmpresa(empresaId);
      }
    })
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
      agreed: new FormControl('', (control: FormControl) => {
        const agreed = control.value;
        if (!agreed) {
          return { agreed: true }
        }
        return null;
      })
    })
  }

}
