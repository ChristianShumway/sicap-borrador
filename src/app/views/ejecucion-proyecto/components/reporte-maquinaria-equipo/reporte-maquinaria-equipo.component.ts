import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { ReporteMaquinariaEquipoService } from '../../../../shared/services/reporte-maquinaria-equipo.service';
import { ObraService } from 'app/shared/services/obra.service';

import { Obra } from './../../../../shared/models/obra';
import { ConceptoMaquinariaEquipo } from '../../../../shared/models/concepto-maquinaria-equipo';
import { ReporteMaquinariaEquipo } from '../../../../shared/models/reporte-maquinaria-equipo';

@Component({
  selector: 'app-reporte-maquinaria-equipo',
  templateUrl: './reporte-maquinaria-equipo.component.html',
  styleUrls: ['./reporte-maquinaria-equipo.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ReporteMaquinariaEquipoComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  idUsuarioLogeado;
  obra: Obra;
  idObra;
  catalogo: ConceptoMaquinariaEquipo[] = [];
  temp: ConceptoMaquinariaEquipo[] = [];
  fecha = new Date();
  fechaCaptura;
  pipe = new DatePipe('en-US');
  reporteForm: FormGroup;
  permisoAcceso: boolean = false;

  public searchElementRef: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private obraService: ObraService,
    private reporteMaquinariaEquipoService: ReporteMaquinariaEquipoService,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getObra();
    this.getValidations();
    this.fechaCaptura = new Date(this.reporteForm.controls['fechaCaptura'].value);
    this.fechaCaptura.setDate(this.fechaCaptura.getDate());
  }

  getValidations() {
    this.reporteForm = new FormGroup({
      observacion: new FormControl('', Validators.required),
      fechaCaptura: new FormControl(new Date(), Validators.required),
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
        // this.getConcepts();
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
      this.getConcepts();
    }
  }

  getConcepts(){
    this.activatedRoute.params.subscribe((data: Params) => {
      if (data) {
        this.idObra = data.id;
        this.reporteMaquinariaEquipoService.getCatalogByReport(this.idObra).subscribe(
          (catalog: ConceptoMaquinariaEquipo[]) => {
            this.catalogo = catalog;
            this.temp = catalog;
            console.log(this.catalogo);
          },
          error => console.log(error)
        )
      }
    });
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
      this.useAlerts('No se encontraron vehículos con esta referencia', ' ', 'error-dialog');
    } else {
      this.useAlerts(`Fueron encontrados ${rows.length} vehículos con esta referencia`, ' ', 'success-dialog');
    }

    this.catalogo = rows;
  }

  reportarAvance() {
    if (this.reporteForm.valid) {
      const format = 'yyyy/MM/dd';
      const nuevaFechaCaptura = this.pipe.transform(this.fechaCaptura, format);
      const newCatalog: ConceptoMaquinariaEquipo[] = []
  
      this.catalogo.map( (concepto: ConceptoMaquinariaEquipo) => {
        if(concepto.cantidadCapturada > 0){
          const conceptoModificado: ConceptoMaquinariaEquipo = {
            ...concepto,
            precioUnitarioCapturado: concepto.precioUnitario,
            importeCapturado: concepto.precioUnitario * concepto.cantidadCapturada,
            idUsuarioModifico: this.idUsuarioLogeado
          };

          newCatalog.push(conceptoModificado);
        }
      });

      const reporte: ReporteMaquinariaEquipo = {
        ...this.reporteForm.value,
        fechaCaptura: nuevaFechaCaptura,
        idObra: parseInt(this.idObra),
        idUsuarioModifico: this.idUsuarioLogeado,
        detMaquinariaEquipo: newCatalog,
      };
      console.log(reporte);

      this.reporteMaquinariaEquipoService.addReport(reporte).subscribe(
        response => {
          if(response.estatus === '05'){
            this.router.navigate(['/ejecucion-proyecto/proyectos/reporte-maquinaria-equipo']);
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
