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
  nombrePresupuesto: string;

  constructor(
    private obraService: ObraService,
  ) { }

  ngOnInit() {
    this.obraService.getPresupuestosParaMontosObra().subscribe(
      presupuestos => {
        presupuestos.map ( presupuesto => {
          if(presupuesto.idTipoPresupuesto === this.observacion.idTipoPresupuesto){
            this.nombrePresupuesto = presupuesto.descripcion;
          }
        })
      },
      error => console.log(error)
    );
  }

}
