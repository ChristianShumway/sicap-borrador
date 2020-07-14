import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CierreObraService } from '../../../../shared/services/cierre-obra.service';
import { CierreObra } from './../../../../shared/models/cierre-obra';

@Component({
  selector: 'app-data-cierre-obra',
  templateUrl: './data-cierre-obra.component.html',
  styleUrls: ['./data-cierre-obra.component.scss']
})
export class DataCierreObraComponent implements OnInit {

  dataCierreObra: CierreObra;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cierreObraService: CierreObraService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getDataCierreObra();
  }

  getDataCierreObra() {
    this.activatedRoute.params
    .subscribe((data: Params) => {
      if (data.idObra) {
        this.cierreObraService.getCierreObra(data.idObra).subscribe(
          result => {
            this.dataCierreObra = result;
            console.log(result);
          },
          error => console.log(error)
        );
      }
    });
  }

}
