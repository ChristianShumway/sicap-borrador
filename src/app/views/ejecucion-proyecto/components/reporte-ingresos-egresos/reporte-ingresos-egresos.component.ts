import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { ReporteIngresosEgresosService } from '../../../../shared/services/reporte-ingresos-egresos.service';
import { ObraService } from 'app/shared/services/obra.service';

import { Obra } from './../../../../shared/models/obra';
import { ReporteIngresosEgresos } from '../../../../shared/models/reporte-ingresos-egresos';

@Component({
  selector: 'app-reporte-ingresos-egresos',
  templateUrl: './reporte-ingresos-egresos.component.html',
  styleUrls: ['./reporte-ingresos-egresos.component.scss']
})
export class ReporteIngresosEgresosComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  idUsuarioLogeado;
  obra: Obra;
  idObra;
  fecha = new Date();
  fechaCaptura;
  pipe = new DatePipe('en-US');
  reporteForm: FormGroup;
  permisoAcceso: boolean = false;
  catalogoReferencias: any[];
  catalogoTipoMovimientos: any[];
  catalogoCategorias: any[];

  public searchElementRef: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private obraService: ObraService,
    private reporteIngresosEgresosService: ReporteIngresosEgresosService,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getObra();
    this.getValidations();
    this.fechaCaptura = new Date(this.reporteForm.controls['fecha'].value);
    this.fechaCaptura.setDate(this.fechaCaptura.getDate());
  }

  getValidations() {
    this.reporteForm = new FormGroup({
      fecha: new FormControl(new Date(), Validators.required),
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
        this.idObra = data.id;
        this.obraService.getObraObservable(this.idObra);
        this.obraObs$ = this.obraService.getDataObra();

        this.obraService.getObra(this.idObra).subscribe(
          (obra: Obra) => this.obra = obra,
          error => console.log(error)
        );
        
        this.obraService.getDataObra().subscribe(data => {
          if (data !== null) {
            this.validateAccessObra(data.supervisor);
          }
        });
        // this.getCatalogs();
      }
    })
  }

  validateAccessObra(supervisores) {
    let idSupervisores = [];
    supervisores.map(supervisor => {
      idSupervisores.push(supervisor.idUsuario);
    });
    const idExistente = idSupervisores.find(id => id === this.idUsuarioLogeado);
    if (!idExistente) {
      this.permisoAcceso = false;
    } else {
      this.permisoAcceso = true;
      this.getCatalogs();
    }
  }

  getCatalogs(){
    this.activatedRoute.params.subscribe((data: Params) => {
      if (data) {
        this.idObra = data.id;
        this.reporteIngresosEgresosService.getCatalogoReferencia().subscribe(
          referencias => this.catalogoReferencias = referencias,
          error => console.log(error)
        );
        this.reporteIngresosEgresosService.getCatalogoTipo().subscribe(
          tipos => this.catalogoTipoMovimientos = tipos,
          error => console.log(error)
        );
        // this.reporteIngresosEgresosService.getCatalogoCategoria().subscribe(
        //   categorias => this.catalogoCategorias = categorias,
        //   error => console.log(error)
        // );
      
      }
    });
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
        idObra: parseInt(this.idObra),
        fecha: nuevaFechaCaptura,
        monto: parseFloat(this.reporteForm.value.monto),
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
