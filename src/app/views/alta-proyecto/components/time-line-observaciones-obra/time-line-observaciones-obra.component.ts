import { Component, OnInit, Input } from '@angular/core';
import { Observacion } from './../../../../shared/models/observacion';

@Component({
  selector: 'app-time-line-observaciones-obra',
  templateUrl: './time-line-observaciones-obra.component.html',
  styleUrls: ['./time-line-observaciones-obra.component.scss']
})
export class TimeLineObservacionesObraComponent implements OnInit {
  
  isLinear = false;
  @Input() observacionesList: Observacion[];
  
  constructor() { }


  ngOnInit() {
    console.log(this.observacionesList);
    // this.observacionesList.map( result => console.log(result));
  }

}
