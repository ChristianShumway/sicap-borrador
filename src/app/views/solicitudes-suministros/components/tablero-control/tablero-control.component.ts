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

  listaSolicitudes: TableroControl[] = [];

  constructor() { }

  ngOnInit() {
    this.listaSolicitudes = [
      {
        idSolicitud: 1,
        folio: 'MAT-001',
        descripcion: 'POSTES DE MADERA PARA OBRA',
        //empresa: 'AESA AEREA ELECTRIFICACIONES S.A. DE C.V.',
        //obra: Obra;
        //solicitante: Usuario;
        fechaSolicitud: '3/17/20',
        fechaValidacion: '',
        fechaOrdenTrabajo: '',
        fechaAutorizacionSuministro: '',
      }
    ];
  }

}
