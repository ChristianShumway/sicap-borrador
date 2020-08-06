import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { environment } from './../../../../../environments/environment';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { SolicitudesService } from './../../../../shared/services/solicitudes.service';

import { SolicitudMaterial, MaterialParaSolicitud } from './../../.././../shared/models/solicitud';
import { Usuario } from '../../../../shared/models/usuario';

@Component({
  selector: 'app-generar-orden-pago-materiales',
  templateUrl: './generar-orden-pago-materiales.component.html',
  styleUrls: ['./generar-orden-pago-materiales.component.scss']
})
export class GenerarOrdenPagoMaterialesComponent implements OnInit {

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

  listaUsuariosAdministracionCentral: Usuario[] = [];
  listaUsuariosJefeInmediato: Usuario[] = [];
  opcionesPermitidas = true;

  constructor(
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private solicitudesService: SolicitudesService,
    private router: Router
  ) { }

  ngOnInit() {
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
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.opcionesPermitidas = true;
    this.fechaRequiere = new Date(this.solicitud.fechaRequiere);
    this.fechaRequiere.setDate(this.fechaRequiere.getDate());
    this.getValidations();
    this.getCatalogos();
    this.solicitudForm.patchValue(this.solicitud);
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
    
    this.solicitud.detSolicitudMaterial.map( material => {
      if (material.cantidadSolictada > 0) {
        const materialModificado = {
          ...material,
          proveedor: '',
          precio: 0,
          importe: 0
        };

        this.listaMaterial.push(materialModificado);
        console.log(this.listaMaterial);
      }
    });
    
    this.listaTemp = this.listaMaterial;
    // this.listaMaterial = this.solicitud.detSolicitudMaterial;
   

  }
  
  getValidations(){
    this.solicitudForm = new FormGroup({
      // fechaRequiere: new FormControl(this.fechaRequiere, Validators.required),
      // lugarRecepcion: new FormControl('', Validators.required),
      // descripcion: new FormControl('', Validators.required),
      observacion: new FormControl(''),
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

  public onFechaRequiereMaterial(event): void {
    this.fechaRequiere = event.value;
  }

  generarOrden(){
    const detOrdenTrabajoMateriales: any[] = [];
    const format = 'yyyy/MM/dd';
    const hoy = this.pipe.transform(this.fechaHoy, format);
    
    this.listaMaterial.map( (material: any) => {
      const materialOrden = {
        idDetOrdenTrabajoMaterial: 0,
        idOrdenTrabajoMaterial: 0,
        idMaterial: material.idMaterial,
        idObra: material.idObra,
        descripcion: material.descripcion,
        unidad: material.unidad,
        precioUnitarioMaterial: 0,
        proveedor: material.proveedor,
        cantidad: material.cantidadSolictada,
        precioUnitario: parseFloat(material.precio),
        importe: parseFloat(material.importe),
        idUsuarioModifico: this.idUsuarioLogeado,
        fechaModifico: hoy,
      }
      
      detOrdenTrabajoMateriales.push(materialOrden);
    });
    // console.log(detOrdenTrabajoMateriales);

    const ordenTrabajo  = {
      ...this.solicitudForm.value,
      idSolicitudMaterial: this.solicitud.idSolicitudMaterial,
      idUsuarioModifico: this.idUsuarioLogeado,
      idSolicitud: this.solicitud.idSolicitudMaterial,
      detOrdentrabajoMaterial: detOrdenTrabajoMateriales
    }

    console.log(ordenTrabajo);

    this.solicitudesService.createOrdenTrabajoMateriales(ordenTrabajo).subscribe(
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
