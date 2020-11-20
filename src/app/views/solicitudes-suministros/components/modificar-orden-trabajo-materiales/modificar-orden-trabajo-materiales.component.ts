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
  selector: 'app-modificar-orden-trabajo-materiales',
  templateUrl: './modificar-orden-trabajo-materiales.component.html',
  styleUrls: ['./modificar-orden-trabajo-materiales.component.scss']
})
export class ModificarOrdenTrabajoMaterialesComponent implements OnInit {

  idUsuarioLogeado: any;
  idOrdenTrabajo: number;
  ordenTrabajo: any;
  solicitudForm: FormGroup;
  listaMaterial: any[] = [];
  listaTemp: any[];
  fechaHoy = new Date();
  fechaRequiere;
  pipe = new DatePipe('en-US');
  rutaImg: string;
  host: string;

  listaUsuariosAdministracionCentral: Usuario[] = [];
  listaUsuariosJefeInmediato: Usuario[] = [];
  opcionesPermitidas = true;
  @ViewChild('save', {static: false}) submitButton: MatButton;

  constructor(
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private solicitudesService: SolicitudesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params: Params) => this.idOrdenTrabajo = parseInt(params.idOrdenTrabajo));
    this.getSolicitud();
  }

  getSolicitud() {
    this.solicitudesService.getOrdenTrabajoById(2, this.idOrdenTrabajo).subscribe(
      (ordenTrabajo: any) => {
        console.log(ordenTrabajo);
        this.ordenTrabajo = ordenTrabajo;
        this.validateAccessValidation();
      },
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }
  
  validateAccessValidation() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.opcionesPermitidas = true;
    this.fechaRequiere = new Date(this.ordenTrabajo.fechaRequiere);
    this.fechaRequiere.setDate(this.fechaRequiere.getDate());
    this.getValidations();
    this.getCatalogos();
    this.solicitudForm.patchValue(this.ordenTrabajo);
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;

    console.log( this.ordenTrabajo.detOrdentrabajoMaterial)
    this.listaMaterial = this.ordenTrabajo.detOrdentrabajoMaterial;
    this.listaTemp = this.listaMaterial;
   

  }
  
  getValidations(){
    this.solicitudForm = new FormGroup({
      fechaRequiere: new FormControl(this.fechaRequiere, Validators.required),
      lugarRecepcion: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
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
    // this.usuariosService.getUsuariosByIdProfile(2).subscribe(
    //   ( usuarios: Usuario[]) => this.listaUsuariosAdministracionCentral = usuarios,
    //   error => console.log(error)
    //  );
    //  this.usuariosService.getUsuariosByIdProfile(1).subscribe(
    //    ( usuarios: Usuario[]) => this.listaUsuariosJefeInmediato = usuarios,
    //    error => console.log(error)
    //   );
  }

  modificarOrden(){
    const detOrdenTrabajoMateriales: any[] = [];
    const format = 'yyyy/MM/dd';
    const hoy = this.pipe.transform(this.fechaHoy, format);
    this.submitButton.disabled = true;
    
    this.listaMaterial.map( (material: any) => {
      const materialOrden = {
        ...material,
        proveedor: material.proveedor,
        precioUnitario: parseFloat(material.precioUnitario),
        importe: parseFloat(material.importe),
        idUsuarioModifico: this.idUsuarioLogeado,
        fechaModifico: hoy,
      }
      
      detOrdenTrabajoMateriales.push(materialOrden);
    });

    //console.log(detOrdenTrabajoMateriales);

    const ordenTrabajo  = {
      idOrdenTrabajoMaterial: this.ordenTrabajo.idOrdenTrabajoMaterial,
      idSolicitudMaterial: this.ordenTrabajo.idSolicitudMaterial,
      folio: this.ordenTrabajo.folio,
      idUsuarioModifico: this.idUsuarioLogeado,
      idSolicitud: this.ordenTrabajo.idSolicitudMaterial,
      detOrdentrabajoMaterial: detOrdenTrabajoMateriales,
      observacion: this.ordenTrabajo.observacion
    }

    console.log(ordenTrabajo);

    this.solicitudesService.updateOrdenTrabajoMateriales(ordenTrabajo).subscribe(
      response => {
        if(response.estatus === '05'){
          this.router.navigate(['/solicitudes-suministros/solicitudes-realizadas']);
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
