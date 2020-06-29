import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { ObraService } from '../../../../shared/services/obra.service';
import { ReportesEstadisticasService } from '../../../../shared/services/reportes-estadisticas.service';

import { Obra } from './../../../../shared/models/obra';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-expediente-unico-obra',
  templateUrl: './expediente-unico-obra.component.html',
  styleUrls: ['./expediente-unico-obra.component.scss']
})
export class ExpedienteUnicoObraComponent implements OnInit {

  idObra;
  idUsuarioLogeado;
  obra: Obra
  rutaSicap: string;
  host: string;
  dataExpediente: any[];
  listaFases: any[];
  ver = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    private obraService: ObraService,
    private reportesEstadisticasService: ReportesEstadisticasService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getObra();
  }

  getObra() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = parseInt(data.idObra);
      console.log(this.idObra);
      this.obraService.getObra(this.idObra).subscribe(
        (obra:Obra) => {
          console.log(obra);
          this.obra = obra;
          this.rutaSicap = environment.imgRUL;
          this.host = environment.host;
        },
        error => console.log(error)
      );
    })
  }

  buscarDatos(){
    this.reportesEstadisticasService.getExpedienteUnicoObra(this.idObra).subscribe(
      result => {
        this.ver = true;
        console.log(result);
        this.dataExpediente = result;
        Object.keys(result).forEach ( itemObjeto => {
          if(itemObjeto === 'documentos'){
            this.listaFases = result[itemObjeto];
            // console.log(this.listaFases);
          }
        });
      },
      error => console.log(error)
    )
          
  }

  generarReporte(){
    this.reportesEstadisticasService.descargarExpedienteUnicoObra(this.idObra).subscribe(
      response => {
        var blob = new Blob([response], {type: 'application/xlsx'});
        var link=document.createElement('a');
      
        var obj_url = window.URL.createObjectURL(blob);		    
        var link = document.createElement("a");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", obj_url);
        link.setAttribute("download","expediente-unico-obra.xlsx");
          
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error => {
        console.log(error);
        this.useAlerts(error.message, ' ', 'error-dialog');
      }
    );

  }

  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
