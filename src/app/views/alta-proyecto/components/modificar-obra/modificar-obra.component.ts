import { Component, OnInit } from '@angular/core';
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
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';

@Component({
  selector: 'app-modificar-obra',
  templateUrl: './modificar-obra.component.html',
  styleUrls: ['./modificar-obra.component.scss']
})
export class ModificarObraComponent implements OnInit {

  updateObraForm: FormGroup;
  empresas: Empresa[];
  clientes: Cliente[];
  supervisores: Usuario[];
  gerenteProyecto: Usuario[];
  planeacionPresupuestos: Usuario[];
  controlObra: Usuario[];
  compras: Usuario[];
  destajistas: Destajista[];
  fechaInicioObra;
  fechaFinObra;
  pipe = new DatePipe('en-US');
  error:any={isError:false,errorMessage:''};
  obraId;
  idUsuarioLogeado;
  observacionText: string;
  observacionesGenerales = [];
  
  constructor(
    private router: Router,
    private obraService: ObraService,
    private empresasService: EmpresasService,
    private clientesService: ClientesService,
    private usuariosService: UsuariosService,
    private destajistasService: DestajistasService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getObra();
    this.getCatalogos();
    this.getValidations();
    this.compareTwoDates();
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
  }

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.obraId = data.id;
      if(this.obraId){
        this.obraService.getObra(this.obraId).subscribe(
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
    });
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
      noLicitacion: new FormControl('', [
        Validators.required,
      ]),
      nombreObra: new FormControl('', [
        Validators.required,
      ]),
      lugarTrabajo: new FormControl('', [
        Validators.required
      ]),
      objetivo: new FormControl('', [
        Validators.required,
      ]),
      fechaInicio: new FormControl(this.fechaInicioObra, Validators.required),
      fechaFin: new FormControl(this.fechaFinObra, Validators.required),
      plazoEjecucion: new FormControl('0', [
        Validators.required
      ]),
      idGerente: new FormControl('', [
        Validators.required
      ]),
      idPlaneacionPresupuesto: new FormControl('', [
        Validators.required,
      ]),
      idControlObra: new FormControl('', [
        Validators.required,
      ]),
      idCompras: new FormControl('', [
        Validators.required,
      ]),
      idSupervisor: new FormControl('', [
        Validators.required
      ]),
      idDestajista: new FormControl('', [
        Validators.required
      ]),
      cantidadPersonal: new FormControl('', [
        Validators.required,
      ]),
      presupuestoTotal: new FormControl('', [
        Validators.required,
      ]),
      presupuestoMaterial: new FormControl('', [
        Validators.required,
      ]),
      presupuestoManoObra: new FormControl('', [
        Validators.required
      ]),
      presupuestoSubcontrato: new FormControl('', [
        Validators.required
      ]),
      presupuestoMaquinaria: new FormControl('', [
        Validators.required
      ]),
      importeIndirecto: new FormControl('', [
        Validators.required
      ]),
      importeFinanciamiento: new FormControl('', [
        Validators.required
      ]),
      utilidadEsperada: new FormControl('', [
        Validators.required
      ]),
      cargosAdicionales: new FormControl('', [
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
    // const controlFechaInicio = new Date(this.fechaInicioObra);
    // const controlFechaFin = new Date(this.fechaFinObra);
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
      const obra: Obra = {
        idObra: parseInt(this.obraId),
        ...this.updateObraForm.value,
        fechaInicio: nuevaFechaInicio,
        fechaFin: nuevaFechaFin,
        presupuestoTotal: parseFloat(this.updateObraForm.value.presupuestoTotal),
        presupuestoMaterial: parseFloat(this.updateObraForm.value.presupuestoMaterial),
        presupuestoMaquinaria: parseFloat(this.updateObraForm.value.presupuestoMaquinaria),
        presupuestoManoObra: parseFloat(this.updateObraForm.value.presupuestoManoObra),
        presupuestoSubcontrato: parseFloat(this.updateObraForm.value.presupuestoSubcontrato),
        importeIndirecto: parseFloat(this.updateObraForm.value.importeIndirecto),
        importeFinanciamiento: parseFloat(this.updateObraForm.value.importeFinanciamiento),
        utilidadEsperada: parseFloat(this.updateObraForm.value.utilidadEsperada),
        cargosAdicionales: parseFloat(this.updateObraForm.value.cargosAdicionales),
        activo:1,
        // idUsuarioModifico: this.idUsuarioLogeado
      };
      console.log(obra);
      const sumaPresupuestos = (obra.presupuestoMaterial + obra.presupuestoMaquinaria + obra.presupuestoManoObra + obra.presupuestoSubcontrato + obra.importeIndirecto + obra.importeFinanciamiento + obra.utilidadEsperada + obra.cargosAdicionales);
      if(obra.presupuestoTotal < sumaPresupuestos){
        this.useAlerts('Monto total del contrato no puede ser menor a la suma de presupuestos', ' ', 'warning-dialog');
      } else {
        this.obraService.updateObra(obra).subscribe(
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

    // this.clientes = this.clientesService.clientesTemp;

    this.usuariosService.getUsuarios().subscribe(
      (supervisores: Usuario[]) => {
        this.supervisores = supervisores.filter( supervisor => supervisor.idPerfil === 9);
        this.gerenteProyecto = supervisores.filter( supervisor => supervisor.idPerfil === 10);
        this.planeacionPresupuestos = supervisores.filter( supervisor => supervisor.idPerfil === 2);
        this.controlObra = supervisores.filter( supervisor => supervisor.idPerfil === 3);
        this.compras = supervisores.filter( supervisor => supervisor.idPerfil === 8);
      },
      error => console.log(error)
    );

    this.destajistasService.getDestajistas().subscribe(
      (destajistas: Destajista[]) => {
        this.destajistas = destajistas.filter( destajista => destajista.activo === 1);
      },
      error => console.log(error)
    );

    // this.destajistas = this.destajistasService.destajistasTemp;
  }

  addObservation(observacion){
    this.observacionesGenerales.push(observacion);
    this.observacionText="";
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
