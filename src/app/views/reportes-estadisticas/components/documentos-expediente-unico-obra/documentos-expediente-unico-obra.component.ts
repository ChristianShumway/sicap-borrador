import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-documentos-expediente-unico-obra',
  templateUrl: './documentos-expediente-unico-obra.component.html',
  styleUrls: ['./documentos-expediente-unico-obra.component.scss']
})
export class DocumentosExpedienteUnicoObraComponent implements OnInit {

  @Input() fases: any
  constructor() { }

  ngOnInit() {
    console.log(this.fases);
  }

}
