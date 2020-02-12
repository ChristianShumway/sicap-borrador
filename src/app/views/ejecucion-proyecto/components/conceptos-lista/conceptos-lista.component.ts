import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-conceptos-lista',
  templateUrl: './conceptos-lista.component.html',
  styleUrls: ['./conceptos-lista.component.scss']
})
export class ConceptosListaComponent implements OnInit {
  @Input() public conceptos;
  @Input() public tipoReporte: string;
  conceptosSeleccionados: any[] = [];
  panelOpenState = false;
  montoImporteConceptosSeleccionados: number = 0;
  constructor() { }

  ngOnInit() {
    console.log(this.tipoReporte);
    this.conceptos.map( concepto => {
      if(this.tipoReporte === 'plan-trabajo'){
        if (concepto.cantidadPlaneada > 0){
          this.conceptosSeleccionados.push(concepto);
          this.montoImporteConceptosSeleccionados =  this.montoImporteConceptosSeleccionados + concepto.importePlaneado;
        }
        // console.log(this.conceptosSeleccionados);
        // console.log(this.montoImporteConceptosSeleccionados);
      } else if(this.tipoReporte === 'reporte-ejecutados'){
        if (concepto.cantidadEjecutada > 0){
          this.conceptosSeleccionados.push(concepto);
          this.montoImporteConceptosSeleccionados =  this.montoImporteConceptosSeleccionados + concepto.importeEjecutado;
        }
      } else if(this.tipoReporte === 'reporte-subcontrato'){
        if (concepto.cantidadSubContrato > 0){
          this.conceptosSeleccionados.push(concepto);
          this.montoImporteConceptosSeleccionados =  this.montoImporteConceptosSeleccionados + concepto.importeSubContrato;
        }
      }
    });
  }

}
