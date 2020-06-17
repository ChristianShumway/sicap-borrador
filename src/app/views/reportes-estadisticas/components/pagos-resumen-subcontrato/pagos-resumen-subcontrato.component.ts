import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagos-resumen-subcontrato',
  templateUrl: './pagos-resumen-subcontrato.component.html',
  styleUrls: ['./pagos-resumen-subcontrato.component.scss']
})
export class PagosResumenSubcontratoComponent implements OnInit {
  @Input() pagos: any;
  constructor() { }

  ngOnInit() {
    console.log(this.pagos);
    
  }

}
