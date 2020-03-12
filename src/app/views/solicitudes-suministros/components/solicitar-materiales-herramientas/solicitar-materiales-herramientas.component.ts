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
import { SolicitudMaterial, MaterialParaSolicitud } from './../../.././../shared/models/solicitud';
import { Usuario } from '../../../../shared/models/usuario';

@Component({
  selector: 'app-solicitar-materiales-herramientas',
  templateUrl: './solicitar-materiales-herramientas.component.html',
  styleUrls: ['./solicitar-materiales-herramientas.component.scss']
})
export class SolicitarMaterialesHerramientasComponent implements OnInit {

  idUsuarioLogeado: any;
  idObra: number;
  obra: Obra;
  empresas: Empresa[];
  solicitudForm: FormGroup;
  listaMaterial: MaterialParaSolicitud[] = [];
  listaTemp: MaterialParaSolicitud[];
  fechaHoy = new Date();
  fechaRequiere;
  pipe = new DatePipe('en-US');

  nombreComponente = 'solicitudes-suministros-obras';
  tooltip = 'solicitud-materiales';
  opcionesPermitidas = true;

  constructor(
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private obraService: ObraService,
    private snackBar: MatSnackBar,
    private empresasService: EmpresasService,
    private navigationService: NavigationService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params: Params) => this.idObra = params.idObra);
    this.validateAccessValidation();
    this.listaMaterial = [
      {
        noMaterial: 1,
        conceptos: 'esto esta chido',
        unidad: 'pza',
        cantidad: 8,
        comentarios: 'esto es un simulacro'
      },
      {
        noMaterial: 2,
        conceptos: 'esto no esta chido',
        unidad: 'pza',
        cantidad: 12,
        comentarios: 'esto es un simulacro 2'
      }
    ];
    this.listaTemp = this.listaMaterial;
  }

  validateAccessValidation() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    const moduloActual = environment.permisosEspeciales.find( modulo => modulo.component === this.nombreComponente && modulo.tooltip === this.tooltip);
    const idModulo = moduloActual.idOpcion;
    console.log(idModulo);

    this.usuariosService.getUsuario(this.idUsuarioLogeado).subscribe(
      (usuario: Usuario) => {
        this.navigationService.validatePermissions(usuario.idPerfil, idModulo).subscribe(
          (result:any) => {
            if ( result.estatus !== '05'){
              this.opcionesPermitidas = false;
            }  else {
              this.opcionesPermitidas = true;
              this.getObra();
            } 
          },
          error => this.useAlerts( error.message, ' ', 'error-dialog')
        );
      },
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }
  
  getObra(){
    this.obraService.getObra(this.idObra).subscribe( 
      (obra: Obra) => {
        if(obra){
          this.obra = obra;
          this.getValidations();
          this.getCatalogos();
          this.fechaRequiere = new Date(this.solicitudForm.controls['fechaRequiere'].value);
          this.fechaRequiere.setDate(this.fechaRequiere.getDate());
        }
      },
      error => this.useAlerts( error.message, ' ', 'error-dialog')
    );
  }

  getValidations(){
    this.solicitudForm = new FormGroup({
      idEmpresa: new FormControl('', Validators.required),
      fechaRequiere: new FormControl(new Date(), Validators.required),
      lugar: new FormControl('', Validators.required),
      idUsuarioAdministracion: new FormControl(''),
      idJefeInmediato: new FormControl('')
    });
  }

  getCatalogos() {
    this.empresasService.getAllEmpresas().subscribe(
      (empresas: Empresa[]) => this.empresas = empresas.filter( empresa => empresa.activo === 1),
      error => console.log(error)
    );
  }

  public onFechaRequiereMaterial(event): void {
    this.fechaRequiere = event.value;
  }

  crearSolicitud(){
    if (this.solicitudForm.valid){
      const format = 'yyyy/MM/dd';
      const hoy = this.pipe.transform(this.fechaHoy, format);
      const fechaRequiereMaterial = this.pipe.transform(this.fechaRequiere, format);
      
      const solicitud: SolicitudMaterial = {
        ...this.solicitudForm.value,
        fechaSolicitud: hoy,
        fechaRequiere: fechaRequiereMaterial,
        idUsuarioSolicito: this.idUsuarioLogeado,
        idObra: this.idObra,
        material: this.listaMaterial
      };

      console.log(solicitud);   
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.listaTemp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.listaTemp.filter(function(d) {
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

    this.listaMaterial = rows;
  }

  useAlerts(message, action, className, time=4000) {
    this.snackBar.open(message, action, {
      duration: time,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
