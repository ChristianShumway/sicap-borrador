import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { ObraService } from 'app/shared/services/obra.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { ReporteMaterialService } from './../../../../shared/services/reporte-material.service';

import { Usuario } from '../../../../shared/models/usuario';
import { Obra } from './../../../../shared/models/obra';
import { ConceptoMaterial } from './../../../../shared/models/concepto-material';
import { ReporteMaterial } from '../../../../shared/models/reporte-material';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-modificar-reporte-materiales',
  templateUrl: './modificar-reporte-materiales.component.html',
  styleUrls: ['./modificar-reporte-materiales.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ModificarReporteMaterialesComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  idUsuarioLogeado;
  idObra;
  idReporte;
  reporteModif: ReporteMaterial[];
  catalogo: ConceptoMaterial[] = [];
  temp: ConceptoMaterial[] = [];
  fecha = new Date();
  fechaCaptura;
  pipe = new DatePipe('en-US');
  reporteForm: FormGroup;

  nombreComponente = 'reporte-materiales';
  tooltip = 'modificar-reporte';
  permisosEspeciales: any[] = []; //array de objetos que contiene todos los permisos especiales del proyecto
  permisosEspecialesComponente: any[] = []; //array en el que se agregan los objetos que contiene el nombre del componente
  permisosEspecialesPermitidos: any[] = []; //array donde se agrega el nombre de las opciones a las cuales el usuario si tiene permiso
  opcionesPermitidas = true;

  public searchElementRef: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private obraService: ObraService,
    private reporteMaterialService: ReporteMaterialService,
    private snackBar: MatSnackBar,
    private navigationService: NavigationService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getObra();
    this.getValidations();
  }

  getValidations() {
    this.reporteForm = new FormGroup({
      observacion: new FormControl('', Validators.required),
      fechaCaptura: new FormControl(this.fechaCaptura, Validators.required),
    })
  }

  public onFechaInicio(event): void {
    this.fechaCaptura = event.value;
  }

  getObra() {
    this.activatedRoute.params.subscribe((data: Params) => {
      if (data) {
        console.log(data);
        this.idObra = data.idObra;
        this.idReporte = data.idReporte;
       
        this.obraService.getObraObservable(this.idObra);
        this.obraObs$ = this.obraService.getDataObra();
        
        this.obraService.getDataObra().subscribe(data => {
          if (data !== null) {
            this.validateAccessObra();
          }
        });

        this.getCatalogById();
    
      }
    });
  }

  validateAccessObra() {
    const moduloActual = environment.permisosEspeciales.find( modulo => modulo.component === this.nombreComponente && modulo.tooltip === this.tooltip);
    const idModulo = moduloActual.idOpcion;

    this.usuariosService.getUsuario(this.idUsuarioLogeado).subscribe(
      (usuario: Usuario) => {
        this.navigationService.validatePermissions(usuario.idPerfil, idModulo).subscribe(
          (result:any) => result.estatus !== '05' ? this.opcionesPermitidas = false : this.opcionesPermitidas = true,
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }

  getCatalogById(){
    this.reporteMaterialService.getReportsByObra(this.idObra).subscribe(
      (reportes: ReporteMaterial[]) => {
        // console.log(reportes);
        const reporteModif = reportes.filter( (reporte: ReporteMaterial) => reporte.idCapturaMaterial == this.idReporte);
        console.log(reporteModif);
        reporteModif.map( (reporte: ReporteMaterial) => {
          let fechaCapturaString = reporte.fechaCaptura;
          this.fechaCaptura = new Date(fechaCapturaString);
          this.fechaCaptura.setDate(this.fechaCaptura.getDate()+1);
          this.reporteForm.patchValue(reporte);
          // console.log(reporte);
          this.catalogo = reporte.detMaterial;
          this.temp = this.catalogo;
        });
        console.log(this.catalogo);
      }
    );
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.temp.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    if(!rows.length){
      this.useAlerts('No se encontraron materiales con esta referencia', ' ', 'error-dialog');
    } else {
      this.useAlerts(`Fueron encontrados ${rows.length} materiales con esta referencia`, ' ', 'success-dialog');
    }

    this.catalogo = rows;
  }

  reportarAvance() {
    if (this.reporteForm.valid) {
      const format = 'yyyy/MM/dd';
      const nuevaFechaCaptura = this.pipe.transform(this.fechaCaptura, format);
      const newCatalog: ConceptoMaterial[] = []
  
      this.catalogo.map( (concepto: ConceptoMaterial) => {
        // if(concepto.cantidadCapturada > 0 || concepto.idConceptoPlanTrabajo !== 0){
        if(concepto.cantidadCapturada > 0){
          const conceptoModificado = {
            ...concepto,
            precioUnitarioCapturado: concepto.precioUnitario,
            importeCapturado: concepto.precioUnitario * concepto.cantidadCapturada,
            idUsuarioModifico: this.idUsuarioLogeado
          };

          newCatalog.push(conceptoModificado);
        }

      });

      const reporte: ReporteMaterial = {
        ...this.reporteForm.value,
        idCapturaMaterial: parseInt(this.idReporte),
        fechaCaptura: nuevaFechaCaptura,
        idObra: parseInt(this.idObra),
        idUsuarioModifico: this.idUsuarioLogeado,
        detMaterial: newCatalog,
      };
      
      console.log(reporte);

      this.reporteMaterialService.addReport(reporte).subscribe(
        response => {
          if(response.estatus === '05'){
            this.router.navigate(['/ejecucion-proyecto/proyectos/reporte-materiales']);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        },
        error => this.useAlerts(error.message, ' ', 'error-dialog')
      );
    }
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
