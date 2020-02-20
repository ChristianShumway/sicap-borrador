import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EvidenciaReporte } from '../../../../shared/models/evidencia-reporte';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() listaEvidencias: EvidenciaReporte[] = [];
  @Output() deleteEvidenceClicked: EventEmitter<EvidenciaReporte> = new EventEmitter();
  conceptoEvidencias: number;
  showEvidenceZoom: boolean = false;
  urlImageShow: string;

  constructor() { }

  ngOnInit() {
    console.log(this.listaEvidencias);
  }

  showImageZoom(url,img){
    this.urlImageShow = `${url}/${img}`;
    this.showEvidenceZoom = true;
  }

  closeModal(){
    this.showEvidenceZoom = false;
  }

  deleteEvidence(evidence){
    this.deleteEvidenceClicked.emit(evidence)
  }

}
