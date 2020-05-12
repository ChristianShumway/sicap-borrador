import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Obra } from '../../../../shared/models/obra';
import {MatDialog} from '@angular/material/dialog';
import { ModificarMontoProgramadoComponent } from '../modificar-monto-programado/modificar-monto-programado.component';
import { ObraService } from './../../../../shared/services/obra.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MontoProgramado } from './../../../../shared/models/monto-programado';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-montos-programados',
  templateUrl: './montos-programados.component.html',
  styleUrls: ['./montos-programados.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MontosProgramadosComponent implements OnInit {

  @Input() obra: Obra;
  idUsuarioLogeado;
  panelOpenState: boolean = false;
  montoForm: FormGroup;
  private montosObs$ : Observable<MontoProgramado>;
  fechaInicio;
  fechaFin;
  pipe = new DatePipe('en-US');
  error:any={isError:false,errorMessage:''};
  tipoPresupuestos: any[] = [];
  tipoDuracion: any[] = [];
  
  constructor(
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private obraService: ObraService,
    public dialog: MatDialog,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getCatalogoP();
    this.getValidations();
    this.getMontos();
    this.fechaInicio = new Date(this.montoForm.controls['fechaInicial'].value);
    this.fechaFin = new Date(this.montoForm.controls['fechaFinal'].value);
    this.fechaInicio.setDate(this.fechaInicio.getDate());
    this.fechaFin.setDate(this.fechaFin.getDate());
  }

  getValidations() {
    this.montoForm = new FormGroup({
      idTipoPresupuesto: new FormControl('', Validators.required),
      idTipoDuracion: new FormControl('', Validators.required),
      monto: new FormControl('', Validators.required),
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
    this.obraService.getMontosObraObservable(this.obra.idObra);
    this.montosObs$ = this.obraService.getDataMontosObra();
  }

  getCatalogoP(){
    this.obraService.getPresupuestosParaMontosObra().subscribe(
      presupuestos => this.tipoPresupuestos = presupuestos,
      error => console.log(error)
    );

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
      const monto: MontoProgramado = {
        ...this.montoForm.value,
        idUsuarioCreo: this.idUsuarioLogeado,
        idUsuarioModifico: this.idUsuarioLogeado,
        fechaInicial: nuevaFechaInicio,
        fechaFinal: nuevaFechaFin,
        idObra: this.obra.idObra
      };
      console.log(monto);
      this.obraService.createUpdateMontoObra(monto).subscribe(
        response => {
          console.log(response);
          if(response.estatus === '05'){
            this.obraService.getMontosObraObservable(this.obra.idObra);
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

  abrirModificarMonto(monto): void {
    let sheet = this.bottomSheet.open(ModificarMontoProgramadoComponent, {
    data: {
      monto: monto,
      idUsuarioLogeado: this.idUsuarioLogeado,
      idObra: this.obra.idObra
    }
    });

    sheet.backdropClick().subscribe( () => {
      console.log('clicked'+this.obra.idObra);
    });  
  }


  abrirEliminarMonto(monto) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: monto
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(monto);
        // const monto = {
        //   ...monto,

        // }
        this.obraService.deleteMontoObra(monto).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.obraService.getMontosObraObservable(this.obra.idObra);
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
