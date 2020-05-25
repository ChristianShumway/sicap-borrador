import { Component, OnInit, Input, ChangeDetectionStrategy, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ObraService } from '../../../../shared/services/obra.service';
import { Observable } from 'rxjs';
import { Observacion } from '../../../../shared/models/observacion';

@Component({
  selector: 'app-bitacora-obra',
  templateUrl: './bitacora-obra.component.html',
  styleUrls: ['./bitacora-obra.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BitacoraObraComponent implements OnInit {

  // @Input() idObra: number;
  private observacionesObs$ : Observable<Observacion[]>;
  observaciones: Observacion[];

  constructor(
    private obraService: ObraService,
    public dialogRef: MatDialogRef<BitacoraObraComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.getObservationsByObra();
  }

  getObservationsByObra(){
    console.log(this.data.idObra);
    this.obraService.getObservacionesObraObservable(this.data.idObra);
    this.observacionesObs$ = this.obraService.getObservacionesObra();
    // this.obraService.getObservacionesObra().subscribe( result => this.observaciones = result);
  }

}
