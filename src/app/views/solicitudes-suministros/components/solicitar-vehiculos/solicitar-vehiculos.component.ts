import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { environment } from './../../../../../environments/environment';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { ObraService } from '../../../../shared/services/obra.service';
import { EmpresasService } from '../../../../shared/services/empresas.service';
import { ClientesService } from '../../../../shared/services/clientes.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { UsuariosService } from '../../../../shared/services/usuarios.service';

import { Obra } from './../../../../shared/models/obra';
import { Empresa } from '../../../../shared/models/empresa';
import { SolicitudVehiculo } from './../../.././../shared/models/solicitud';
import { Cliente } from './../../../../shared/models/cliente';
import { Usuario } from '../../../../shared/models/usuario';

@Component({
  selector: 'app-solicitar-vehiculos',
  templateUrl: './solicitar-vehiculos.component.html',
  styleUrls: ['./solicitar-vehiculos.component.scss']
})
export class SolicitarVehiculosComponent implements OnInit {

  idUsuarioLogeado: any;
  idObra: number;
  obra: Obra;
  empresas: Empresa[];
  clientes: Cliente[];
  ServiciosInteres: any[];
  solicitudForm: FormGroup;
  fechaInicio;
  fechaFinal;
  fechaHoy = new Date();
  error:any={isError:false,errorMessage:''};
  pipe = new DatePipe('en-US');

  nombreComponente = 'solicitudes-suministros-obras';
  tooltip = 'solicitud-materiales';
  opcionesPermitidas = true;

  constructor(
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private obraService: ObraService,
    private snackBar: MatSnackBar,
    private empresasService: EmpresasService,
    private clientesService: ClientesService,
    private navigationService: NavigationService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    // this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.activatedRoute.params.subscribe( (params: Params) => this.idObra = params.idObra);
    this.validateAccessValidation();
  }

  validateAccessValidation() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    const moduloActual = environment.permisosEspeciales.find( modulo => modulo.component === this.nombreComponente && modulo.tooltip === this.tooltip);
    const idModulo = moduloActual.idOpcion;
    console.log(idModulo);

    this.usuariosService.getUsuario(this.idUsuarioLogeado).subscribe(
      (usuario: Usuario) => {
        this.navigationService.validatePermissions(usuario.idPerfil, idModulo).subscribe(
          (result:any) => {
            if ( result.estatus !== '05'){
              this.opcionesPermitidas = false;
            }  else {
              this.opcionesPermitidas = true;
              this.getObra();
            } 
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }
  
  getObra(){
    this.obraService.getObra(this.idObra).subscribe( 
      (obra: Obra) => {
        if(obra){
          this.obra = obra;
          this.getValidations();
          this.getCatalogos();
          this.fechaInicio = new Date(this.solicitudForm.controls['fechaInicioUso'].value);
          this.fechaFinal = new Date(this.solicitudForm.controls['fechaFinalUso'].value);
          this.fechaInicio.setDate(this.fechaInicio.getDate());
          this.fechaFinal.setDate(this.fechaFinal.getDate());
        }
      },
      error => this.useAlerts( error.message, ' ', 'success-dialog')
    );
  }

  getValidations(){
    this.solicitudForm = new FormGroup({
      idEmpresaCliente: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      fechaInicioUso: new FormControl(new Date(), Validators.required),
      fechaFinalUso: new FormControl(new Date(), Validators.required),
      lugar: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      idServicioInteres: new FormControl('', Validators.required),
      observacionAdicional: new FormControl(''),
      idUsuarioAdministracion: new FormControl(''),
      idJefeInmediato: new FormControl('')
    });
  }

  getCatalogos() {
    this.empresasService.getAllEmpresas().subscribe(
      (empresas: Empresa[]) => this.empresas = empresas.filter( empresa => empresa.activo === 1),
      error => console.log(error)
    );
    this.clientesService.getClientes().subscribe(
      (clientes: Cliente[]) => this.clientes = clientes.filter( cliente => cliente.activo === 1),
      error => console.log(error)
    );
  }


  public onFechaInicioUso(event): void {
    this.fechaInicio = event.value;
    this.compareTwoDates();
  }

  public onFechaFinalUso(event): void {
    this.fechaFinal = event.value;
    this.compareTwoDates();
  }

  compareTwoDates(){
    const controlFechaInicio = new Date(this.solicitudForm.controls['fechaInicioUso'].value);
    const controlFechaFin = new Date(this.solicitudForm.controls['fechaFinalUso'].value);

    if( controlFechaFin < controlFechaInicio){
      this.error={isError:true,errorMessage:'Fecha inicial de solicitud no puede ser mayor a la fecha final del mismo'};
      this.solicitudForm.controls['fechaInicioUso'].setValue(new Date(this.solicitudForm.controls['fechaFinalUso'].value));
      this.fechaInicio =  new Date(this.solicitudForm.controls['fechaInicioUso'].value);
    } else {
      this.error={isError:false};
    }
  }

  crearSolicitud(){
    if (this.solicitudForm.valid){
      const format = 'yyyy/MM/dd';
      const hoy = this.pipe.transform(this.fechaHoy, format);
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicio, format);
      const nuevaFechaFin = this.pipe.transform(this.fechaFinal, format);
      
      const solicitud: SolicitudVehiculo = {
        ...this.solicitudForm.value,
        fechaInicioUso: nuevaFechaInicio,
        fechaFinalUso: nuevaFechaFin,
        fechaSolicitud: hoy,
        idUsuarioSolicito: this.idUsuarioLogeado,
        idObra: this.idObra
      };
      console.log(solicitud);
    }
  }

  useAlerts(message, action, className, time=4000) {
    this.snackBar.open(message, action, {
      duration: time,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
