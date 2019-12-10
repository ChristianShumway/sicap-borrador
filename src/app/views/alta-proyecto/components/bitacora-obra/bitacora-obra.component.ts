import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-bitacora-obra',
  templateUrl: './bitacora-obra.component.html',
  styleUrls: ['./bitacora-obra.component.scss']
})
export class BitacoraObraComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe( (data: Params) => {
      console.log(data);
    });
  }

}
