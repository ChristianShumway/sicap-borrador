import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { EvidenciaReporte } from './../../../../shared/models/evidencia-reporte';
import { ReporteConceptosEjecutadosService } from './../../../../shared/services/reporte-conceptos-ejecutados.service';
import { ReporteSubcontratoService } from '../../../../shared/services/reporte-subcontrato.service';

@Component({
  selector: 'app-conceptos-lista',
  templateUrl: './conceptos-lista.component.html',
  styleUrls: ['./conceptos-lista.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ConceptosListaComponent implements OnInit {
  @Input() public conceptos;
  @Input() public tipoReporte: string;
  @Output() montosCaptured: EventEmitter<any> = new EventEmitter();

  conceptosSeleccionados: any[] = [];
  panelOpenState = false;
  montoImporteConceptosSeleccionados: number = 0;
  montoTotal: number = 0;
  idUserLogeado;
  fechaActual = new Date();
  pipe = new DatePipe('en-US');
  countMonto: number = 0;

  rutaImg: string;
  host: string;
  rutaServe: string;
  EvidenciasObs$ : Observable<EvidenciaReporte[]>;

  listaEvidencias: EvidenciaReporte[] = [];
  conceptoEvidencias: number = 0;
  
  constructor(
    private reporteConceptosEjecutadosService: ReporteConceptosEjecutadosService,
    private autenticacionService: AutenticacionService,
    private snackBar: MatSnackBar,
    private reporteSubcontratoService: ReporteSubcontratoService,
  ) { }

  ngOnInit() {
    this.idUserLogeado = this.autenticacionService.currentUserValue;
    // console.log(this.tipoReporte);
    this.getConcepts();
  }

  getConcepts(){
    this.conceptos.map( concepto => {
      if(this.tipoReporte === 'plan-trabajo'){
        if (concepto.cantidadPlaneada > 0){
          this.conceptosSeleccionados.push(concepto);
          this.montoImporteConceptosSeleccionados =  this.montoImporteConceptosSeleccionados + concepto.importePlaneado;
        }
      } else if(this.tipoReporte === 'reporte-ejecutados'){
        if (concepto.cantidadEjecutada > 0){
          // console.log(concepto);
          this.conceptosSeleccionados.push(concepto);
          this.montoImporteConceptosSeleccionados =  this.montoImporteConceptosSeleccionados + concepto.importeEjecutado;
        }
      } else if(this.tipoReporte === 'reporte-subcontrato'){
        if (concepto.cantidadSubContrato > 0){
          this.conceptosSeleccionados.push(concepto);
          this.montoImporteConceptosSeleccionados =  this.montoImporteConceptosSeleccionados + concepto.importeSubContrato;
        }
      } else if(this.tipoReporte === 'reporte-mano-obra'){
        if (concepto.cantidadCapturada > 0){
          this.conceptosSeleccionados.push(concepto);
          // console.log(this.conceptosSeleccionados);
          this.montoImporteConceptosSeleccionados =  this.montoImporteConceptosSeleccionados + concepto.importeCapturado;
        }
      } else if(this.tipoReporte === 'reporte-materiales'){
        if (concepto.cantidadCapturada > 0){
          this.conceptosSeleccionados.push(concepto);
          // console.log(this.conceptosSeleccionados);
          this.montoImporteConceptosSeleccionados =  this.montoImporteConceptosSeleccionados + concepto.importeCapturado;
        }
      } else if(this.tipoReporte === 'reporte-maquinaria-equipo'){
        if (concepto.cantidadCapturada > 0){
          this.conceptosSeleccionados.push(concepto);
          // console.log(this.conceptosSeleccionados);
          this.montoImporteConceptosSeleccionados =  this.montoImporteConceptosSeleccionados + concepto.importeCapturado;
        }
      }
    });
    this.returnMontos();
  }

  showEvidences(idConcepto) {
    // console.log(idConcepto)
    const format = 'yyyy-MM-dd';
    const nuevaFechaInicio = this.pipe.transform(this.fechaActual, format);
    let tipoRep;
    if (this.tipoReporte === 'reporte-ejecutados'){
      tipoRep = 1;
    } else if (this.tipoReporte === 'reporte-subcontrato'){
      tipoRep = 2;
    }
    
    this.reporteConceptosEjecutadosService.getEvidenceNormal(idConcepto, this.idUserLogeado, nuevaFechaInicio, tipoRep).subscribe(
      evidences => {
        this.listaEvidencias = evidences;
        this.conceptoEvidencias = idConcepto;
        // console.log(this.listaEvidencias);
      },
      error => console.log(error)
    );
  }

  hiddenEvidences(){
    this.conceptoEvidencias = 0;
  }

  onDeleteEvidence(evidence){
    console.log(evidence);
    let servicio;
    
    if(this.tipoReporte === 'reporte-ejecutados'){
      servicio = this.reporteConceptosEjecutadosService.deleteEvidenceConcept(evidence);
    } else if(this.tipoReporte === 'reporte-subcontrato'){
      servicio = this.reporteSubcontratoService.deleteEvidenceSubcontrat(evidence);
    }

    servicio.subscribe( result => {
      this.showEvidences(this.conceptoEvidencias);
        console.log(result);
        if(result.estatus === '05'){
          this.useAlerts(result.mensaje, ' ', 'success-dialog');
        } else {
          this.useAlerts(result.mensaje, ' ', 'error-dialog');
        }
      },
      error => console.log(error)
    );
  }

  returnMontos(){
    this.countMonto += this.montoImporteConceptosSeleccionados;
    this.montosCaptured.emit(this.countMonto)
    // this.montosCaptured.emit(this.montoImporteConceptosSeleccionados);
  }

  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }


}
