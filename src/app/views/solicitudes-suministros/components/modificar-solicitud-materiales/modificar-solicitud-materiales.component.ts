import { Component, OnInit, ViewChild } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatButton } from '@angular/material';

import { environment } from './../../../../../environments/environment';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { SolicitudesService } from './../../../../shared/services/solicitudes.service';

import { SolicitudMaterial, MaterialParaSolicitud } from './../../.././../shared/models/solicitud';
import { Usuario } from '../../../../shared/models/usuario';

@Component({
  selector: 'app-modificar-solicitud-materiales',
  templateUrl: './modificar-solicitud-materiales.component.html',
  styleUrls: ['./modificar-solicitud-materiales.component.scss']
})
export class ModificarSolicitudMaterialesComponent implements OnInit {

  idUsuarioLogeado: any;
  idSolicitud: number;
  solicitud: SolicitudMaterial;
  solicitudForm: FormGroup;
  listaMaterial: MaterialParaSolicitud[] = [];
  listaTemp: MaterialParaSolicitud[];
  fechaHoy = new Date();
  fechaRequiere;
  pipe = new DatePipe('en-US');
  rutaImg: string;
  host: string;
  observacionesAdicionales: string;
  categoriasParaMateriales: any;

  listaUsuariosAdministracionCentral: Usuario[] = [];
  listaUsuariosJefeInmediato: Usuario[] = [];
  opcionesPermitidas = true;

  descripcionMaterial: string;
  unidadMaterial: string;
  cantidadMaterial: number = 0;
  comentarioMaterial: string;
  familiaMaterial: string;
  idCategoriaMaterial: number = 0;
  panelOpenState: boolean = false;
  @ViewChild('save', {static: false}) submitButton: MatButton;

  constructor(
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private solicitudesService: SolicitudesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.activatedRoute.params.subscribe( (params: Params) => this.idSolicitud = parseInt(params.idSolicitud));
    this.getSolicitud();
  }

  getSolicitud() {
    this.solicitudesService.getSolicitudMaterialesById(2, this.idSolicitud).subscribe(
      (solicitud: SolicitudMaterial) => {
        console.log(solicitud);
        this.solicitud = solicitud;
        this.validateAccessValidation();
      },
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }
  
  validateAccessValidation() {
    if(this.idUsuarioLogeado  === this.solicitud.idUsuarioSolicito) {
      this.opcionesPermitidas = true;
      this.fechaRequiere = new Date(this.solicitud.fechaRequiere);
      this.fechaRequiere.setDate(this.fechaRequiere.getDate());
      this.getValidations();
      this.getCatalogos();
      this.solicitudForm.patchValue(this.solicitud);
      this.rutaImg = environment.imgRUL;
      this.host = environment.host;
      this.listaMaterial = this.solicitud.detSolicitudMaterial;
      this.listaTemp = this.listaMaterial;
      this.observacionesAdicionales = this.solicitud.observacionesAdicionales;

      // this.fechaInicioObra = new Date(inicioString);
      // this.fechaInicioObra.setDate(this.fechaInicioObra.getDate()+1);
    } else {
      this.opcionesPermitidas = false;
    }

  }
  
  getValidations(){
    this.solicitudForm = new FormGroup({
      fechaRequiere: new FormControl(this.fechaRequiere, Validators.required),
      lugarRecepcion: new FormControl(''),
    });
  }
  
  getCatalogos() {
    // this.solicitudesService.getListMaterialForResource(this.solicitud.idObra).subscribe(
    //   (materiales: MaterialParaSolicitud[]) => {
    //     this.listaMaterial = materiales;
    //     this.listaTemp = this.listaMaterial;
    //   },
    //   error => {
    //     console.log(error);
    //     error => this.useAlerts( error.message, ' ', 'error-dialog');
    //   }
    // );
    this.solicitudesService.getCategoriasParaSolicitudMateriales().subscribe(
      categorias => this.categoriasParaMateriales = categorias,
      error=> console.log(error)
    );
  }

  public onFechaRequiereMaterial(event): void {
    this.fechaRequiere = event.value;
  }

  agregarMaterialExtra(){
    if(!this.descripcionMaterial){
      this.useAlerts('Ingresa la descripción del material a agregar', ' ', 'error-dialog');
    } else if (!this.unidadMaterial){
      this.useAlerts('Ingresa la unidad del material a agregar', ' ', 'error-dialog');
    } else if (!this.familiaMaterial){
      this.useAlerts('Ingresa la familia del material a agregar', ' ', 'error-dialog');
    } else if (this.idCategoriaMaterial === 0){
      this.useAlerts('Selecciona la categoria del material a agregar', ' ', 'error-dialog');
    } else if (!this.cantidadMaterial){
      this.useAlerts('Ingresa la cantidad del material a agregar', ' ', 'error-dialog');
    } else {
      let ultimoIdMaterial;
      this.listaMaterial.map( (material: MaterialParaSolicitud) => {
        ultimoIdMaterial = Math.max(material.idMaterial);
      });

      const materialExtra =  {
        idMaterial: ultimoIdMaterial + 1,
        noMaterial: 99999,
        descripcion: this.descripcionMaterial,
        unidad: this.unidadMaterial,
        cantidad: this.cantidadMaterial,
        precioUnitario: 0,
        importe: 0,
        tipo: 3,
        idObra: this.solicitud.idObra,
        idSolicitud: this.solicitud.idSolicitudMaterial,
        comentario: this.comentarioMaterial,
        descripcionSolicitud: '',
        idUsuarioModifico: this.idUsuarioLogeado,
        familia: this.familiaMaterial,
        idCategoriaSolicitudMaterial: this.idCategoriaMaterial,
      };

      console.log(materialExtra);

      this.solicitudesService.addAdditionalMaterial(materialExtra).subscribe(
        response => {
          if(response.estatus === '05'){
            console.log(response);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.getSolicitud();
            this.descripcionMaterial = '';
            this.unidadMaterial = '';
            this.cantidadMaterial = 0;
            this.comentarioMaterial = '';
            this.familiaMaterial = '';
            this.idCategoriaMaterial = 0;
            this.panelOpenState = !this.panelOpenState;
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }  
        },
        error => console.log(error)
      );
    }
  }

  modificarSolicitud(){
    if (this.solicitudForm.valid){
      this.submitButton.disabled = true;
      const format = 'yyyy/MM/dd';
      const hoy = this.pipe.transform(this.fechaHoy, format);
      const fechaRequiereMaterial = this.pipe.transform(this.fechaRequiere, format);
      let materialSolicitado: MaterialParaSolicitud[] = [];
      
      this.listaMaterial.map( (material: MaterialParaSolicitud) => {
        if(material.cantidadSolictada > 0) {
          materialSolicitado.push(material);
        }
      });

      console.log(materialSolicitado);
      
      const solicitud: SolicitudMaterial = {
        idSolicitudMaterial: this.solicitud.idSolicitudMaterial,
        idEmpresa: this.solicitud.idEmpresa,
        idObra: this.solicitud.idObra,
        ...this.solicitudForm.value,
        fechaSolicito: this.solicitud.fechaSolicito,
        fechaRequiere: fechaRequiereMaterial,
        idUsuarioSolicito: this.idUsuarioLogeado,
        idUsuarioModifico: this.idUsuarioLogeado,
        // detSolicitudMaterial: materialSolicitado
        detSolicitudMaterial: this.listaMaterial,
        observacionesAdicionales: this.observacionesAdicionales
      };

      console.log(solicitud); 
      
      this.solicitudesService.updateSolicitudMateriales(solicitud).subscribe(
        response => {
          if(response.estatus === '05'){
            this.router.navigate(['/solicitudes-suministros/seguimiento-solicitudes']);
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.listaTemp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.listaTemp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    if(!rows.length){
      this.useAlerts('No se encontraron conceptos con esta referencia', ' ', 'error-dialog', 500);
    } else {
      this.useAlerts(`Fueron encontrados ${rows.length} conceptos con esta referencia`, ' ', 'success-dialog', 500);
    }

    this.listaMaterial = rows;
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
