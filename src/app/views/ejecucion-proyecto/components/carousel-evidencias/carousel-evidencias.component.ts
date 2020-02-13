import { Component, OnInit, Input } from '@angular/core';
import { EvidenciaReporte } from '../../../../shared/models/evidencia-reporte';

@Component({
  selector: 'app-carousel-evidencias',
  templateUrl: './carousel-evidencias.component.html',
  styleUrls: ['./carousel-evidencias.component.scss']
})
export class CarouselEvidenciasComponent implements OnInit {
  panelOpenState = false;
 
  mySlideImages = [];
  myCarouselImages =[];
 
  mySlideOptions={items: 1, dots: true, nav: true};
  myCarouselOptions={items: 3, dots: true, nav: true};


  @Input() evidencias: EvidenciaReporte[];

  constructor() { }

  ngOnInit() {
    // console.log(this.evidencias);
    this.evidencias.map( (evidencia:EvidenciaReporte) => {
      // console.log(evidencia);
      const urlImg = `${evidencia.url}/${evidencia.nombre}`;
      this.mySlideImages.push(urlImg);
      this.myCarouselImages.push(urlImg);
    })

    
  }

}
