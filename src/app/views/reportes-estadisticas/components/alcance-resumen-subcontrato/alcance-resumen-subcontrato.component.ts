import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alcance-resumen-subcontrato',
  templateUrl: './alcance-resumen-subcontrato.component.html',
  styleUrls: ['./alcance-resumen-subcontrato.component.scss']
})
export class AlcanceResumenSubcontratoComponent implements OnInit {
  @Input() semanas: any; 
  constructor() { }

  ngOnInit() {
    console.log(this.semanas);
  }

}
