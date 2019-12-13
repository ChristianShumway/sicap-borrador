import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { ObraService } from '../../../../shared/services/obra.service';
import { EmpresasService } from './../../../../shared/services/empresas.service';
import { ClientesService } from '../../../../shared/services/clientes.service';
import { UsuariosService } from 'app/shared/services/usuarios.service';
import { DestajistasService } from './../../../../shared/services/destajistas.service';

import { Empresa } from './../../../../shared/models/empresa';
import { Cliente } from './../../../../shared/models/cliente';
import { Usuario } from './../../../../shared/models/usuario';
import { Destajista } from './../../../../shared/models/destajista';

import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crear-obra',
  templateUrl: './crear-obra.component.html',
  styleUrls: ['./crear-obra.component.scss']
})
export class CrearObraComponent implements OnInit {

  formData = {}
  console = console;
  createObraForm: FormGroup;
  empresas: Empresa[];
  clientes: Cliente[];
  supervisores: Usuario[];
  destajistas: Destajista[];
  fechaInicioObra;
  fechaFinObra;
  pipe = new DatePipe('en-US');
  error:any={isError:false,errorMessage:''};
  
  constructor(
    private router: Router,
    private obraService: ObraService,
    private empresasService: EmpresasService,
    private clientesService: ClientesService,
    private usuariosService: UsuariosService,
    private destajistasService: DestajistasService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getCatalogos();
    this.compareTwoDates();
    this.fechaInicioObra = new Date(this.createObraForm.controls['fechaInicio'].value);
    this.fechaFinObra = new Date(this.createObraForm.controls['fechaFin'].value);
    this.fechaInicioObra.setDate(this.fechaInicioObra.getDate());
    this.fechaFinObra.setDate(this.fechaFinObra.getDate());
  }

  getValidations() {

    this.createObraForm = new FormGroup({
      idEmpresa: new FormControl('', [
        Validators.required,
      ]),
      idCliente: new FormControl('', [
        Validators.required,
      ]),
      noContrato: new FormControl('', [
        Validators.required,
      ]),
      nombreObra: new FormControl('', [
        Validators.required,
      ]),
      presupuestoTotal: new FormControl('', [
        Validators.required,
      ]),
      fechaInicio: new FormControl(new Date(), Validators.required),
      fechaFin: new FormControl(new Date(), Validators.required),
      plazoEjecucion: new FormControl('0', [
        Validators.required
      ]),
      lugarTrabajo: new FormControl('', [
        Validators.required
      ]),
      idSupervisor: new FormControl('', [
        Validators.required
      ]),
      idDestajista: new FormControl('', [
        Validators.required
      ]),
      presupuestoMaterial: new FormControl('', [
        Validators.required,
      ]),
      presupuestoManoObra: new FormControl('', [
        Validators.required
      ]),
      presupuestoMaquinaria: new FormControl('', [
        Validators.required
      ]),
      presupuestoDestajo: new FormControl('', [
        Validators.required
      ]),
    })
  }

  public onFechaInicioObra(event): void {
    this.fechaInicioObra = event.value;
    this.compareTwoDates();
  }

  public onFechaFinObra(event): void {
    this.fechaFinObra = event.value;
    this.compareTwoDates();
  }

  compareTwoDates(){
    const controlFechaInicio = new Date(this.createObraForm.controls['fechaInicio'].value);
    const controlFechaFin = new Date(this.createObraForm.controls['fechaFin'].value);
    this.getPlazoEjecucion(controlFechaInicio, controlFechaFin);

    if( controlFechaFin < controlFechaInicio){
        this.error={isError:true,errorMessage:'Fecha inicio de la obra no puede ser mayor a la fecha final de la obra'};
        this.createObraForm.controls['fechaInicio'].setValue('');
    } else {
      this.error={isError:false};
    }
  }

  getPlazoEjecucion(fi, ff){
    const format = 'yyyy/MM/dd';
    const nuevaFechaInicio = this.pipe.transform(fi, format);
    const nuevaFechaFin = this.pipe.transform(ff, format);
    var fechaInicio = new Date(nuevaFechaInicio).getTime();
    var fechaFin    = new Date(nuevaFechaFin).getTime();
    const plazoEjecucion = fechaFin - fechaInicio;
    this.createObraForm.controls['plazoEjecucion'].setValue(Math.ceil(plazoEjecucion/(1000*60*60*24)));
  }

  createObra(){
    if(this.createObraForm.valid){
      const format = 'yyyy/MM/dd';
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicioObra, format);
      const nuevaFechaFin = this.pipe.transform(this.fechaFinObra, format);
      const obra = {
        ...this.createObraForm.value,
        fechaInicio: nuevaFechaInicio,
        fechaFin: nuevaFechaFin,
        activo:1
      };
      console.log(obra);
      this.obraService.createObra(obra).subscribe(
        (response => {
          if(response.estatus === '05'){
            this.router.navigate(['/alta-proyecto/obras']);
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

    this.clientesService.getClientes().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes.filter( cliente => cliente.activo === 1);
      },
      error => console.log(error)
    );

    this.clientes = this.clientesService.clientesTemp;

    this.usuariosService.getUsuarios().subscribe(
      (supervisores: Usuario[]) => {
        this.supervisores = supervisores.filter( supervisor => supervisor.idPerfil === 9);
      },
      error => console.log(error)
    );

    this.destajistasService.getDestajistas().subscribe(
      (destajistas: Destajista[]) => {
        this.destajistas = destajistas.filter( destajista => destajista.activo === 1);
      },
      error => console.log(error)
    );

    this.destajistas = this.destajistasService.destajistasTemp;
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