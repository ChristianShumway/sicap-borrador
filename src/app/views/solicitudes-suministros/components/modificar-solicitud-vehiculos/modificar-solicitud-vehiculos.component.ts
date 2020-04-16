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
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

import { Obra } from './../../../../shared/models/obra';
import { Empresa } from '../../../../shared/models/empresa';
import { SolicitudVehiculo } from './../../.././../shared/models/solicitud';
import { Cliente } from './../../../../shared/models/cliente';

@Component({
  selector: 'app-modificar-solicitud-vehiculos',
  templateUrl: './modificar-solicitud-vehiculos.component.html',
  styleUrls: ['./modificar-solicitud-vehiculos.component.scss']
})
export class ModificarSolicitudVehiculosComponent implements OnInit {

  idUsuarioLogeado: any;
  idSolicitud: number;
  solicitud: SolicitudVehiculo;
  solicitudForm: FormGroup;

  ServiciosInteres: any[];
  fechaInicio;
  fechaFinal;
  fechaHoy = new Date();
  error:any={isError:false,errorMessage:''};
  pipe = new DatePipe('en-US');
  rutaImg: string;
  host: string;

  nombreComponente = 'solicitudes-suministros-obras';
  tooltip = 'solicitud-materiales';
  opcionesPermitidas = true;

  objServiciosInteres = [
    { id: 1, nombre: 'Arrendamiento de Vehículo Ligero' },
    { id: 2, nombre: 'Arrendamiento de Vehículo de Carga y Maquinaria' },
    { id: 3, nombre: 'Servicio de Traslado y Logística Vehicular' },
    { id: 4, nombre: 'Otros' },
  ];

  constructor(
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private empresasService: EmpresasService,
    private clientesService: ClientesService,
    private solicitudesService: SolicitudesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params: Params) => this.idSolicitud = parseInt(params.idSolicitud));
    this.getSolicitud();
  }

  getSolicitud() {
    this.solicitudesService.getSolicitudMaquinariaEquipoById(3, this.idSolicitud).subscribe(
      (solicitud: SolicitudVehiculo) => {
        console.log(solicitud);
        this.solicitud = solicitud;
        this.validateAccessValidation();
      },
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }

  validateAccessValidation() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    if(this.idUsuarioLogeado  === this.solicitud.idUsuarioSolicito) {
      this.opcionesPermitidas = true;
      this.fechaInicio = new Date(this.solicitud.fechaInicialUso);
      this.fechaFinal = new Date(this.solicitud.fechaFinalUso);
      this.fechaInicio.setDate(this.fechaInicio.getDate());
      this.fechaFinal.setDate(this.fechaFinal.getDate());
      this.getValidations();
      this.rutaImg = environment.imgRUL;
      this.host = environment.host;
      this.solicitudForm.patchValue(this.solicitud);

    } else {
      this.opcionesPermitidas = false;
    }

  }


  getValidations(){
    this.solicitudForm = new FormGroup({
      telefonoContacto: new FormControl('', Validators.required),
      correoElectronico: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      fechaInicialUso: new FormControl(this.fechaInicio, Validators.required),
      fechaFinalUso: new FormControl(this.fechaFinal, Validators.required),
      lugar: new FormControl('', Validators.required),
      descripcion: new FormControl(''),
      idServicioInteres: new FormControl('', Validators.required),
      observacion: new FormControl(''),
    });
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
    const controlFechaInicio = new Date(this.solicitudForm.controls['fechaInicialUso'].value);
    const controlFechaFin = new Date(this.solicitudForm.controls['fechaFinalUso'].value);

    if( controlFechaFin < controlFechaInicio){
      this.error={isError:true,errorMessage:'Fecha inicial de solicitud no puede ser mayor a la fecha final del mismo'};
      this.solicitudForm.controls['fechaInicialUso'].setValue(new Date(this.solicitudForm.controls['fechaFinalUso'].value));
      this.fechaInicio =  new Date(this.solicitudForm.controls['fechaInicialUso'].value);
    } else {
      this.error={isError:false};
    }
  }

  modificarSolicitud(){
    if (this.solicitudForm.valid){
      const format = 'yyyy/MM/dd';
      const hoy = this.pipe.transform(this.fechaHoy, format);
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicio, format);
      const nuevaFechaFin = this.pipe.transform(this.fechaFinal, format);

      let tipoServicioInteres = this.objServiciosInteres.filter(servicio => servicio.id === this.solicitudForm.value.idServicioInteres);
      
      const solicitud: SolicitudVehiculo = {
        idSolicitudMaquinariaEquipo: this.solicitud.idSolicitudMaquinariaEquipo,
        folio: this.solicitud.folio,
        idObra: this.solicitud.idObra,
        ...this.solicitudForm.value,
        // idEmpresa: this.obra.idEmpresa,
        fechaInicialUso: nuevaFechaInicio,
        fechaFinalUso: nuevaFechaFin,
        fechaSolicitud: this.solicitud.fechaSolicitud,
        fechaModificacion: hoy,
        idUsuarioSolicito: this.idUsuarioLogeado,
        idUsuarioModifico: this.idUsuarioLogeado,
        // idObra: this.idObra,
        servicioInteres: tipoServicioInteres[0],
      };
      console.log(solicitud);

      this.solicitudesService.updateSolicitudVehiculos(solicitud).subscribe(
        response => {
          if(response.estatus === '05'){
            this.router.navigate(['/solicitudes-suministros/solicitudes-realizadas']);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        },
        error => this.useAlerts(error.message, ' ', 'error-dialog')
      );
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
