import { Component, OnInit, Input } from '@angular/core';
import { EvidenciaReporte } from '../../../../shared/models/evidencia-reporte';

@Component({
  selector: 'app-carousel-evidencias',
  templateUrl: './carousel-evidencias.component.html',
  styleUrls: ['./carousel-evidencias.component.scss']
})
export class CarouselEvidenciasComponent implements OnInit {
 
  mySlideImages = ['./../../../../../assets/images/faces/10.jpg','./../../../../../assets/images/faces/13.jpg','./../../../../../assets/images/faces/12.jpg'];
  // myCarouselImages =['./../../../../../assets/images/faces/10.jpg','./../../../../../assets/images/faces/13.jpg','./../../../../../assets/images/faces/12.jpg'];
 
  mySlideOptions={items: 1, dots: true, nav: true};
  // myCarouselOptions={items: 4, dots: true, nav: true};


  @Input() evidencias: EvidenciaReporte[];

  constructor() { }

  ngOnInit() {
    console.log(this.evidencias);
    this.evidencias.map( (evidencia:EvidenciaReporte) => {
      console.log(evidencia.ruta);
      this.mySlideImages.push(evidencia.ruta);
      // this.myCarouselImages.push(evidencia.ruta);
    })

    
  }

}
