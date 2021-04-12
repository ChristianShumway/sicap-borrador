import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'app/shared/services/dashboard.service';
import { egretAnimations } from "app/shared/animations/egret-animations";
import { ThemeService } from "app/shared/services/theme.service";
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
  graficaTiempo: any;


  constructor(
    private dashboardService: DashboardService,
    private themeService: ThemeService
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
        console.log(this.dataObras);
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
  }

  moveObra(option) {
    if(option === 'back') {
      this.idPosicionObraActual = this.idPosicionObraActual - 1; 
    } else if(option === 'next') {
      this.idPosicionObraActual = this.idPosicionObraActual + 1; 
    }
    // console.log(this.idPosicionObraActual);
    this.getObraShow();
  }

  showObraBullet(num) {
    // console.log(num);
    this.idPosicionObraActual = num;
    this.getObraShow();
  }

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
        tinyColor('#7367f0').setAlpha(.6).toString(),
        tinyColor('#7367f0').setAlpha(.7).toString(),
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

}
