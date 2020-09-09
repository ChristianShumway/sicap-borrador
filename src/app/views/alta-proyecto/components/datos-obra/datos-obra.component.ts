import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ObraService } from 'app/shared/services/obra.service';
import { Obra } from './../../../../shared/models/obra';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datos-obra',
  templateUrl: './datos-obra.component.html',
  styleUrls: ['./datos-obra.component.scss']
})
export class DatosObraComponent implements OnInit {

  private obraObs$: Observable<Obra>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private obraService: ObraService,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.initUploadImae();
    this.getDataObra();
  }

  getDataObra() {
    this.activatedRoute.params
    .subscribe((data: Params) => {
      console.log(data.id);
      const idObraActual = data.id;
      this.obraService.getObraObservable(idObraActual);
      this.obraObs$ = this.obraService.getDataObra();  
      
    });
  }

}
