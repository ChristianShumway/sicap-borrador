import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { egretAnimations } from "app/shared/animations/egret-animations";
import tinyColor from 'tinycolor2'

import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { ObraService } from '../../../../shared/services/obra.service';
import { ReportesEstadisticasService } from '../../../../shared/services/reportes-estadisticas.service';

import { Obra } from './../../../../shared/models/obra';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-estado-cuenta-obra',
  templateUrl: './estado-cuenta-obra.component.html',
  styleUrls: ['./estado-cuenta-obra.component.scss'],
  animations: egretAnimations
})
export class EstadoCuentaObraComponent implements OnInit {

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
  dataRep: any[];
  dataAlcanceGral: any[];
  dataSemanas: any[];

  totalIngresosFecha;
  totalEgresosFecha;
  diferenciaTotales;

  columnasFlex: any[];
  totalColumnas = 0;
  dataIngresosEgresos : any[];
  dataIngresos: any[];
  dataCostosObra: any[];
  dataCostosAdministrativos: any[];
  dataCreditoPrestamo: any[];
  dataImpuestos: any[];
  dataInversion: any[];

  graficaEstadoCuentaObra: any;
  totalesIngresosEgresos: any[];
  periodos: any[];

  totalIngresos: any[];
  totalCostosObra: any[];
  totalCostosAdministrativos: any[];
  totalCreditoPrestamo: any[];
  totalImpuestos: any[];
  totalInversion: any[];

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
      this.error={isError:true,errorMessage:'Fecha de busqueda no puede ser menor a la fecha de inicio de la obra'};
      this.reporteForm.controls['fechaFinal'].setValue(new Date());
      this.fechaFinal =  new Date(this.reporteForm.controls['fechaFinal'].value);
    } else {
      this.error={isError:false};
    }
  }

  buscarDatos(){
    this.ver = false;
    if (this.reporteForm.valid){
      this.ver = true;
      const format = 'yyyy-MM-dd';
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicio, format);
      const nuevaFechaFin = this.pipe.transform(this.fechaFinal, format);

      this.reportesEstadisticasService.getEstadoCuentaObra(this.idObra, nuevaFechaInicio, nuevaFechaFin).subscribe(
        result => {
          this.dataRep = result;
          console.log(result);
          this.totalIngresosFecha = result.ingresosTotales;
          this.totalEgresosFecha = result.egresosTotales;
          this.diferenciaTotales = result.diferencia;

          Object.keys(result).forEach ( item => {
            if(item === 'totales'){
              this.totalDataIngresosEgresosResumen(result[item]);
            }
            if(item === 'meses'){
              const columnas = [
                {idMes:0, descripcion:'Categoria'},
                ...result[item]
              ];
              this.columnasFlex = columnas;
              this.totalColumnas = columnas.length;
            }
            if(item === 'desglose'){
              this.dataIngresosEgresos = result[item];
              // this.useDesgloseIngresosEgresos(result[item]);
            }
            if(item === 'totalesMes'){
              this.useTotalesMes(result[item]);
            }
          });
        },
        error => console.log(error)
      );
    }
  }

  generarReporte(){
    const format = 'yyyy-MM-dd';
    const nuevaFechaInicio = this.pipe.transform(this.fechaInicio, format);
    const nuevaFechaFin = this.pipe.transform(this.fechaFinal, format);
    this.reportesEstadisticasService.descargarEstadoCuentaObra(this.idObra, nuevaFechaInicio, nuevaFechaFin).subscribe(
      response => {
        var blob = new Blob([response], {type: 'application/xlsx'});
        var link=document.createElement('a');
      
        var obj_url = window.URL.createObjectURL(blob);		    
        var link = document.createElement("a");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", obj_url);
        link.setAttribute("download","estado-cuenta-obra.xlsx");
          
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

  totalDataIngresosEgresosResumen(data){
    const semanas = [];
    let newMovimiento;
    let costosAdministrativos;
    let costosObra;
    let creditoPrestamo;
    let impuestos;
    let egresos;
    let ingresos;
    let totales;

    Object.keys(data).forEach ( item => {
      // console.log(result[item]);
      const semana = data[item];
      // console.log(semana.movimientos);  
      semana.movimientos.map( dataMovimiento => {
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === 1){
          costosAdministrativos = { acumuladoCA: dataMovimiento.acumulado};
        }
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === 2){
          if(!costosObra) {
            costosObra = { acumuladoCO: dataMovimiento.acumulado};
          }
        }
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === 3){
          creditoPrestamo = { acumuladoCP: dataMovimiento.acumulado};
        }
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === 4){
          impuestos = { acumuladoIMP: dataMovimiento.acumulado};
        }
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === 5){
          egresos = { acumuladoEGR: dataMovimiento.acumulado};
        }
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === 6){
          ingresos = { acumuladoING: dataMovimiento.acumulado};
        }
        if( dataMovimiento.tipoMovimiento.idTipoMovimientoMonetario === -5){
          totales = { acumuladoTOT: dataMovimiento.acumulado};
        }
      });

      newMovimiento = {
        periodo: semana.periodo,
        corte: semana.corte,
        ...costosAdministrativos,
        ...costosObra,
        ...creditoPrestamo,
        ...impuestos,
        ...egresos,
        ...ingresos,
        ...totales
      };

      semanas.push(newMovimiento);

      costosAdministrativos = '';
      costosObra = '';
      creditoPrestamo  = '';
      impuestos = '';
      egresos = '';
      ingresos = '';
      totales = '';


    });
    this.dataAlcanceGral = semanas;
    // console.log(this.dataAlcanceGral);
    this.getDataGraphic(this.dataAlcanceGral);
  }

  useDesgloseIngresosEgresos(data){
    this.dataIngresosEgresos = data;
    // console.log(data);
    data.map( tipoCuenta => {
      if(tipoCuenta.idTipo === 1){
        this.dataCostosAdministrativos = tipoCuenta;
      }
      if(tipoCuenta.idTipo === 2){
        this.dataCostosObra = tipoCuenta;
      }
      if(tipoCuenta.idTipo === 3){
        this.dataCreditoPrestamo = tipoCuenta;
      }
      if(tipoCuenta.idTipo === 4){
        this.dataImpuestos = tipoCuenta;
      }
      if(tipoCuenta.idTipo === 5){
        this.dataInversion = tipoCuenta;
      }
      if(tipoCuenta.idTipo === 6){
        this.dataIngresos = tipoCuenta;
      }
    });
    // console.log(this.dataIngresos);
  }

  useTotalesMes(data){
    // console.log(data);
    Object.keys(data).forEach ( tipo => {
      if(tipo === '1'){
        // this.totalCostosAdministrativos = [{idTipo:1, totales: data[tipo]}];
        this.totalCostosAdministrativos = data[tipo];
      }
      if(tipo === '2'){
        // this.totalCostosObra = [{idTipo:2, totales: data[tipo]}];
        this.totalCostosObra = data[tipo];
      }
      if(tipo === '3'){
        // this.totalCreditoPrestamo = [{idTipo:3, totales: data[tipo]}];
        this.totalCreditoPrestamo = data[tipo];
      }
      if(tipo === '4'){
        // this.totalImpuestos = [{idTipo:4, totales: data[tipo]}];
        this.totalImpuestos = data[tipo];
      }
      if(tipo === '5'){
        // this.totalInversion = [{idTipo:5, totales: data[tipo]}];
        this.totalInversion = data[tipo];
      }
      if(tipo === '6'){
        // this.totalIngresos = [{idTipo:6, totales: data[tipo]}];
        this.totalIngresos = data[tipo];
      }
    });
  }

  getDataGraphic(data){
    this.periodos = [];
    this.totalesIngresosEgresos = [];
    data.map( semana => {
      if(semana.periodo !== 'TOTALES'){
        this.periodos.push(semana.periodo);
        this.totalesIngresosEgresos.push(semana.acumuladoTOT);
      }
    });
    // console.log(this.periodos);
    // console.log(this.totalesIngresosEgresos);
    this.getGraficaEstadoCuenta();
  }

  getGraficaEstadoCuenta() {
    // console.log(theme);
    this.graficaEstadoCuentaObra = {
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "#fff",
        extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); color: #444",
        axisPointer: {
          type: "line",
          animation: true
        }
      },
      grid: {
        top: "10%",
        left: "100",
        right: "20",
        bottom: "60"
      },
      xAxis: {
        type: "category",
        data: this.periodos,
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 30,
          color: "#888"
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        // max: "100",
        // interval: 5,
        data: [
          "10",
          "20",
          "30",
          "40",
          "50",
          "60",
          "70",
          "80",
          "90",
          "100",
          "120"
        ],
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 20,
          color: "#888"
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed"
          }
        }
      },
      series: [
        {
          data: this.totalesIngresosEgresos,
          type: "line",
          name: "Total $",
          smooth: true,
          color: tinyColor('#1976d2').toString(),
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: tinyColor('#1976d2').toString(),
              borderColor: tinyColor('#1976d2').setAlpha(.4).toString(),
              opacity: 1,
              borderWidth: 8
            },
            label: {
              show: false,
              backgroundColor: "#fff"
            }
          }
        }
      ]
    };
  }

}
