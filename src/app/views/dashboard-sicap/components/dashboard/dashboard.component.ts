import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'app/shared/services/dashboard.service';
import { egretAnimations } from "app/shared/animations/egret-animations";
import { ThemeService } from "app/shared/services/theme.service";
import { ReportesEstadisticasService } from 'app/shared/services/reportes-estadisticas.service';
import tinyColor from 'tinycolor2';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: egretAnimations
})
export class DashboardComponent implements OnInit {

  public dataObras: any[] = [];
  public obraActual;
  public idPosicionObraActual = 1;
  public loadingData: boolean = true;
  host: string;
  rutaImg: string;
  dataAvanceObra: any[] = [];
  graficaTiempo: any;
  avanceProgramado: any;
  avanceEjecutado: any;
  avanceValidado: any;
  porcentajeProgramado: any;
  porcentajeEjecutado: any;
  porcentajeValidado: any;


  constructor(
    private dashboardService: DashboardService,
    private themeService: ThemeService,
    private reportesEstadisticasService: ReportesEstadisticasService
  ) { }

  ngOnInit() {
    this.host = environment.host;
    this.rutaImg = environment.imgRUL;
    this.getDataObras();
  }

  getDataObras() {
    this.dashboardService.getDataObras().subscribe(
      result => {
        this.dataObras = result;
        // console.log(this.dataObras);
        this.getObraShow();
        this.loadingData = false;
      },
      error => {
        this.loadingData = false;
        console.log(error);
      }
    );
  }

  getObraShow() {
    this.obraActual = this.dataObras[this.idPosicionObraActual-1];
    console.log(this.obraActual);
    this.initGraficaTiempo();
    this.getGraficasAvance();
  }

  moveObra(option) {
    if(option === 'back') {
      this.idPosicionObraActual = this.idPosicionObraActual - 1; 
    } else if(option === 'next') {
      this.idPosicionObraActual = this.idPosicionObraActual + 1; 
    }
    this.getObraShow();
  }

  showObraBullet(num) {
    this.idPosicionObraActual = num;
    this.getObraShow();
  }

  getGraficasAvance() {
    this.porcentajeProgramado = 0;
    this.porcentajeEjecutado = 0;
    this.porcentajeValidado = 0;
    this.reportesEstadisticasService.getGraficasAvanceDashboard(this.obraActual.idObra).subscribe(
      result => {
        let dataSemanas = [];
        let dataAvanceProgramado = [];
        let dataAvanceEjecutado = [];
        let dataAvanceValidado = [];
        let last;

        this.dataAvanceObra = result;
        console.log(this.dataAvanceObra);
        last = result[result.length - 1];
        console.log(last);
        this.porcentajeProgramado = (last.programado * 100).toFixed(2);
        this.porcentajeEjecutado = (last.ejecutado * 100).toFixed(2);
        this.porcentajeValidado = (last.validado * 100).toFixed(2);
        this.dataAvanceObra.map( (semana, i) => {
          let porcentajeP = (semana.programado * 100);
          let porcentajeE = (semana.ejecutado * 100);
          let porcentajeV = (semana.validado * 100);

          dataSemanas.push(String(i+1));
          dataAvanceProgramado.push(porcentajeP.toFixed(2));
          dataAvanceEjecutado.push(porcentajeE.toFixed(2));
          dataAvanceValidado.push(porcentajeV.toFixed(2));
        });
        // console.log(dataAvanceProgramado);
        // console.log(dataSemanas);
        this.graficaAvanceProgramado(dataSemanas, dataAvanceProgramado);
        this.graficaAvanceEjecutado(dataSemanas, dataAvanceEjecutado);
        this.graficaAvanceValidado(dataSemanas, dataAvanceValidado);
      },
      error => {
        console.error(error);
        console.error('no cargo el servicio de las graficas de avance');
      }
    );
  }


  // GRÁFICA DEL TIEMPO TRANSCURRIDO DE LA OBRA
  initGraficaTiempo() {
    let diasRestantes, diasTranscurridos;

    if(this.obraActual.diasTranscurridos > this.obraActual.plazoEjecucion) {
      diasTranscurridos = this.obraActual.plazoEjecucion;
    } else {
      diasTranscurridos = this.obraActual.diasTranscurridos;
    }

    if(this.obraActual.diasRestantes < 0) {
      diasRestantes = 0;
    } else {
      diasRestantes = this.obraActual.diasRestantes;
    }

    this.graficaTiempo = {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      color: [
        tinyColor('#c62828').setAlpha(.6).toString(),
        tinyColor('#4caf50').setAlpha(.7).toString(),
        tinyColor('#7367f0').setAlpha(.8).toString()
      ],
      tooltip: {
        show: false,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "Sessions",
          type: "pie",
          radius: ["55%", "85%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 5,
          stillShowZeroSum: false,
          label: {
            normal: {
              show: false,
              position: "center",
              textStyle: {
                fontSize: "12",
                fontWeight: "normal"
              },
              formatter: "{a}"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "12",
                fontWeight: "normal",
                color: "rgba(15, 21, 77, 1)"
              },
              formatter: "{b} \n{c} ({d}%)"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: diasTranscurridos,
              name: "Días Transcurridos"
            },
            {
              value: diasRestantes,
              name: "Días Restantes"
            },
            // { value: 148, name: "Social" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }



  // GRÁFICA PROGRAMADO DE OBRA
  graficaAvanceProgramado(semanas, cantidades) {
    this.avanceProgramado = {
      tooltip: {
        trigger: "axis",

        axisPointer: {
          animation: true
        }
      },
      grid: {
        left: "0",
        top: "0",
        right: "0",
        bottom: "0"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: semanas,
        axisLabel: { show: true},
        axisLine: { lineStyle: { show: false } },
        axisTick: { show: false },
        splitLine: { show: false }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 100,
        interval: 'auto',
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      },
      series: [
        {
          name: "Programado % ",
          type: "line",
          smooth: false,
          data: cantidades,
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "rgba(233, 31, 99, 0.4)"
          },
          areaStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: tinyColor('#03a9f4').toString()
                  },
                  {
                    offset: 1,
                    color: tinyColor('#03a9f4').setAlpha(.6).toString()
                  }
                ]
              }
            }
          }
        }
      ]
    };
  }

  // GRÁFICA EJECUTADO DE OBRA
  graficaAvanceEjecutado(semanas, cantidades) {
    this.avanceEjecutado = {
      tooltip: {
        trigger: "axis",

        axisPointer: {
          animation: true
        }
      },
      grid: {
        left: "0",
        top: "0",
        right: "0",
        bottom: "0"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: semanas,
        axisLabel: { show: true},
        axisLine: { lineStyle: { show: false } },
        axisTick: { show: false },
        splitLine: { show: false }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 100,
        interval: 50,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      },
      series: [
        {
          name: "Ejecutado % ",
          type: "line",
          smooth: false,
          data: cantidades,
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "rgba(233, 31, 99, 0.4)"
          },
          areaStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: tinyColor('#f98c84').toString()
                  },
                  {
                    offset: 1,
                    color: tinyColor('#f98c84').setAlpha(.6).toString()
                  }
                ]
              }
            }
          }
        }
      ]
    };
  }

   // GRÁFICA VALIDADO DE OBRA
   graficaAvanceValidado(semanas, cantidades) {
    this.avanceValidado = {
      tooltip: {
        trigger: "axis",

        axisPointer: {
          animation: true
        }
      },
      grid: {
        left: "0",
        top: "0",
        right: "0",
        bottom: "0"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: semanas,
        axisLabel: { show: true},
        axisLine: { lineStyle: { show: false } },
        axisTick: { show: false },
        splitLine: { show: false }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 100,
        interval: 50,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      },
      series: [
        {
          name: "Validado % ",
          type: "line",
          smooth: false,
          data: cantidades,
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "rgba(233, 31, 99, 0.4)"
          },
          areaStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: tinyColor('#3b3d46').toString()
                  },
                  {
                    offset: 1,
                    color: tinyColor('#3b3d46').setAlpha(.6).toString()
                  }
                ]
              }
            }
          }
        }
      ]
    };
  }


}
