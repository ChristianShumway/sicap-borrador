import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ObraService } from '../../../../shared/services/obra.service';
import { EmpresasService } from './../../../../shared/services/empresas.service';
import { ClientesService } from '../../../../shared/services/clientes.service';
import { UsuariosService } from 'app/shared/services/usuarios.service';
import { DestajistasService } from './../../../../shared/services/destajistas.service';

import { Empresa } from './../../../../shared/models/empresa';
import { Cliente } from './../../../../shared/models/cliente';
import { Usuario } from './../../../../shared/models/usuario';
import { Destajista } from './../../../../shared/models/destajista';
import { Obra } from '../../../../shared/models/obra';

import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-obra-data',
  templateUrl: './obra-data.component.html',
  styleUrls: ['./obra-data.component.scss']
})
export class ObraDataComponent implements OnInit {

  @Input() obra: Obra;

  formData = {}
  console = console;
  updateObraForm: FormGroup;
  empresas: Empresa[];
  clientes: Cliente[];
  supervisores: Usuario[];
  destajistas: Destajista[];
  fechaInicioObra;
  fechaFinObra;
  pipe = new DatePipe('en-US');
  error:any={isError:false,errorMessage:''};
  obraId;

  constructor(
    private router: Router,
    private obraService: ObraService,
    private empresasService: EmpresasService,
    private clientesService: ClientesService,
    private usuariosService: UsuariosService,
    private destajistasService: DestajistasService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getObra();
    this.getCatalogos();
    this.getValidations();
    this.compareTwoDates();
  }

  getObra(){
    this.obraService.getObra(this.obra.idObra).subscribe(
      (obra: Obra) => {
        console.log(obra);
        let inicioString = obra.fechaInicio;
        let finString = obra.fechaFin;
        this.fechaInicioObra = new Date(inicioString);
        this.fechaInicioObra.setDate(this.fechaInicioObra.getDate()+1);
        this.fechaFinObra = new Date(finString);
        this.fechaFinObra.setDate(this.fechaFinObra.getDate()+1);
        this.updateObraForm.patchValue(obra);
      },
      error => console.log(error)
    );   
  }

  getValidations() {
    this.updateObraForm = new FormGroup({
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
      fechaInicio: new FormControl(this.fechaInicioObra, Validators.required),
      fechaFin: new FormControl(this.fechaFinObra, Validators.required),
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
    const controlFechaInicio = new Date(this.updateObraForm.controls['fechaInicio'].value);
    const controlFechaFin = new Date(this.updateObraForm.controls['fechaFin'].value);
    this.getPlazoEjecucion(controlFechaInicio, controlFechaFin);

    if( controlFechaFin < controlFechaInicio){
        this.error={isError:true,errorMessage:'Fecha inicio de la obra no puede ser mayor a la fecha final de la obra'};
        this.updateObraForm.controls['fechaInicio'].setValue('');
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
    this.updateObraForm.controls['plazoEjecucion'].setValue(Math.ceil(plazoEjecucion/(1000*60*60*24)));
  }

  updateObra(){
    if(this.updateObraForm.valid){
      const format = 'yyyy/MM/dd';
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicioObra, format);
      const nuevaFechaFin = this.pipe.transform(this.fechaFinObra, format);
      const obra = {
        idObra: this.obra.idObra,
        ...this.updateObraForm.value,
        fechaInicio: nuevaFechaInicio,
        fechaFin: nuevaFechaFin,
        activo:1
      };
      console.log(obra);
      this.obraService.updateObra(obra).subscribe(
        (response => {
          if(response.estatus === '05'){
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.obraService.getObraObservable(this.obra.idObra);
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
