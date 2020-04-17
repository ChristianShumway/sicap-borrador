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
  detallesOrdenTrabajoRecursos: any[] = [];
  materialesSeleccionados: MaterialParaSolicitud[] = [];
  detallesOrdenTrabajoMateriales: any[];
  detallesOrdenTrabajoVehiculos: any[];
  imgEmpresa: string;

  constructor(
    public dialogRef: MatDialogRef<ModalAutorizarOrdenTrabajoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private solicitudesService: SolicitudesService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
    this.getOrdenTrabajo();
  }

  getOrdenTrabajo() {
    this.solicitudesService.getOrdenTrabajoById(this.data.idTipoSolicitud, this.data.idOrdenTrabajo).subscribe(
      ordenTrabajo => {
        console.log(ordenTrabajo);
        this.ordenTrabajo = ordenTrabajo;
        this.imgEmpresa = `http://${this.host}/${this.rutaImg}/files/${ordenTrabajo.solicitud.obra.empresa.imagen}`;
        
        if(this.ordenTrabajo.idTipo === 1){
          this.ordenTrabajo.solicitud.detSolicitudRecurso.map( (peticionSolicitud:PeticionSolicitudRecurso) => {
            this.ordenTrabajo.detOrdenTrabajoRecurso.map( peticionOrden => {
              if ( peticionSolicitud.idCategoriaSolicitudRecurso === peticionOrden.idCategoriaSolicitudRecurso) {
                const objetoPeticionCompuesto = {
                  categoria: peticionOrden.categoriaSolicitudRecurso.descripcion,
                  desglose: peticionSolicitud.desglose,
                  importeSolicitadoSinFactura: peticionSolicitud.importeSolicitadoSinFactura,
                  importeValidadoSinFactura: peticionOrden.importeSolicitadoSinFactura,
                  importeSolicitadoConFactura: peticionSolicitud.importeSolicitadoConFactura,
                  importeValidadoConFactura: peticionOrden.importeSolicitadoConFactura,
                  comentarioSolicitud: peticionSolicitud.comentario,
                  comentarioRevision: peticionOrden.comentario,
                };
                this.detallesOrdenTrabajoRecursos.push(objetoPeticionCompuesto);
              }
            })
          })
        } else if(this.ordenTrabajo.idTipo === 2){
          this.detallesOrdenTrabajoMateriales = this.ordenTrabajo.detOrdentrabajoMaterial;
        } else if( this.ordenTrabajo.idTipo === 3) {
          this.detallesOrdenTrabajoVehiculos = this.ordenTrabajo.detOrdenTrabajoMaquinariaEquipo;
        }      
        
      },
      error => console.log (error)
    );
  }

}
