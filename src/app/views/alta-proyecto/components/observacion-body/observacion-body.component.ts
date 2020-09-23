import { Component, OnInit, Input } from '@angular/core';
import { Observacion, EvidenciaObservacion } from './../../../../shared/models/observacion';
import { ObraService } from '../../../../shared/services/obra.service';
import { environment } from './../../../../../environments/environment';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';

@Component({
  selector: 'app-observacion-body',
  templateUrl: './observacion-body.component.html',
  styleUrls: ['./observacion-body.component.scss']
})
export class ObservacionBodyComponent implements OnInit {

  @Input() observacion: Observacion;
  @Input() idUsuario;
  nombreObservacion: string;
  evidencias: EvidenciaObservacion[];
  rutaSicap: string;
  host: string;
  showEvidenceZoom: boolean = false;
  urlImageShow: string;
  idUsuarioModifico: number;

  constructor(
    private obraService: ObraService,
  ) { }

  ngOnInit() {
    // console.log(this.observacion);
    this.rutaSicap = environment.imgRUL;
    this.host = environment.host;
    this.obraService.geTiposObservacionParaMontosObra().subscribe(
      observaciones => {
        // console.log(observaciones);
        observaciones.map ( observacion => {
          if(observacion.idTipoObservacion === this.observacion.idTipoObservacion){
            this.nombreObservacion = observacion.descripcion;
          }
        })
      },
      error => console.log(error)
    );

    // console.log(this.observacion);
    this.evidencias = this.observacion.evidenciaObservacion;
    this.idUsuarioModifico = this.observacion.idUsuarioModifico;
  }

  showImageZoom(url,img){
    this.urlImageShow = `http://${this.host}/${this.rutaSicap}/files/files-log-obra/${img}`;
    this.showEvidenceZoom = true;
  }

  closeModal(){
    this.showEvidenceZoom = false;
  }

  deleteEvidence(evidence){
    // this.deleteEvidenceClicked.emit(evidence)
    console.log(evidence);
  }

}
