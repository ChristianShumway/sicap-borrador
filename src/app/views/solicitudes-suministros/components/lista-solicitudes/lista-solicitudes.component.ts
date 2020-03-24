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

import { Obra } from './../../../../shared/models/obra';
import { Empresa } from '../../../../shared/models/empresa';
import { SolicitudRecurso, PeticionSolicitudRecurso, SolicitudMaterial } from './../../.././../shared/models/solicitud';
import { Usuario } from '../../../../shared/models/usuario';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.scss']
})
export class ListaSolicitudesComponent implements OnInit {

  idUsuarioLogeado: any;
  solicitudes: any[];
  solicitudesRecursos: SolicitudRecurso[] = [];
  solicitudesMateriales: SolicitudMaterial[] = [];
  solicitudesVehiculos: any[] = [];

  constructor(
    private autenticacionService: AutenticacionService,
    private solicitudesService: SolicitudesService,
    private activatedRoute: ActivatedRoute,
    private obraService: ObraService,
    private snackBar: MatSnackBar,
    private empresasService: EmpresasService,
    private navigationService: NavigationService,
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getResources();
  }

  getResources(){
    this.solicitudesService.getResourcesByUser(this.idUsuarioLogeado).subscribe(
      solicitudes => {
        this.solicitudes = solicitudes;
        console.log(solicitudes);
        solicitudes.map( solicitud => {
          // console.log(solicitud);
          if(solicitud.idTipo === 1){
            this.solicitudesRecursos = solicitud.solicitud;
          } else if (solicitud.idTipo === 2){
            this.solicitudesMateriales = solicitud.solicitud;
          }  else if (solicitud.idTipo === 3){
            this.solicitudesVehiculos = solicitud.solicitud;
          }
        });
        
        console.log(this.solicitudesRecursos);
        console.log(this.solicitudesMateriales);
        console.log(this.solicitudesVehiculos);
      },
      error => console.log(error)
    );
  }



}
