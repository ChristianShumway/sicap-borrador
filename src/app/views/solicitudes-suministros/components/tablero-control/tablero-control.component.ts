import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { environment } from './../../../../../environments/environment';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { ObraService } from '../../../../shared/services/obra.service';
import { EmpresasService } from '../../../../shared/services/empresas.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { SolicitudesService } from './../../../../shared/services/solicitudes.service';

import { Obra } from './../../../../shared/models/obra';
import { Empresa } from '../../../../shared/models/empresa';
import { SolicitudMaterial, MaterialParaSolicitud, TableroControl } from './../../.././../shared/models/solicitud';
import { Usuario } from '../../../../shared/models/usuario';

@Component({
  selector: 'app-tablero-control',
  templateUrl: './tablero-control.component.html',
  styleUrls: ['./tablero-control.component.scss']
})
export class TableroControlComponent implements OnInit {

  listaSolicitudes: TableroControl[];
  solicitudesModif: any[] = [];
  temp: any[]

  constructor(
    private solicitudesService: SolicitudesService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getSolicitudes();
  }

  getSolicitudes() {
    this.solicitudesService.getLogRequest().subscribe(
      (list: TableroControl[]) => {
        this.listaSolicitudes = list;
        this.temp = this.listaSolicitudes;
        console.log(list);
        list.map( solicitud => {
          const solicidudModificada = {
            folio: solicitud.solicitud.folio,
            descripcion: solicitud.solicitud.descripcion,
            empresa: solicitud.solicitud.obra.empresa.nombre,
            contrato: solicitud.solicitud.obra.noContrato,
            solicitante: `${solicitud.usuarioSolicito.nombre} ${solicitud.usuarioSolicito.apellidoPaterno} ${solicitud.usuarioSolicito.apellidoMaterno}`,
            estatus: solicitud.estatus,
            fechaSolicitud: solicitud.fechaSolicitud,
            fechaValidacion: solicitud.fechaValidacion,
            fechaOrdenTrabajo: solicitud.fechaOrdenTrabajo,
            fechaAutorizacionSuministro: solicitud.fechaAutorizacionSuministro,
            fechaSuministro: solicitud.fechaSuministro,
            fechaRechazo: solicitud.fechaRechazo
          };

          this.solicitudesModif.push(solicidudModificada);
        });
        this.temp = this.solicitudesModif;
        // console.log(this.solicitudesModif);
      }, 
      error => console.log(error) 
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.temp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    if(!rows.length){
      this.useAlerts('No se encontraron conceptos con esta referencia', ' ', 'error-dialog', 500);
    } else {
      this.useAlerts(`Fueron encontrados ${rows.length} conceptos con esta referencia`, ' ', 'success-dialog', 500);
    }

    this.solicitudesModif = rows;
  }

  useAlerts(message, action, className, time = 4000){
    this.snackBar.open(message, action, {
      duration: time,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }


}
