import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Obra } from '../../../../shared/models/obra';
import {MatDialog} from '@angular/material/dialog';
import { ObraService } from './../../../../shared/services/obra.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LineaBase } from './../../../../shared/models/linea-base';
import { DatePipe } from '@angular/common';
import { ModificarLineaBaseComponent } from '../modificar-linea-base/modificar-linea-base.component';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-linea-base',
  templateUrl: './linea-base.component.html',
  styleUrls: ['./linea-base.component.scss']
})
export class LineaBaseComponent implements OnInit {

  @Input() obra: Obra;
  idUsuarioLogeado;
  panelOpenState: boolean = false;
  montoForm: FormGroup;
  // private periodosObs$ : Observable<LineaBase>;
  fechaInicio;
  fechaFin;
  pipe = new DatePipe('en-US');
  error:any={isError:false,errorMessage:''};
  tipoDuracion: any[] = [];
  tipoLineaBase: any[];
  registrosLineaBase: any[] = [];
  obraLoad: Obra;
  idObra;
  
  constructor(
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private obraService: ObraService,
    public dialog: MatDialog,
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getCatalogoP();
    this.getValidations();
    // this.getMontos();
    this.getObra();
    this.fechaInicio = new Date(this.montoForm.controls['fechaInicial'].value);
    this.fechaFin = new Date(this.montoForm.controls['fechaFinal'].value);
    this.fechaInicio.setDate(this.fechaInicio.getDate());
    this.fechaFin.setDate(this.fechaFin.getDate());
  }
  
  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = data.id;
      // console.log(this.idObra);
      this.getPorcentajesLineaBase();
      this.obraService.getObra(this.idObra).subscribe(
        (obra:Obra) => this.obraLoad = obra,
        error => console.log(error)
      );
    })
  }

  getValidations() {
    this.montoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      idTipoDuracion: new FormControl('', Validators.required),
      porcentaje: new FormControl('', Validators.required),
      fechaInicial: new FormControl(new Date(), Validators.required),
      fechaFinal: new FormControl(new Date(), Validators.required),
    })
  }

  public onFechaInicio(event): void {
    this.fechaInicio = event.value;
    this.compareTwoDates();
  }

  public onFechaFin(event): void {
    this.fechaFin = event.value;
    this.compareTwoDates();
  }

  compareTwoDates(){
    const controlFechaInicio = new Date(this.montoForm.controls['fechaInicial'].value);
    const controlFechaFin = new Date(this.montoForm.controls['fechaFinal'].value);

    if( controlFechaFin < controlFechaInicio){
      this.useAlerts('Fecha inicio periodo no puede ser mayor a la fecha final', ' ', 'warning-dialog');
      this.montoForm.controls['fechaInicial'].setValue('');
    } 
  }

  getMontos(){
    this.obraService.getLineaBaseObservable(this.idObra);
    // this.periodosObs$ = this.obraService.getDataLineaBase();
  }

  getPorcentajesLineaBase(){
    this.tipoLineaBase = [];
    this.registrosLineaBase = [];
    this.obraService.getPorcentajesLineaBase(this.idObra).subscribe(
      result => {
        // console.log(result);
        Object.keys(result).forEach ( tipo => {
          var registros = result[tipo];
          console.log(tipo);
          console.log(registros);
          this.tipoLineaBase.push(tipo);
          registros.map( registro => this.registrosLineaBase.push(registro));
        });
        // console.log(this.tipoLineaBase);
        // console.log(this.registrosLineaBase);
      },
      error => console.log(error)
    );
  }

  getCatalogoP(){
    this.obraService.getTiposDuracion().subscribe(
      tipoDuracion => this.tipoDuracion = tipoDuracion,
      error => console.log(error)
    );
  }

  addMonto(){
    if(this.montoForm.valid){
      const format = 'yyyy/MM/dd';
      const nuevaFechaInicio = this.pipe.transform(this.fechaInicio, format);
      const nuevaFechaFin = this.pipe.transform(this.fechaFin, format);
      const periodo: LineaBase = {
        ...this.montoForm.value,
        idUsuarioCreo: this.idUsuarioLogeado,
        idUsuarioModifico: this.idUsuarioLogeado,
        fechaInicial: nuevaFechaInicio,
        fechaFinal: nuevaFechaFin,
        idObra: this.idObra
      };

      console.log(periodo);

      this.obraService.createUpdateLineaBaseObra(periodo).subscribe(
        response => {
          console.log(response);
          if(response.estatus === '05'){
            // this.obraService.getLineaBaseObservable(this.idObra);
            this.getPorcentajesLineaBase();
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.panelOpenState = !this.panelOpenState;
            this.montoForm.reset();
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog'); 
          }
        },
        error => this.useAlerts(error.message, ' ', 'error-dialog')
      );
    }
  }

  abrirModificarMonto(periodo): void {
    let sheet = this.bottomSheet.open(ModificarLineaBaseComponent, {
    data: {
      periodo: periodo,
      idUsuarioLogeado: this.idUsuarioLogeado,
      idObra: this.idObra
    }
    });

    sheet.afterDismissed().subscribe( result => {
      // console.log('clicked'+this.idObra);
      if(result){
        console.log(result);
        this.obraService.createUpdateLineaBaseObra(result).subscribe(
          response => {
            console.log(response);
            if(response.estatus === '05'){
              this.getPorcentajesLineaBase();
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog'); 
            }
          },
          error => this.useAlerts(error.message, ' ', 'success-dialog')
        );
      }

    });  
  }


  abrirEliminarMonto(periodo) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: periodo
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(periodo);
      
        this.obraService.deleteLineaBaseObra(periodo).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              // this.obraService.getLineaBaseObservable(this.idObra);
              this.getPorcentajesLineaBase();
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }
          },
            error => {
            this.useAlerts(error.message, ' ', 'error-dialog');
            console.log(error);
          }
        );
      }
    });
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
