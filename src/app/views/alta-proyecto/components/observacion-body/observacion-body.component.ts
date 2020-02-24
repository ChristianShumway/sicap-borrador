import { Component, OnInit, Input } from '@angular/core';
import { Observacion } from './../../../../shared/models/observacion';
import { ObraService } from '../../../../shared/services/obra.service';

@Component({
  selector: 'app-observacion-body',
  templateUrl: './observacion-body.component.html',
  styleUrls: ['./observacion-body.component.scss']
})
export class ObservacionBodyComponent implements OnInit {

  @Input() observacion: Observacion;
  nombreObservacion: string;

  constructor(
    private obraService: ObraService,
  ) { }

  ngOnInit() {
    this.obraService.geTiposObservacionParaMontosObra().subscribe(
      observaciones => {
        observaciones.map ( observacion => {
          if(observacion.idTipoObservacion === this.observacion.idTipoObservacion){
            this.nombreObservacion = observacion.descripcion;
          }
        })
      },
      error => console.log(error)
    );
  }

}
