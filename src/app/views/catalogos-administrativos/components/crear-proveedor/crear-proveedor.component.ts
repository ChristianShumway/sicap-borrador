import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { ProveedoresService } from './../../../../shared/services/proveedores.service';
import { Proveedor } from './../../../../shared/models/proveedor';
import { Perfil } from './../../../../shared/models/perfil';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.scss']
})
export class CrearProveedorComponent implements OnInit {

  formData = {}
  console = console;
  createProveedorForm: FormGroup;
  
  constructor(
    private router: Router,
    private proveedoresService: ProveedoresService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getValidations();
  }

  getValidations() {
    this.createProveedorForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
      ]),
      razonSocial: new FormControl('', [
        Validators.required,
      ]),
      rfc: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(13)
      ]),
      direccion: new FormControl('', [
        Validators.required,
      ]),
      localizacion: new FormControl('', [
        Validators.required
      ]),
      telefono: new FormControl('', CustomValidators.phone('BD')),
      familia: new FormControl('', [
        Validators.required,
      ]),
      especialidad: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  createProveedor(){
    if(this.createProveedorForm.valid){
      const proveedor = {
        ...this.createProveedorForm.value,
      };
      console.log(proveedor);
      // this.proveedoresService.createProveedor(proveedor).subscribe(
      //   (response => {
      //     if(response.estatus === '05'){
      //       this.router.navigate(['/configuracion/proveedores']);
      //       this.useAlerts(response.mensaje, ' ', 'success-dialog');
      //     } else {
      //       this.useAlerts(response.mensaje, ' ', 'error-dialog');
      //     }
      //   }),
      //   (error => {
      //     console.log(error);
      //     this.useAlerts(error.mensaje, ' ', 'success-dialog');
      //   })
      // );
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
