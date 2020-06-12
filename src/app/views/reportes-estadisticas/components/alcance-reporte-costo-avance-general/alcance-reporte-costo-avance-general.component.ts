import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alcance-reporte-costo-avance-general',
  templateUrl: './alcance-reporte-costo-avance-general.component.html',
  styleUrls: ['./alcance-reporte-costo-avance-general.component.scss']
})
export class AlcanceReporteCostoAvanceGeneralComponent implements OnInit {
  @Input() semanas: any; 
  @Input() alcanceGeneral: any;
  constructor() { }

  ngOnInit() {
  }

}
