import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ObraService } from '../../../../shared/services/obra.service';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { ValidacionReporteService } from '../../../../shared/services/validacion-reporte.service';

import { Obra } from './../../../../shared/models/obra';
import { ConceptoValidado } from './../../../../shared/models/concepto-validado';

import {MatSnackBar} from '@angular/material/snack-bar';
import { ObservacionValidacionConceptoComponent } from '../observacion-validacion-concepto/observacion-validacion-concepto.component';
import { MatBottomSheet } from '@angular/material';

interface Observacion {
  idConcepto: number;
  observacion: string;
}

@Component({
  selector: 'app-validacion-reporte-conceptos-ejecutados',
  templateUrl: './validacion-reporte-conceptos-ejecutados.component.html',
  styleUrls: ['./validacion-reporte-conceptos-ejecutados.component.scss']
})
export class ValidacionReporteConceptosEjecutadosComponent implements OnInit {

  idObra: number;
  obra: Obra;
  idUsuarioLogeado;
  fechaInicio;
  fechaFinal;
  fechaInicioShow;
  fechaFinalShow;
  fechaHoy = new Date();
  error:any={isError:false,errorMessage:''};
  pipe = new DatePipe('en-US');
  validacionForm: FormGroup;
  catalogo: ConceptoValidado[] = [];
  temp: ConceptoValidado[] = [];
  hayConceptos = false;
  objObservaciones: Observacion[] = [];
  montoTotalEjecutado: number = 0;
  montoTotalValidado: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private obraService: ObraService,
    private autenticacionService: AutenticacionService,
    private validacionReporteService: ValidacionReporteService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = parseInt(data.id);
      this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
      this.getObra();
      this.getValidations();
      this.compareTwoDates();
      this.setDates();
    });
  }

  getObra(){
    this.obraService.getObra(this.idObra).subscribe( 
      (obra: Obra) => this.obra = obra,
      error => console.log(error)
    );
  }

  buscarConceptosEjecutados(){
    if (this.validacionForm.valid) {
      const format = 'yyyy-MM-dd';
      this.fechaInicioShow =  this.pipe.transform(this.fechaInicio, format);
      this.fechaFinalShow = this.pipe.transform(this.fechaFinal, format);
      this.validacionReporteService.getValidationConceptExecuted(this.idObra, this.fechaInicioShow, this.fechaFinalShow).subscribe(
        (conceptos: ConceptoValidado[]) => {
          console.log(conceptos);
          if (conceptos.length > 0) {
            this.hayConceptos = true;
            this.catalogo = conceptos;
            this.temp = this.catalogo;
            this.catalogo.map( (concepto: ConceptoValidado) => {
              this.montoTotalEjecutado = this.montoTotalEjecutado + concepto.importeEjecutado;
              this.montoTotalValidado = this.montoTotalValidado + concepto.importeValidado;
            });
          } else {
            this.useAlerts('No se encontraron conceptos ejecutados en este período', ' ', 'error-dialog');
          }
        }
      );
    }
  }

  buscarNuevoPeriodo(){
    this.catalogo = [];
    this.hayConceptos = false;
    this.objObservaciones = [];
    this.useAlerts('Ahora puedes realizar una nueba busqueda', ' ', 'success-dialog');
  }

  validarConceptos(){
    const newCatalog: ConceptoValidado[] = [];

    this.catalogo.map( (concepto:ConceptoValidado) => {
      const conceptoModificado:ConceptoValidado = {
        ...concepto,
        precioUnitarioValidado: concepto.precioUnitarioEjecutado,
        importeValidado: concepto.precioUnitarioEjecutado * concepto.cantidadValidada,
        idUsuarioModifico: this.idUsuarioLogeado,
        idObra: this.idObra
      };
      newCatalog.push(conceptoModificado);
    });

    // console.log(newCatalog);
    
    if(this.objObservaciones.length > 0){
      console.log(this.objObservaciones);
      this.objObservaciones.map( observacion => {
        newCatalog.map( (concepto:ConceptoValidado) => {
          // console.log(concepto);
          if(observacion.idConcepto === concepto.idConcepto){
            concepto.observacion = observacion.observacion
          }
        })
      });
    }

    console.log(newCatalog);
    // this.validacionReporteService.saveValidation(newCatalog).subscribe(
    //   response =>  {
    //     console.log(response);
    //     if(response.estatus === '05'){
    //       this.useAlerts(response.mensaje, ' ', 'success-dialog');
    //       this.catalogo = [];
    //       this.hayConceptos = false;
    //       this.setDates();
    //     } else {
    //       this.useAlerts(response.mensaje, ' ', 'error-dialog');
    //     }
    //   },
    //   error => this.useAlerts(error.message, ' ', 'error-dialog')
    // );
  }

  addObservation(idConcepto): void {
    let sheet = this.bottomSheet.open(ObservacionValidacionConceptoComponent, {
      data: { idConcepto: idConcepto }
    });

    sheet.afterDismissed().subscribe( (data: Observacion) => {
      if(data){
        if (this.objObservaciones.length === 0){
          this.objObservaciones.push(data);
          this.useAlerts('Observación agregada', ' ', 'success-dialog');
        } else {
          this.objObservaciones.map( (observacion: Observacion) => {
            if (observacion.idConcepto === data.idConcepto){
              this.useAlerts('Ya fue agregado una observación para este concepto', ' ', 'error-dialog');
            } else {
              this.objObservaciones.push(data);
              this.useAlerts('Observación agregada', ' ', 'success-dialog');
            }
          });
        }
        console.log(this.objObservaciones);
      }
    });
  }

  getNewMontoTotal(){
    let total = 0;
    this.catalogo.map( (concepto: ConceptoValidado) => {
      let importe = concepto.precioUnitarioEjecutado * concepto.cantidadValidada;
      total = total + importe;
      this.montoTotalValidado = total;
    });
  }


  getValidations(){
    this.validacionForm = new FormGroup({
      fechaInicio: new FormControl(new Date(), Validators.required),
      fechaFinal: new FormControl(new Date(), Validators.required),
    })
  }

  public onFechaInicio(event): void {
    this.fechaInicio = event.value;
    this.compareTwoDates();
    this.buscarConceptosEjecutados();
  }

  public onFechaFinal(event): void {
    this.fechaFinal = event.value;
    this.compareTwoDates();
    this.buscarConceptosEjecutados();
  }

  compareTwoDates(){
    const controlFechaInicio = new Date(this.validacionForm.controls['fechaInicio'].value);
    const controlFechaFin = new Date(this.validacionForm.controls['fechaFinal'].value);

    if( controlFechaFin < controlFechaInicio){
      this.error={isError:true,errorMessage:'Fecha inicial del periodo de validación no puede ser mayor a la fecha final del mismo'};
      this.validacionForm.controls['fechaInicio'].setValue(new Date(this.validacionForm.controls['fechaFinal'].value));
      this.fechaInicio =  new Date(this.validacionForm.controls['fechaInicio'].value);
      const controlFechaInicio = new Date(this.validacionForm.controls['fechaInicio'].value);
      const controlFechaFin = new Date(this.validacionForm.controls['fechaFinal'].value);
    } else {
      this.error={isError:false};
    }
  }

  setDates(){
    this.fechaInicio = new Date(this.validacionForm.controls['fechaInicio'].value);
    this.fechaFinal = new Date(this.validacionForm.controls['fechaFinal'].value);
    this.fechaInicio.setDate(this.fechaInicio.getDate());
    this.fechaFinal.setDate(this.fechaFinal.getDate());
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.temp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    if(!rows.length){
      this.useAlerts('No se encontraron conceptos con esta referencia', ' ', 'error-dialog');
    }

    this.catalogo = rows;
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
