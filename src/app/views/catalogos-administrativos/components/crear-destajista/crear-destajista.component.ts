import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { Destajista } from './../../../../shared/models/destajista';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DestajistasService } from '../../../../shared/services/destajistas.service';
import { EstadosService } from './../../../../shared/services/estados.service';

@Component({
  selector: 'app-crear-destajista',
  templateUrl: './crear-destajista.component.html',
  styleUrls: ['./crear-destajista.component.scss']
})
export class CrearDestajistaComponent implements OnInit {

  formData = {}
  console = console;
  createDestajistaForm: FormGroup;
  estados: any[] = [];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private destajistasService: DestajistasService,
    private estadosService: EstadosService
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getCatalogo();
  }

  getValidations() {
    this.createDestajistaForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
      ]),
      direccion: new FormControl('', [
        Validators.required,
      ]),
      ciudad: new FormControl('', [
        Validators.required,
      ]),
      idEstado: new FormControl('', [
        Validators.required,
      ]),
      telefono: new FormControl('', Validators.required),
      especialidad: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  createDestajista() {
    if (this.createDestajistaForm.valid) {
      const destajista: Destajista = {
        ...this.createDestajistaForm.value,
        activo: 1
      };
      console.log(destajista);
      this.router.navigate(['/configuracion/destajistas']);
      this.destajistasService.createDestajista(destajista).subscribe(
        ((success: any) => {
          console.log(success);
          if (success.estatus === '05') {
            this.router.navigate(['/configuracion/destajistas']);
            this.useAlerts(success.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(success.mensaje, ' ', 'error-dialog');
          }
        }),
        (error => {
          console.log(error);
          this.useAlerts(error.mensaje, ' ', 'error-dialog');
        })
      );
    }
  }

  getCatalogo(){
    this.estadosService.getEstados().subscribe(
      estados => this.estados = estados,
      error => console.log(error)
    );
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
