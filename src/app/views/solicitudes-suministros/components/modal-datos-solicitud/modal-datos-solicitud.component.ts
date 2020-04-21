import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { MaterialParaSolicitud, PeticionSolicitudRecurso } from './../../../../shared/models/solicitud';
@Component({
  selector: 'app-modal-datos-solicitud',
  templateUrl: './modal-datos-solicitud.component.html',
  styleUrls: ['./modal-datos-solicitud.component.scss']
})
export class ModalDatosSolicitudComponent implements OnInit {

  rutaImg: string;
  host: string;
  peticionesSeleccionadas: PeticionSolicitudRecurso[] = [];
  materialesSeleccionados: MaterialParaSolicitud[] = [];
  imgEmpresa: string;

  constructor(
    public dialogRef: MatDialogRef<ModalDatosSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
    this.imgEmpresa = `http://${this.host}/${this.rutaImg}/files/${this.data.solicitud.obra.empresa.imagen}`;
    if(this.data.idTipo===1){
      this.getPeticiones();
    } else if(this.data.idTipo===2){
      this.getMateriales();
    }
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
