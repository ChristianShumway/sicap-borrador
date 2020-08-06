import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { MaterialParaSolicitud, PeticionSolicitudRecurso } from './../../../../shared/models/solicitud';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';
@Component({
  selector: 'app-modal-datos-solicitud',
  templateUrl: './modal-datos-solicitud.component.html',
  styleUrls: ['./modal-datos-solicitud.component.scss']
})
export class ModalDatosSolicitudComponent implements OnInit {

  rutaImg: string;
  host: string;
  solicitud;
  peticionesSeleccionadas: PeticionSolicitudRecurso[] = [];
  materialesSeleccionados: MaterialParaSolicitud[] = [];
  peticionesMaquinariaSeleccionadas: any[] = [];
  totalSolicitadoSinFactura:number = 0;
  totalSolicitadoConFactura:number = 0;
  imgEmpresa: string;

  constructor(
    public dialogRef: MatDialogRef<ModalDatosSolicitudComponent>,
    private solicitudService: SolicitudesService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;

    this.solicitudService.getSolicitudRecursoById(this.data.idTipo, this.data.idSolicitud).subscribe(
      response => {
        this.solicitud = response;
        console.log(this.solicitud);
        this.imgEmpresa = `http://${this.host}/${this.rutaImg}/files/${this.solicitud.obra.empresa.imagen}`;
        console.log(this.imgEmpresa);
        if(this.data.idTipo===1){
          this.getPeticiones(response);
        } else if(this.data.idTipo===2){
          this.getMateriales(response);
        } else if(this.data.idTipo===3){
          this.getPeticionesMaquinaria(response);
        }
      },
      error => console.log(error)
    );

  }

  getPeticiones(solicitud){
    solicitud.detSolicitudRecurso.map( (peticion: PeticionSolicitudRecurso) =>{
        this.peticionesSeleccionadas.push(peticion);
        this.totalSolicitadoSinFactura = this.totalSolicitadoSinFactura + peticion.importeSolicitadoSinFactura;
        this.totalSolicitadoConFactura = this.totalSolicitadoConFactura + peticion.importeSolicitadoConFactura;
    });
    console.log(this.peticionesSeleccionadas);
  }

  getMateriales(solicitud){
    solicitud.detSolicitudMaterial.map( (material: MaterialParaSolicitud) =>{
      if(material.cantidadSolictada > 0){
        this.materialesSeleccionados.push(material);
      }
    });
  }

  getPeticionesMaquinaria(solicitud){
    solicitud.detSolicitudMaquinriaEquipo.map( peticion => {
      this.peticionesMaquinariaSeleccionadas.push(peticion);
    });
  }

}
