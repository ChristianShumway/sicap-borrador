import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { EmpresasService } from './../../../../shared/services/empresas.service';
import { Empresa } from './../../../../shared/models/empresa';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EmpleadoService } from 'app/shared/services/empleado.service';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss']
})
export class CrearEmpleadoComponent implements OnInit {

  formData = {}
  console = console;
  createEmpleadoForm: FormGroup;
  empresas: Empresa[];
  idUsuarioLogeado;
  
  constructor(
    private router: Router,
    private empleadoService: EmpleadoService,
    private empresasService: EmpresasService,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getCatalogos();
  }

  getValidations() {
    this.createEmpleadoForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
      ]),
      idEmpresa: new FormControl('', [
        Validators.required
      ]),
      puesto: new FormControl('', [
        Validators.required,
      ]),
      telefono: new FormControl('', Validators.required),
      especialidad: new FormControl('', [
        Validators.required,
      ]),
    })
  }


  createEmpleado(){
    if(this.createEmpleadoForm.valid){
      const empleado = {
        ...this.createEmpleadoForm.value,
        activo: 1,
        // usuarioCreo: this.idUsuarioLogeado
      };
      console.log(empleado);
      this.empleadoService.createEmpleado(empleado).subscribe(
        response => {
          if(response.estatus === '05'){
            this.router.navigate(['/configuracion/empleados']);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        },
        error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        }
      );
    }
  }

  getCatalogos() {
    this.empresasService.getAllEmpresas().subscribe(
      ( (empresas: Empresa[]) => {
        this.empresas = empresas.filter( empresa => empresa.activo === 1);
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
