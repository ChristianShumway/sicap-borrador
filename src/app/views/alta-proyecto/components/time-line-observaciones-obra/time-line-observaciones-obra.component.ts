import { Component, OnInit, Input } from '@angular/core';
import { Observacion } from './../../../../shared/models/observacion';

@Component({
  selector: 'app-time-line-observaciones-obra',
  templateUrl: './time-line-observaciones-obra.component.html',
  styleUrls: ['./time-line-observaciones-obra.component.scss']
})
export class TimeLineObservacionesObraComponent implements OnInit {
  idUserLogeado;
  isLinear = false;
  @Input() observacionesList: Observacion[];
  @Input() idusuario;
  
  constructor(
  ) { }


  ngOnInit() {
    // console.log(this.idusuario);
  }

}
