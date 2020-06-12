import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { ObraService } from '../../../../shared/services/obra.service';
import { ReportesEstadisticasService } from '../../../../shared/services/reportes-estadisticas.service';

import { Obra } from './../../../../shared/models/obra';
import { environment } from 'environments/environment';
import { ConceptoEjecutado } from './../../../../shared/models/concepto-ejecutado';

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
  ver = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    private obraService: ObraService,
    private reportesEstadisticasService: ReportesEstadisticasService
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

      const periodo = {
        fechaInicio: nuevaFechaInicio,
        fechaFinal: nuevaFechaFin
      }
      // console.log(periodo);

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
            datosSemana.programacion.map( presupuesto => {
              if(presupuesto.tipoPresupuesto.idTipoPresupuesto === 1){
                dataPresupuestoObra = {
                  programadoObra: presupuesto.programado,
                  ejecutadoObra: presupuesto.ejecutado,
                  totalProgramadoObra: presupuesto.acumuladoProgramado,
                  totalRealObra: presupuesto.totalReal,
                  totalValidadoObra: presupuesto.validado
                }
              }
              if(presupuesto.tipoPresupuesto.idTipoPresupuesto === 2){
                dataPresupuestoMateriales = {
                  programadoMateriales: presupuesto.programado,
                  ejecutadoMateriales: presupuesto.ejecutado,
                  totalProgramadoMateriales: presupuesto.acumuladoProgramado,
                  totalRealMateriales: presupuesto.totalReal
                }
              }
              if(presupuesto.tipoPresupuesto.idTipoPresupuesto === 3){
                dataPresupuestoManoObra = {
                  programadoManoObra: presupuesto.programado,
                  ejecutadoManoObra: presupuesto.ejecutado,
                  totalProgramadoManoObra: presupuesto.acumuladoProgramado,
                  totalRealManoObra: presupuesto.totalReal
                }
              }
              if(presupuesto.tipoPresupuesto.idTipoPresupuesto === 4){
                dataPresupuestoSubcontratos = {
                  programadoSubcontratos: presupuesto.programado,
                  ejecutadoSubcontratos: presupuesto.ejecutado,
                  totalProgramadoSubcontratos: presupuesto.acumuladoProgramado,
                  totalRealSubcontratos: presupuesto.totalReal
                }
              }
              if(presupuesto.tipoPresupuesto.idTipoPresupuesto === 5){
                dataPresupuestoMaquinariaEquipo = {
                  programadoMaquinariaEquipo: presupuesto.programado,
                  ejecutadoMaquinariaEquipo: presupuesto.ejecutado,
                  totalProgramadoMaquinariaEquipo: presupuesto.acumuladoProgramado,
                  totalRealMaquinariaEquipo: presupuesto.totalReal
                }
              }
              if(presupuesto.tipoPresupuesto.idTipoPresupuesto === 8){
                dataPresupuestoSobreCosto = {
                  programadoSobreCosto: presupuesto.programado,
                  ejecutadoSobreCosto: presupuesto.ejecutado,
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
        },
        error => console.log(error)
      );
    }
  }

}
