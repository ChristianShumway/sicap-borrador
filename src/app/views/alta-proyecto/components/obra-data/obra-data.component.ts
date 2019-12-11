import { Component, OnInit, Input } from '@angular/core';
import { Obra } from '../../../../shared/models/obra';

@Component({
  selector: 'app-obra-data',
  templateUrl: './obra-data.component.html',
  styleUrls: ['./obra-data.component.scss']
})
export class ObraDataComponent implements OnInit {

  @Input() obra: Obra;
  constructor() { }

  ngOnInit() {
    console.log(this.obra);
  }

}
