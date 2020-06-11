import { Component, OnInit } from '@angular/core';
import { egretAnimations } from "app/shared/animations/egret-animations";
import tinyColor from 'tinycolor2';

@Component({
  selector: 'app-graficas-reporte-costo-avance-general',
  templateUrl: './graficas-reporte-costo-avance-general.component.html',
  styleUrls: ['./graficas-reporte-costo-avance-general.component.scss'],
  animations: egretAnimations
})
export class GraficasReporteCostoAvanceGeneralComponent implements OnInit {
  avanceFisico: any;
  costoObra: any;

  constructor() { }

  ngOnInit() {
    this.getAvanceFisico();
    this.getCostoObra();
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
        data: [
          "Semana 1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14"
        ],
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
          data: [
            6,
            10,
            8,
            12,
            40,
            42,
            43,
            44,
            80,
            82,
            90,
            91,
            95,
            120
          ],
          type: "line",
          name: "Bitcoin",
          smooth: true,
          color: tinyColor('#9c27b0').toString(),
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: tinyColor('#9c27b0').toString(),
              borderColor: tinyColor('#9c27b0').setAlpha(.4).toString(),
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
          data: [
            4,
            8,
            8,
            10,
            30,
            32,
            33,
            34,
            70,
            72,
            80,
            81,
            85,
            90
          ],
          type: "line",
          name: "Ethereum (ETH)",
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
        left: "60",
        right: "20",
        bottom: "60"
      },
      xAxis: {
        type: "category",
        data: [
          "Semana 1",
          "Semana 2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14"
        ],
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
          data: [
            100000,
            130000,
            200000,
            1000000,
            2000000,
            2500000,
            2900000,
            3200000,
            3500000,
            3800000,
            4000000,
            4500000,
            4700000,
            6000000
          ],
          type: "line",
          name: "Bitcoin",
          smooth: true,
          color: tinyColor('#9c27b0').toString(),
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: tinyColor('#9c27b0').toString(),
              borderColor: tinyColor('#9c27b0').setAlpha(.4).toString(),
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
          data: [
            90000,
            100000,
            150000,
            800000,
            1000000,
            1500000,
            1900000,
            2200000,
            2500000,
            2800000,
            3000000,
            3500000,
            3700000,
            5000000
          ],
          type: "line",
          name: "Ethereum (ETH)",
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



}
