import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmpleadoService } from '../../../../shared/services/empleado.service';
import { Empleado } from '../../../../shared/models/empleado';
import { EmpresasService } from './../../../../shared/services/empresas.service';
import { Empresa } from './../../../../shared/models/empresa';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';

@Component({
  selector: 'app-modificar-empleado',
  templateUrl: './modificar-empleado.component.html',
  styleUrls: ['./modificar-empleado.component.scss']
})
export class ModificarEmpleadoComponent implements OnInit {

  formData = {}
  console = console;
  updateEmpleadoForm: FormGroup; 
  empresas: Empresa[];
  idEmpleado;
  idUsuarioLogeado;
  
  constructor(
    private router: Router,
    private empleadoService: EmpleadoService,
    private activatedRoute: ActivatedRoute,
    private empresasService: EmpresasService,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getEmpleado();
    this.getCatalogos();
  }

  getEmpleado() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idEmpleado = data.id;
      if(this.idEmpleado) {
        this.empleadoService.getEmpleado(this.idEmpleado).subscribe(
          ( (empleado: Empleado) => {
            console.log(empleado);
            this.updateEmpleadoForm.patchValue(empleado);
          }),
          (error => console.log(error))
        );
      }
    });
  }

  getValidations() {
    this.updateEmpleadoForm = new FormGroup({
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

  updateEmpleado(){
    if(this.updateEmpleadoForm.valid){
      const empleado = {
        idEmpleado: parseInt(this.idEmpleado),
        ...this.updateEmpleadoForm.value,
        activo: 1,
        // usuarioModifico: this.idUsuarioLogeado
      };

      console.log(empleado);

      this.empleadoService.updateEmpleado(empleado).subscribe(
        (response => {
          // console.log(response);
          if(response.estatus === '05'){
            this.router.navigate(['/configuracion/empleados']);
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
