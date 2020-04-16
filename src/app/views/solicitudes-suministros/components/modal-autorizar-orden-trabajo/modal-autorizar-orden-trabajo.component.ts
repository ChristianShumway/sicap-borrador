import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { MaterialParaSolicitud, PeticionSolicitudRecurso } from './../../../../shared/models/solicitud';
import { SolicitudesService } from './../../../../shared/services/solicitudes.service';

@Component({
  selector: 'app-modal-autorizar-orden-trabajo',
  templateUrl: './modal-autorizar-orden-trabajo.component.html',
  styleUrls: ['./modal-autorizar-orden-trabajo.component.scss']
})
export class ModalAutorizarOrdenTrabajoComponent implements OnInit {

  rutaImg: string;
  host: string;
  ordenTrabajo: any;
  peticionesSeleccionadas: PeticionSolicitudRecurso[];
  detallesOrdenTrabajoRecursos: any[];
  materialesSeleccionados: MaterialParaSolicitud[] = [];
  constructor(
    public dialogRef: MatDialogRef<ModalAutorizarOrdenTrabajoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private solicitudesService: SolicitudesService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // console.log(this.data);
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
    this.getOrdenTrabajo();
    // if(this.data.idTipo===1){
    //   this.getPeticiones();
    // } else if(this.data.idTipo===2){
    //   this.getMateriales();
    // }
  }

  getOrdenTrabajo() {
    this.solicitudesService.getOrdenTrabajoById(this.data.idTipoSolicitud, this.data.idOrdenTrabajo).subscribe(
      ordenTrabajo => {
        console.log(ordenTrabajo);
        this.ordenTrabajo = ordenTrabajo;
        if(this.ordenTrabajo.solicitud.serieFolio === 'REC'){
          this.peticionesSeleccionadas = this.ordenTrabajo.solicitud.detSolicitudRecurso;
          this.detallesOrdenTrabajoRecursos = this.ordenTrabajo.detOrdenTrabajoRecurso;
        }

        console.log(this.peticionesSeleccionadas);
      },
      error => console.log (error)
    );
  }

  getPeticiones(){
    this.data.solicitud.detSolicitudRecurso.map( (peticion: PeticionSolicitudRecurso) =>{
        this.peticionesSeleccionadas.push(peticion);
    });
  }

  getMateriales(){
    this.data.solicitud.detSolicitudMaterial.map( (material: MaterialParaSolicitud) =>{
      if(material.cantidadSolictada > 0){
        this.materialesSeleccionados.push(material);
      }
    });
  }

}
