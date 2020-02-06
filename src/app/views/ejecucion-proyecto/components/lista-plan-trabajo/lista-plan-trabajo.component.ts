import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from './../../../../../environments/environment';
import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { DatePipe } from '@angular/common';
import { PlanTrabajoService } from '../../../../shared/services/plan-trabajo.service';
import { PlanTrabajo } from './../../../../shared/models/plan-trabajo';
import { ModalEliminarComponent } from './../modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-lista-plan-trabajo',
  templateUrl: './lista-plan-trabajo.component.html',
  styleUrls: ['./lista-plan-trabajo.component.scss']
})
export class ListaPlanTrabajoComponent implements OnInit {
  rutaImg: string;
  host: string;
  fechaActual = new Date();
  pipe = new DatePipe('en-US');
  
  idUserLogeado;
  accesoBitacora = false;
  workPlans: PlanTrabajo[] = [];
  workPlansTemp: PlanTrabajo[] = [];
  idObra;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<PlanTrabajo> = new MatTableDataSource<PlanTrabajo>();

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private planTrabajoService: PlanTrabajoService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      console.log(data);
      this.idObra = data.id;
      this.getWorkPlans();
   });
    this.idUserLogeado = this.autenticacionService.currentUserValue;
    //paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
  }

  getWorkPlans(){
    this.planTrabajoService.getWorkPlanByObra(this.idObra).subscribe(
      (list: PlanTrabajo[]) => {
        this.workPlans = list;
        this.workPlansTemp =  this.workPlans;
        // this.obrasTemp = this.obras;
        this.dataSource.data = this.workPlans;
        console.log(this.workPlans);
      }
    );
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.workPlansTemp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.workPlansTemp.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    })

    console.log(rows);

    this.dataSource.data = rows;
    console.log(this.dataSource.data);
  }


  openDialoAlertDelete(plan) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: plan
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(plan);
        
        // const obraBaja = {
        //   idObra: idObra,
        //   activo: 0,
        //   // usuarioModifico: this.idUsuarioLogeado
        // };
        // console.log(obraBaja);

        this.planTrabajoService.deleteWorkPlan(plan).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getWorkPlans();
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



  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
