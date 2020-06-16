import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { ObraService } from '../../../../shared/services/obra.service';
import { ReportesEstadisticasService } from '../../../../shared/services/reportes-estadisticas.service';

import { Obra } from './../../../../shared/models/obra';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-reporte-avance-semanal',
  templateUrl: './reporte-avance-semanal.component.html',
  styleUrls: ['./reporte-avance-semanal.component.scss']
})
export class ReporteAvanceSemanalComponent implements OnInit {

  idObra;
  idUsuarioLogeado;
  obra: Obra
  fecha = new Date();
  fechaInicio;
  fechaFinal;
  rutaSicap: string;
  host: string;
  error:any={isError:false,errorMessage:''};
  pipe = new DatePipe('en-US');
  reporteForm: FormGroup;
  dataSemanas: any[];
  dataAlcanceGral: any;
  dataCostoGral: any;
  programadoAvanceFisico:any[] = [];
  ejecutadoAvanceFisico:any[] = [];
  validadoAvanceFisico:any[] = [];
  programadoCostoObra:any[] = [];
  realCostoObra:any[] = [];
  periodos:any[] = [];
  ver = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    private obraService: ObraService,
    private reportesEstadisticasService: ReportesEstadisticasService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getObra();
    this.getValidations();
    // this.compareTwoDates();
  }

  getObra() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = parseInt(data.idObra);
      console.log(this.idObra);
      this.obraService.getObra(this.idObra).subscribe(
        (obra:Obra) => {
          console.log(obra);
          this.obra = obra;
          let inicioString = obra.fechaInicio;
          this.fechaInicio = new Date(inicioString);
          this.fechaInicio.setDate(this.fechaInicio.getDate()+1);
          this.fechaFinal = new Date();
          this.fechaFinal.setDate(this.fechaFinal.getDate());
          this.reporteForm.patchValue(obra);
          this.rutaSicap = environment.imgRUL;
          this.host = environment.host;
        },
        error => console.log(error)
      );
    })
  }

  getValidations() {
    this.reporteForm = new FormGroup({
      fechaInicio: new FormControl(this.fechaInicio, Validators.required),
      fechaFinal: new FormControl(new Date(), Validators.required),
    })
  }

  public onFechaInicio(event): void {
    this.fechaInicio = event.value;
    this.compareTwoDates();
  }

  public onFechaFinal(event): void {
    this.fechaFinal = event.value;
    this.compareTwoDates();
  }

  compareTwoDates(){
    const controlFechaInicio = new Date(this.reporteForm.controls['fechaInicio'].value);
    const controlFechaFin = new Date(this.reporteForm.controls['fechaFinal'].value);

    if( controlFechaFin < controlFechaInicio){
      this.error={isError:true,errorMessage:'Fecha inicial de busqueda no puede ser mayor a la fecha final'};
      this.reporteForm.controls['fechaInicio'].setValue(new Date(this.reporteForm.controls['fechaFinal'].value));
      this.fechaInicio =  new Date(this.reporteForm.controls['fechaInicio'].value);
      const controlFechaInicio = new Date(this.reporteForm.controls['fechaInicio'].value);
      const controlFechaFin = new Date(this.reporteForm.controls['fechaFinal'].value);
    } else {
      this.error={isError:false};
    }
  }

  buscarDatos(){
    if (this.reporteForm.valid){
      this.ver = true;
      const format = 'yyyy-MM-dd';
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicio, format);
      const nuevaFechaFin = this.pipe.transform(this.fechaFinal, format);

      this.reportesEstadisticasService.getControlAvanceSemanal(this.idObra, nuevaFechaInicio, nuevaFechaFin).subscribe(
        result => {
          const semanas = [];
          let dataPresupuestoObra;
          let dataPresupuestoMateriales;
          let dataPresupuestoManoObra;
          let dataPresupuestoSubcontratos;
          let dataPresupuestoMaquinariaEquipo;
          let dataPresupuestoSobreCosto;
          let newPresupuestoSemana;
          console.log(result);

          this.dataAlcanceGral = {
            avanceProgramado: result.avanceProgramado,
            avanceEjecutado: result.avanceEjecutado,
            diferenciaAlcance: result.diferenciaAlcance
          };

          this.dataCostoGral = {
            presupuestoProgramado: result.presupuestoProgramado,
            costoReal: result.costoReal,
            diferenciaCosto: result.diferenciaCosto
          };
          
          Object.keys(result.detalle).forEach ( noSemana => {
            var datosSemana = result.detalle[noSemana];
            // console.log(noSemana);
            // console.log(datosSemana);
            this.periodos.push(datosSemana.periodo);
            datosSemana.programacion.map( presupuesto => {
              if(presupuesto.tipoPresupuesto.idTipoPresupuesto === 1){
                dataPresupuestoObra = {
                  programadoObra: presupuesto.programado*100,
                  ejecutadoObra: presupuesto.ejecutado*100,
                  totalValidadoObra: presupuesto.validado*100,
                  totalProgramadoObra: presupuesto.acumuladoProgramado,
                  totalRealObra: presupuesto.totalReal,
                }
                this.programadoAvanceFisico.push(presupuesto.programado*100);
                this.ejecutadoAvanceFisico.push(presupuesto.ejecutado*100);
                this.validadoAvanceFisico.push(presupuesto.validado*100);
                this.programadoCostoObra.push(presupuesto.acumuladoProgramado);
                this.realCostoObra.push(presupuesto.totalReal);
              }
              if(presupuesto.tipoPresupuesto.idTipoPresupuesto === 2){
                dataPresupuestoMateriales = {
                  programadoMateriales: presupuesto.programado*100,
                  ejecutadoMateriales: presupuesto.ejecutado*100,
                  totalProgramadoMateriales: presupuesto.acumuladoProgramado,
                  totalRealMateriales: presupuesto.totalReal
                }
              }
              if(presupuesto.tipoPresupuesto.idTipoPresupuesto === 3){
                dataPresupuestoManoObra = {
                  programadoManoObra: presupuesto.programado*100,
                  ejecutadoManoObra: presupuesto.ejecutado*100,
                  totalProgramadoManoObra: presupuesto.acumuladoProgramado,
                  totalRealManoObra: presupuesto.totalReal
                }
              }
              if(presupuesto.tipoPresupuesto.idTipoPresupuesto === 4){
                dataPresupuestoSubcontratos = {
                  programadoSubcontratos: presupuesto.programado*100,
                  ejecutadoSubcontratos: presupuesto.ejecutado*100,
                  totalProgramadoSubcontratos: presupuesto.acumuladoProgramado,
                  totalRealSubcontratos: presupuesto.totalReal
                }
              }
              if(presupuesto.tipoPresupuesto.idTipoPresupuesto === 5){
                dataPresupuestoMaquinariaEquipo = {
                  programadoMaquinariaEquipo: presupuesto.programado*100,
                  ejecutadoMaquinariaEquipo: presupuesto.ejecutado*100,
                  totalProgramadoMaquinariaEquipo: presupuesto.acumuladoProgramado,
                  totalRealMaquinariaEquipo: presupuesto.totalReal
                }
              }
              if(presupuesto.tipoPresupuesto.idTipoPresupuesto === 8){
                dataPresupuestoSobreCosto = {
                  programadoSobreCosto: presupuesto.programado*100,
                  ejecutadoSobreCosto: presupuesto.ejecutado*100,
                  totalProgramadoSobreCosto: presupuesto.acumuladoProgramado,
                  totalRealSobreCosto: presupuesto.totalReal
                }
              }  
            });

            newPresupuestoSemana = {
              periodo: datosSemana.periodo,
              corte: datosSemana.corte,
              ...dataPresupuestoObra,
              ...dataPresupuestoMateriales,
              ...dataPresupuestoManoObra,
              ...dataPresupuestoSubcontratos,
              ...dataPresupuestoMaquinariaEquipo,
              ...dataPresupuestoSobreCosto
            }
            
            semanas.push(newPresupuestoSemana);

           
          });
          this.dataSemanas = semanas;
          console.log(semanas);
          // console.log(this.programadoAvanceFisico);
          // console.log(this.ejecutadoAvanceFisico);
          // console.log(this.validadoAvanceFisico);
          // console.log(this.programadoCostoObra);
          // console.log(this.realCostoObra);
        },
        error => console.log(error)
      );
    }
  }

  generarReporte(){
    const format = 'yyyy-MM-dd';
    const nuevaFechaInicio = this.pipe.transform(this.fechaInicio, format);
    const nuevaFechaFin = this.pipe.transform(this.fechaFinal, format);
    this.reportesEstadisticasService.descargarControlAvanceGeneral(this.idObra, nuevaFechaInicio, nuevaFechaFin).subscribe(
      response => {
        var blob = new Blob([response], {type: 'application/xlsx'});
        var link=document.createElement('a');
      
        var obj_url = window.URL.createObjectURL(blob);		    
        var link = document.createElement("a");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", obj_url);
        link.setAttribute("download","control-avance-semanal.xlsx");
          
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error => {
        console.log(error);
        this.useAlerts(error.message, ' ', 'error-dialog');
      }
    );

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
