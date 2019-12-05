import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { DestajistasService } from './../../../../shared/services/destajistas.service';
import { Destajista } from './../../../../shared/models/destajista';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EstadosService } from '../../../../shared/services/estados.service';

@Component({
  selector: 'app-modificar-destajista',
  templateUrl: './modificar-destajista.component.html',
  styleUrls: ['./modificar-destajista.component.scss']
})
export class ModificarDestajistaComponent implements OnInit {

  destajista: Destajista;
  formData = {}
  console = console;
  updateDestajistaForm: FormGroup;
  destajistaId;
  estados: any[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private destajistasService: DestajistasService,
    private snackBar: MatSnackBar,
    private estadosService: EstadosService
  ) { }

  ngOnInit() {
    this.getDestajista();
    this.getValidations();
    this.getCatalogo();
  }

  getDestajista() {
    this.activatedRoute.params.subscribe((data: Params) => {
       this.destajistaId = data.id;
      if (this.destajistaId) {
        this.destajistasService.getDestajista(this.destajistaId).subscribe(
          ( (destajista: Destajista) => {
            this.updateDestajistaForm.patchValue(destajista);
          }),
          (error => console.log(error))
        );
      }
    })
  }

  updateDestajista(){
    if(this.updateDestajistaForm.valid){
      const destajista:Destajista = {
        idDestajista: parseInt(this.destajistaId),
        ...this.updateDestajistaForm.value,
        activo: 1
      };
      console.log(destajista);
      this.destajistasService.updateDestajista(destajista).subscribe(
        ( (success: any) => {
          console.log(success);
          if(success.estatus === '05'){
            this.router.navigate(['/configuracion/destajistas']);
            this.useAlerts(success.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(success.mensaje, ' ', 'error-dialog');
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
    this.updateDestajistaForm = new FormGroup({
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

  getCatalogo(){
    this.estadosService.getEstados().subscribe(
      estados => this.estados = estados,
      error => console.log(error)
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
