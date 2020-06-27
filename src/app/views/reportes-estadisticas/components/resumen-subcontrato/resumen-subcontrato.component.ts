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
  selector: 'app-resumen-subcontrato',
  templateUrl: './resumen-subcontrato.component.html',
  styleUrls: ['./resumen-subcontrato.component.scss']
})
export class ResumenSubcontratoComponent implements OnInit {

  idObra;
  idUsuarioLogeado;
  obra: Obra
  fecha = new Date();
  fechaInicio;
  fechaFinal;
  rutaSicap: string;
  host: string;
  error:any={isError:false,errorMessage:''};
  pipe = new DatePipe('en-US');
  reporteForm: FormGroup;
  datagral: any[];
  dataSemanas: any[];
  dataPagos: any[];
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
    this.getValidations();
  }

  getObra() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = parseInt(data.idObra);
      console.log(this.idObra);
      this.obraService.getObra(this.idObra).subscribe(
        (obra:Obra) => {
          console.log(obra);
          this.obra = obra;
          let inicioString = obra.fechaInicio;
          this.fechaInicio = new Date(inicioString);
          this.fechaInicio.setDate(this.fechaInicio.getDate()+1);
          this.fechaFinal = new Date();
          this.fechaFinal.setDate(this.fechaFinal.getDate());
          this.reporteForm.patchValue(obra);
          this.rutaSicap = environment.imgRUL;
          this.host = environment.host;
        },
        error => console.log(error)
      );
    })
  }

  getValidations() {
    this.reporteForm = new FormGroup({
      fechaInicio: new FormControl(this.fechaInicio, Validators.required),
      fechaFinal: new FormControl(new Date(), Validators.required),
    })
  }

  public onFechaInicio(event): void {
    this.fechaInicio = event.value;
    this.compareTwoDates();
  }

  public onFechaFinal(event): void {
    this.fechaFinal = event.value;
    this.compareTwoDates();
  }

  compareTwoDates(){
    const controlFechaInicio = new Date(this.reporteForm.controls['fechaInicio'].value);
    const controlFechaFin = new Date(this.reporteForm.controls['fechaFinal'].value);

    if( controlFechaFin < controlFechaInicio){
      this.error={isError:true,errorMessage:'Fecha de busqueda no puede ser menor a la fecha de inicio de la obra'};
      this.reporteForm.controls['fechaFinal'].setValue(new Date());
      this.fechaFinal =  new Date(this.reporteForm.controls['fechaFinal'].value);
    } else {
      this.error={isError:false};
    }
  }

  buscarDatos(){
    if (this.reporteForm.valid){
      this.ver = true;
      const format = 'yyyy-MM-dd';
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicio, format);
      const nuevaFechaFin = this.pipe.transform(this.fechaFinal, format);

      console.log(nuevaFechaInicio);
      console.log(nuevaFechaFin);

      this.reportesEstadisticasService.getResumenSubcontrato(this.idObra, nuevaFechaInicio, nuevaFechaFin).subscribe(
        result => {
          this.datagral = result;
          console.log(result);
          let dataSemana:any;
          let objSemanas:any = [];
          this.dataSemanas = [];
          Object.keys(result).forEach( item => {
            var data = result[item];
            // console.log(item);
            if (item === 'costos') {
              console.log(data);
              Object.keys(data).forEach( itemSemana => {
                var semana = data[itemSemana];
                console.log(semana);
                semana.programacion.map( alcance => {
                  dataSemana = {
                    periodo: semana.periodo,
                    corte: semana.corte,
                    programado: alcance.programado*100,
                    ejecutado: alcance.ejecutado*100,
                    diferencia: alcance.diferencia*100
                  }
                  objSemanas.push(dataSemana);
                  this.dataSemanas = objSemanas;
                });
                console.log(this.dataSemanas);

              })
            }
            if (item === 'pagos') {
              // console.log(data);
              this.dataPagos = data;
            }
          });
        },
        error => console.log(error)
      );
    }
  }

  generarReporte(){
    const format = 'yyyy-MM-dd';
    const nuevaFechaInicio = this.pipe.transform(this.fechaInicio, format);
    const nuevaFechaFin = this.pipe.transform(this.fechaFinal, format);
    this.reportesEstadisticasService.descargarResumenSubcontrato(this.idObra, nuevaFechaInicio, nuevaFechaFin).subscribe(
      response => {
        var blob = new Blob([response], {type: 'application/xlsx'});
        var link=document.createElement('a');
      
        var obj_url = window.URL.createObjectURL(blob);		    
        var link = document.createElement("a");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", obj_url);
        link.setAttribute("download","resumen-subcontrato.xlsx");
          
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
