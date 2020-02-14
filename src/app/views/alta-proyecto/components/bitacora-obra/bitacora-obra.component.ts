import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ObraService } from '../../../../shared/services/obra.service';
import { Observable } from 'rxjs';
import { Observacion } from '../../../../shared/models/observacion';

@Component({
  selector: 'app-bitacora-obra',
  templateUrl: './bitacora-obra.component.html',
  styleUrls: ['./bitacora-obra.component.scss']
})
export class BitacoraObraComponent implements OnInit {
  private observacionesObs$ : Observable<Observacion[]>;
  idObra;

  constructor(
    private activatedRoute: ActivatedRoute,
    private obraService: ObraService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe( (data: Params) => {
      this.idObra = data.id;
      this.getObservationsByObra();
    }); 
  }

  getObservationsByObra(){
    this.obraService.getObservacionesObraObservable(this.idObra);
    this.observacionesObs$ = this.obraService.getObservacionesObra();
  }

}
