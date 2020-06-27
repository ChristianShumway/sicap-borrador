import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { egretAnimations } from "app/shared/animations/egret-animations";
import tinyColor from 'tinycolor2';

@Component({
  selector: 'app-graficas-reporte-costo-avance-general',
  templateUrl: './graficas-reporte-costo-avance-general.component.html',
  styleUrls: ['./graficas-reporte-costo-avance-general.component.scss'],
  animations: egretAnimations
})
export class GraficasReporteCostoAvanceGeneralComponent implements OnInit, OnChanges {
  avanceFisico: any;
  costoObra: any;
  @Input() programadoAvanceFisico: any;
  @Input() ejecutadoAvanceFisico: any;
  @Input() validadoAvanceFisico: any;
  @Input() programadoCostoObra: any;
  @Input() realCostoObra: any;
  @Input() periodos: any;

  constructor() { }

  ngOnInit() {
    this.getAvanceFisico();
    this.getCostoObra();
    console.log('hola');
    // this.logs();
  }

  ngOnChanges(){
    this.logs();
  }

  logs(){
    console.log(this.programadoAvanceFisico);
    console.log(this.ejecutadoAvanceFisico);
    console.log(this.validadoAvanceFisico);
    console.log(this.programadoCostoObra);
    console.log(this.realCostoObra);
    console.log(this.periodos);     
  }

  getAvanceFisico() {
    // console.log(theme);
    this.avanceFisico = {
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
        left: "60",
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
          data: this.programadoAvanceFisico,
          type: "line",
          name: "Programado",
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
        },
        {
          data: this.ejecutadoAvanceFisico,
          type: "line",
          name: "Ejecutado",
          smooth: true,
          color: tinyColor('#ef6c00').toString(),
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: tinyColor('#ef6c00').toString(),
              borderColor: tinyColor('#ef6c00').setAlpha(.4).toString(),
              opacity: 1,
              borderWidth: 8
            },
            label: {
              show: false,
              backgroundColor: "#fff"
            }
          }
        },
        {
          data: this.validadoAvanceFisico,
          type: "line",
          name: "Validado",
          smooth: true,
          color: "rgba(0, 0, 0, .3)",
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: "rgba(0, 0, 0, .5)",
              borderColor: "rgba(0, 0, 0, .2)",
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


  getCostoObra() {
    // console.log(theme);
    this.costoObra = {
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
          data: this.programadoCostoObra,
          type: "line",
          name: "Programado",
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
        },
        {
          data: this.realCostoObra,
          type: "line",
          name: "Real",
          smooth: true,
          color: tinyColor('#ef6c00').toString(),
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: tinyColor('#ef6c00').toString(),
              borderColor: tinyColor('#ef6c00').setAlpha(.4).toString(),
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
