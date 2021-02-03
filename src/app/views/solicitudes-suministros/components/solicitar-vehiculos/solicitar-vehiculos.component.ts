import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatButton } from '@angular/material';

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
import { Usuario } from '../../../../shared/models/usuario';
import { ListaMaquinariaEquipoService } from './../../../../shared/services/lista-maquinaria-equipo.service';

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
  rutaImg: string;
  host: string;
  observacionesAdicionales: string;
  idArchivoObra;

  peticionesSolicitadas: any[] = [];
  listaCategoriasPeticion: any[] = [];
  categoriaPeticion: number;
  tipoServicioSolicitud: string;
  comentariosSolicitud: string;

  // NUEVOS CAMPOS EXTRAORDINARIO
  noVehiculoSolicitud;
  descripcionSolicitud: string;
  claveSolicitud;
  placasSolicitud;
  cantidadSolicitud: number = 0;
  unidadSolicitud;
  precioUnitarioSolicitud;
  
  countPeticion:number = 0;
  panelOpenState: boolean = false;

  nombreComponente = 'solicitudes-suministros-obras';
  tooltip = 'solicitud-materiales';
  opcionesPermitidas = true;
  @ViewChild('save', {static: false}) submitButton: MatButton;

  objServiciosInteres = [
    { id: 1, nombre: 'Arrendamiento de Vehículo Ligero' },
    { id: 2, nombre: 'Arrendamiento de Vehículo de Carga y Maquinaria' },
    { id: 3, nombre: 'Servicio de Traslado y Logística Vehicular' },
    { id: 4, nombre: 'Otros' },
  ];

  constructor(
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private obraService: ObraService,
    private snackBar: MatSnackBar,
    private empresasService: EmpresasService,
    private clientesService: ClientesService,
    private navigationService: NavigationService,
    private usuariosService: UsuariosService,
    private solicitudesService: SolicitudesService,
    private router: Router,
    private listaMaquinariaEquipoService: ListaMaquinariaEquipoService
  ) { }

  ngOnInit() {
    // this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.activatedRoute.params.subscribe( (params: Params) => this.idObra = parseInt(params.idObra));
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
          this.rutaImg = environment.imgRUL;
          this.host = environment.host;
          this.fechaInicio = new Date(this.solicitudForm.controls['fechaInicialUso'].value);
          this.fechaFinal = new Date(this.solicitudForm.controls['fechaFinalUso'].value);
          this.fechaInicio.setDate(this.fechaInicio.getDate());
          this.fechaFinal.setDate(this.fechaFinal.getDate());
          this.getCatalogoVehiculos();
        }
      },
      error => this.useAlerts( error.message, ' ', 'success-dialog')
    );
  }

  getValidations(){
    this.solicitudForm = new FormGroup({
      telefonoContacto: new FormControl('-', Validators.required),
      correoElectronico: new FormControl('-'),
      fechaInicialUso: new FormControl(new Date(), Validators.required),
      fechaFinalUso: new FormControl(new Date(), Validators.required),
      lugar: new FormControl('-', Validators.required),
      descripcion: new FormControl(''),
      idServicioInteres: new FormControl(1),
      // observacion: new FormControl(''),
    });
  }


  getCatalogos() {
    this.empresasService.getAllEmpresas().subscribe(
      (empresas: Empresa[]) => this.empresas = empresas.filter( empresa => empresa.activo === 1),
      error => console.log(error)
    );
    this.solicitudesService.getCategoriasParaSolicitudMaquinaria().subscribe(
      (categorias: any[]) => this.listaCategoriasPeticion = categorias,
      error => this.useAlerts( error.message, ' ', 'error-dialog')
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

  getCatalogoVehiculos() {
    this.solicitudesService.getDataSolicitudVehiculos(this.idObra).subscribe(
      result => {
        console.log(result);
        this.peticionesSolicitadas = result;
        this.idArchivoObra = result[0].idArchivoObra;
        // console.log(this.idArchivoObra);
      },
      error => console.error(error)
    );
  }

  crearSolicitud(){
    if (this.solicitudForm.valid){
      this.submitButton.disabled = true;
      const format = 'yyyy/MM/dd';
      const hoy = this.pipe.transform(this.fechaHoy, format);
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicio, format);
      const nuevaFechaFin = this.pipe.transform(this.fechaFinal, format);

      // let tipoServicioInteres = this.objServiciosInteres.filter(servicio => servicio.id === this.solicitudForm.value.idServicioInteres);

      if(!this.peticionesSolicitadas.length){
        this.useAlerts('No has agregado ninguna petición a la solicitud', ' ', 'error-dialog');
        this.submitButton.disabled = false;
      } else {
        const solicitud: SolicitudVehiculo = {
          ...this.solicitudForm.value,
          // idEmpresa: this.obra.idEmpresa,
          fechaInicialUso: nuevaFechaInicio,
          fechaFinalUso: nuevaFechaFin,
          fechaSolicitud: hoy,
          fechaModificacion: hoy,
          idUsuarioSolicito: this.idUsuarioLogeado,
          idUsuarioModifico: this.idUsuarioLogeado,
          idObra: this.idObra,
          // servicioInteres: tipoServicioInteres[0],
          observacion: this.observacionesAdicionales,
          observacionesAdicionales: this.observacionesAdicionales,
          detSolicitudMaquinriaEquipo: this.peticionesSolicitadas
        };
        console.log(solicitud);
  
        this.solicitudesService.createSolicitudMaquinariaEquipo(solicitud).subscribe(
          response => {
            if(response.estatus === '05'){
              this.router.navigate(['/solicitudes-suministros/obras']);
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.submitButton.disabled = false;
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
              this.submitButton.disabled = false;
            }
          },
          error => {
            this.useAlerts(error.message, ' ', 'error-dialog');
            this.submitButton.disabled = false;
          }
        );
      }
      
    }
  }

  agregarPeticion(){
    if (!this.descripcionSolicitud){
      this.useAlerts('Ingresa la descripción del equipo extraordinario', ' ', 'error-dialog');
    } else if (!this.noVehiculoSolicitud){
      this.useAlerts('Ingresa el no. del equipo extraordinadio', ' ', 'error-dialog');
    } else if (!this.claveSolicitud){
      this.useAlerts('Ingresa la clave del equipo extraordinadio', ' ', 'error-dialog');
    } else if (!this.placasSolicitud){
      this.useAlerts('Ingresa las placas del equipo extraordinadio', ' ', 'error-dialog');
    } else if (!this.cantidadSolicitud){
      this.useAlerts('Ingresa la cantidad de equipo extraordinadio', ' ', 'error-dialog');
    } else if (!this.unidadSolicitud){
      this.useAlerts('Ingresa la unidad del equpo extraordinadio', ' ', 'error-dialog');
    } else if (!this.precioUnitarioSolicitud){
      this.useAlerts('Ingresa el precio unitario del equipo extraordinadio', ' ', 'error-dialog');
    } else {  
      // let tipoCategoria = this.listaCategoriasPeticion.filter( categoria => categoria.idCategoriaSolicitudMaquinariaEquipo === this.categoriaPeticion);
      // tipoCategoria = tipoCategoria[0];

      const peticion: any = {
        cantidad: this.cantidadSolicitud,
        clave: this.claveSolicitud,
        descripcion: this.descripcionSolicitud,
        extraordinario: 1,
        id: 0,
        idArchivoObra: this.idArchivoObra,
        importe: this.cantidadSolicitud * parseFloat(this.precioUnitarioSolicitud),
        linea: '',
        marca: '',
        modelo: '',
        noVehiculo: parseInt(this.noVehiculoSolicitud),
        placas: this.placasSolicitud,
        precioUnitario: parseFloat(this.precioUnitarioSolicitud),
        responsable: '',
        tipoVehiculo: '',
        unidad: this.unidadSolicitud
        // idDetSolicitudRecurso: this.countPeticion + 1,
        // idCategoriaSolicitudMaquinariaEquipo: this.categoriaPeticion,
        // descripcion: this.descripcionSolicitud,
        // tipoServicio: this.tipoServicioSolicitud,
        // comentario: this.comentariosSolicitud,
        // idUsuarioModifico: this.idUsuarioLogeado,
        // categoriaSolicitudMaquinariaEquipo: tipoCategoria,
        // cantidadSolicitada: this.cantidadSolicitud,
        // extraordinario: 1
      };

      console.log(peticion);

      this.listaMaquinariaEquipoService.createConceptoExtraordinario(peticion).subscribe(
        result => {
          console.log(result);
          if(result.estatus === '05'){
            this.useAlerts(result.mensaje, '', 'success-dialog');
            this.noVehiculoSolicitud = '';
            this.descripcionSolicitud = '';
            this.claveSolicitud = '';
            this.placasSolicitud = '';
            this.cantidadSolicitud = 0;
            this.unidadSolicitud = '';
            this.precioUnitarioSolicitud = '';
            this.panelOpenState = !this.panelOpenState;
            this.getCatalogoVehiculos();
          } else {
            this.useAlerts(result.mensaje, '', 'error-dialog');
          }
        },
        error => {
          console.log(error);
          this.useAlerts(error.message, '', 'success-dialog');
        }
      );
      
      // this.peticionesSolicitadas.push(peticion);
      // this.peticionesSolicitadas = [...this.peticionesSolicitadas];
      // this.countPeticion += 1;
      // this.categoriaPeticion = 0;
      // this.descripcionSolicitud = '';
      // this.tipoServicioSolicitud = '';
      // this.comentariosSolicitud = '';
      // this.cantidadSolicitud = 0;
      // this.useAlerts('Petición agregada correctamente', ' ', 'success-dialog');
      // console.log(this.peticionesSolicitadas);
    }
  }

  eliminarObservacion(index){
    this.peticionesSolicitadas.splice(index, 1);
    this.peticionesSolicitadas = [...this.peticionesSolicitadas];
    this.useAlerts('Petición eliminada correctamente', ' ', 'success-dialog');
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
