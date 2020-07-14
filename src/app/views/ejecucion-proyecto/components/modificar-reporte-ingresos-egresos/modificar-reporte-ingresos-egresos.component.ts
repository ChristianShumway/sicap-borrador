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
import { ReporteIngresosEgresosService } from './../../../../shared/services/reporte-ingresos-egresos.service';

import { Usuario } from '../../../../shared/models/usuario';
import { Obra } from './../../../../shared/models/obra';
import { ReporteIngresosEgresos } from '../../../../shared/models/reporte-ingresos-egresos';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-modificar-reporte-ingresos-egresos',
  templateUrl: './modificar-reporte-ingresos-egresos.component.html',
  styleUrls: ['./modificar-reporte-ingresos-egresos.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ModificarReporteIngresosEgresosComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  idUsuarioLogeado;
  obra: Obra;
  idObra;
  idReporte;
  reporteModif: ReporteIngresosEgresos[];
  fecha = new Date();
  fechaCaptura;
  pipe = new DatePipe('en-US');
  reporteForm: FormGroup;
  catalogoReferencias: any[];
  catalogoTipoMovimientos: any[];
  catalogoCategorias: any[];
  reporte;

  nombreComponente = 'reporte-ingresos-egresos';
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
    private reporteIngresosEgresosService: ReporteIngresosEgresosService,
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
      fecha: new FormControl(this.fechaCaptura, Validators.required),
      descripcion: new FormControl('', Validators.required),
      idReferencia: new FormControl('', Validators.required),
      monto: new FormControl('', Validators.required),
      idTipoMovimientoMonetario: new FormControl('', Validators.required),
      idCategoriaMovimientoMonetario: new FormControl('', Validators.required),
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

        this.obraService.getObra(this.idObra).subscribe(
          (obra: Obra) => this.obra = obra,
          error => console.log(error)
        );
        
        this.obraService.getDataObra().subscribe(data => {
          if (data !== null) {
            this.validateAccessObra();
          }
        });

        this.getReport();
    
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

  getReport(){
    this.reporteIngresosEgresosService.getReportsByObra(this.idObra).subscribe(
      (reportes: ReporteIngresosEgresos[]) => {
        // console.log(reportes);
        const reporteModif = reportes.filter( (reporte: ReporteIngresosEgresos) => reporte.idMovimientoMonetario == this.idReporte);
        console.log(reporteModif);
        reporteModif.map( (reporte: ReporteIngresosEgresos) => {
          let fechaCapturaString = reporte.fecha;
          this.fechaCaptura = new Date(fechaCapturaString);
          this.fechaCaptura.setDate(this.fechaCaptura.getDate()+1);
          this.reporteForm.patchValue(reporte);
          console.log(reporte);
          this.reporte = reporte;
          this.getCatalogs();
        });
      }
    );
  }

  getCatalogs(){ 
    this.reporteIngresosEgresosService.getCatalogoReferencia().subscribe(
      referencias => this.catalogoReferencias = referencias,
      error => console.log(error)
    );
    this.reporteIngresosEgresosService.getCatalogoTipo().subscribe(
      tipos => this.catalogoTipoMovimientos = tipos,
      error => console.log(error)
    );
    this.reporteIngresosEgresosService.getCatalogoCategoria(this.reporte.idTipoMovimientoMonetario).subscribe(
      categorias => this.catalogoCategorias = categorias,
      error => console.log(error)
    );       
  }

  getCategories(idTipoMovimiento) {
    console.log(idTipoMovimiento);
    this.reporteIngresosEgresosService.getCatalogoCategoria(idTipoMovimiento).subscribe(
      categorias => this.catalogoCategorias = categorias,
      error => console.log(error)
    );
  }

  reportarAvance() {
    if (this.reporteForm.valid) {
      const format = 'yyyy/MM/dd';
      const nuevaFechaCaptura = this.pipe.transform(this.fechaCaptura, format);

      const reporte: ReporteIngresosEgresos = {
        ...this.reporteForm.value,
        idMovimientoMonetario: parseInt(this.idReporte),
        fecha: nuevaFechaCaptura,
        idObra: parseInt(this.idObra),
        idUsuarioModifico: this.idUsuarioLogeado,
      };
      
      console.log(reporte);

      this.reporteIngresosEgresosService.addReport(reporte).subscribe(
        response => {
          if(response.estatus === '05'){
            this.router.navigate(['/ejecucion-proyecto/proyectos/reporte-ingresos-egresos']);
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
