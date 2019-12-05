import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ClientesService } from './../../../../shared/services/clientes.service';
import { Cliente } from './../../../../shared/models/cliente';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.scss']
})
export class ModificarClienteComponent implements OnInit {

  cliente: Cliente;
  formData = {}
  console = console;
  updateClienteForm: FormGroup;
  clienteId;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clientesService: ClientesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getCliente();
    this.getValidations();
  }

  getCliente() {
    this.activatedRoute.params.subscribe((data: Params) => {
       this.clienteId = data.id;
      if (this.clienteId) {
        this.clientesService.getCliente(this.clienteId).subscribe(
          ( (cliente: Cliente) => {
            this.updateClienteForm.patchValue(cliente);
          }),
          (error => console.log(error))
        );
      }
    })
  }

  updateCliente(){
    if(this.updateClienteForm.valid){
      const cliente:Cliente = {
        idCliente: parseInt(this.clienteId),
        ...this.updateClienteForm.value,
        activo: 1
      };
      console.log(cliente);
      this.clientesService.updateCliente(cliente).subscribe(
        ( (response: any) => {
          console.log(response);
          if(response.estatus === '05'){
            this.router.navigate(['/configuracion/clientes']);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        }),
        ( error => {
          console.log(error);
          this.useAlerts(error.mensaje, ' ', 'error-dialog');
        })
      );
    }
  }

  getValidations() {
    this.updateClienteForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
      ]),
      direccion: new FormControl('', [
        Validators.required,
      ]),
      rfc: new FormControl('', [
        Validators.required,
      ]),
      telefono: new FormControl('', Validators.required),
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
