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
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';

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
  supervisoresSeleccionados;
  destajistasSeleccionados;

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
    this.getValidations();
    this.compareTwoDates();
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
  }

  getObra(){
    this.obraService.getObra(this.obra.idObra).subscribe(
      (obra: Obra) => {
        console.log(obra);
        this.observacionesGenerales = obra.observacion;
        let inicioString = obra.fechaInicio;
        let finString = obra.fechaFin;
        this.fechaInicioObra = new Date(inicioString);
        this.fechaInicioObra.setDate(this.fechaInicioObra.getDate()+1);
        this.fechaFinObra = new Date(finString);
        this.fechaFinObra.setDate(this.fechaFinObra.getDate()+1);
        this.updateObraForm.patchValue(obra);
        this.supervisoresSeleccionados = obra.supervisor;
        this.destajistasSeleccionados = obra.destajista;
        this.getCatalogos();
      },
      error => console.log(error)
    );   
  }

  getObservacionesObra(){
    this.obraService.getObra(this.obra.idObra).subscribe(
    (obra: Obra) => {
      this.observacionesGenerales = obra.observacion;
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
      supervisor: new FormControl('', [
        Validators.required
      ]),
      destajista: new FormControl('', [
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
        idObra: this.obra.idObra,
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
        // usuarioModifico: this.idUsuarioLogeado
      };
      console.log(obra);
      const sumaPresupuestos = (obra.presupuestoMaterial + obra.presupuestoMaquinaria + obra.presupuestoManoObra + obra.presupuestoSubcontrato + obra.importeIndirecto + obra.importeFinanciamiento + obra.utilidadEsperada + obra.cargosAdicionales);
      if(obra.presupuestoTotal < sumaPresupuestos){
        this.useAlerts('Monto total del contrato no puede ser menor a la suma de presupuestos', ' ', 'warning-dialog');
      } else {
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

    this.usuariosService.getUsuarios().subscribe(
      (supervisores: Usuario[]) => {
        this.supervisores = supervisores.filter( supervisor => supervisor.idPerfil === 9);
        this.gerenteProyecto = supervisores.filter( supervisor => supervisor.idPerfil === 10);
        this.planeacionPresupuestos = supervisores.filter( supervisor => supervisor.idPerfil === 2);
        this.controlObra = supervisores.filter( supervisor => supervisor.idPerfil === 3);
        this.compras = supervisores.filter( supervisor => supervisor.idPerfil === 8);
        const listSupervisoresCheck=[];
        this.supervisores.map( supervisor => {
          this.supervisoresSeleccionados.map( ss => {
            if(supervisor.idUsuario === ss.idUsuario){
              listSupervisoresCheck.push(supervisor);
            }
          });
        });
        this.updateObraForm.get('supervisor').setValue(listSupervisoresCheck);   
      },
      error => console.log(error)
    );

    this.destajistasService.getDestajistas().subscribe(
      (destajistas: Destajista[]) => {
        this.destajistas = destajistas.filter( destajista => destajista.activo === 1);
        const listDestajistasCheck =[];
        this.destajistas.map( destajista => {
          this.destajistasSeleccionados.map( ds => {
            if(destajista.idDestajista === ds.idDestajista){
              listDestajistasCheck.push(destajista);
            }
          });
        });
        this.updateObraForm.get('destajista').setValue(listDestajistasCheck); 
      },
      error => console.log(error)
    );

  }

  addObservation(observacion){
    // this.observacionesGenerales.push(observacion);
    const observacionGeneral = {
      comentario: observacion,
      idUsuarioModifico: this.idUsuarioLogeado,
      idObra: this.obra.idObra
    }
    // console.log(observacionGeneral);
    this.obraService.createObservacionObra(observacionGeneral).subscribe(
      (response => {
        if(response.estatus === '05'){
          this.useAlerts(response.mensaje, ' ', 'success-dialog');
          this.getObservacionesObra();
        } else {
          this.useAlerts(response.mensaje, ' ', 'error-dialog');
        }
      }),
      (error => {
        console.log(error);
        this.useAlerts(error.message, ' ', 'error-dialog');
      })
    );
    this.observacionText="";
    console.log(observacionGeneral);
  }

  deleteObservation(observacion){
    const observacionGeneral = {
      ...observacion,
      idUsuarioModifico: this.idUsuarioLogeado,
    }
    this.obraService.deleteObservacionObra(observacionGeneral).subscribe(
      (response => {
        if(response.estatus === '05'){
          this.useAlerts(response.mensaje, ' ', 'success-dialog');
          this.getObservacionesObra();
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

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
