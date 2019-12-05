import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ProveedoresService } from './../../../../shared/services/proveedores.service';
import { Proveedor } from './../../../../shared/models/proveedor';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modificar-proveedor',
  templateUrl: './modificar-proveedor.component.html',
  styleUrls: ['./modificar-proveedor.component.scss']
})
export class ModificarProveedorComponent implements OnInit {

  proveedor: Proveedor;
  formData = {}
  console = console;
  updateProveedorForm: FormGroup;
  proveedorId;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private proveedoresService: ProveedoresService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getProveedor();
    this.getValidations();
  }

  getProveedor() {
    this.activatedRoute.params.subscribe((data: Params) => {
       this.proveedorId = data.id;
      if (this.proveedorId) {
        this.proveedoresService.getProveedor(this.proveedorId).subscribe(
          ( (proveedor: Proveedor) => {
            // console.log(proveedor);
            this.updateProveedorForm.patchValue(proveedor);
          }),
          (error => console.log(error))
        );
      }
    })
  }

  updateProveedor(){
    if(this.updateProveedorForm.valid){
      const proveedor = {
        idProveedor: parseInt(this.proveedorId),
        ...this.updateProveedorForm.value,
        activo: 1
      };
      console.log(proveedor);
      this.proveedoresService.updateProveedor(proveedor).subscribe(
        ( (response: any) => {
          console.log(response);
          if(response.estatus === '05'){
            this.router.navigate(['/configuracion/proveedores']);
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
    this.updateProveedorForm = new FormGroup({
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
      telefono: new FormControl('', Validators.required),
      familia: new FormControl('', [
        Validators.required,
      ]),
      especialidad: new FormControl('', [
        Validators.required,
      ]),
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
