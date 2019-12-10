import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObraService } from '../../../../shared/services/obra.service';
import { ActivatedRoute, Params,  } from '@angular/router';
import { environment } from './../../../../../environments/environment';
import { Obra } from './../../../../shared/models/obra';

@Component({
  selector: 'app-ver-obra',
  templateUrl: './ver-obra.component.html',
  styleUrls: ['./ver-obra.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class VerObraComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  activeView : string = 'overview';
  // usuario: Usuario;
  urlImg: string;
  host: string;

  constructor(
    private obraService: ObraService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getObra();
    this.urlImg = environment.imgRUL;
    this.host= environment.host;
    this.activeView = this.activatedRoute.snapshot.params['view'];
  }

  getObra() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.obraService.getObraObservable(data.id);
      this.obraObs$ = this.obraService.getDataObra();
      console.log(this.obraObs$);
    });
  }

}
