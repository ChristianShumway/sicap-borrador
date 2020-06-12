import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-costo-reporte-costo-avance-general',
  templateUrl: './costo-reporte-costo-avance-general.component.html',
  styleUrls: ['./costo-reporte-costo-avance-general.component.scss']
})
export class CostoReporteCostoAvanceGeneralComponent implements OnInit {
  @Input() semanas: any; 
  @Input() costoGeneral: any;
  constructor() { }

  ngOnInit() {
  }

}
