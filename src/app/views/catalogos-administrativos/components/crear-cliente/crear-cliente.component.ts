import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { Cliente } from './../../../../shared/models/cliente';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientesService } from '../../../../shared/services/clientes.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent implements OnInit {

  formData = {}
  console = console;
  createClienteForm: FormGroup;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private clientesService: ClientesService
  ) { }

  ngOnInit() {
    this.getValidations();
  }

  getValidations() {
    this.createClienteForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
      ]),
      direccion: new FormControl('', [
        Validators.required,
      ]),
      rfc: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(13),
      ]),
      telefono: new FormControl('', Validators.required),
    })
  }

  createCliente() {
    if (this.createClienteForm.valid) {
      const cliente: Cliente = {
        ...this.createClienteForm.value,
        activo: 1
      };
      console.log(cliente);
      this.router.navigate(['/configuracion/clientes']);
      this.clientesService.createCliente(cliente).subscribe(
        ((response: any) => {
          console.log(response);
          if (response.estatus === '05') {
            this.router.navigate(['/configuracion/clientes']);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        }),
        (error => {
          console.log(error);
          this.useAlerts(error.mensaje, ' ', 'error-dialog');
        })
      );
    }
  }

  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
