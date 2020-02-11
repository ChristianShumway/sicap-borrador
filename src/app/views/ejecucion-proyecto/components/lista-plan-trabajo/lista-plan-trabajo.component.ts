import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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
import { ObraService } from '../../../../shared/services/obra.service';
import { Obra } from '../../../../shared/models/obra';
import { ConceptoPlanTrabajo } from '../../../../shared/models/concepto-plan-trabajo';

@Component({
  selector: 'app-lista-plan-trabajo',
  templateUrl: './lista-plan-trabajo.component.html',
  styleUrls: ['./lista-plan-trabajo.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ListaPlanTrabajoComponent implements OnInit {
  private obraObs$: Observable<Obra>;
  rutaImg: string;
  host: string;
  fechaActual = new Date();
  pipe = new DatePipe('en-US');
  
  idUserLogeado;
  accesoBitacora = false;
  workPlans: PlanTrabajo[] = [];
  workPlansTemp: PlanTrabajo[] = [];
  idObra;
  conceptosSeleccionados: ConceptoPlanTrabajo[] = [];
  panelOpenState = false;
  montoImporteConceptosSeleccionados: number = 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<PlanTrabajo> = new MatTableDataSource<PlanTrabajo>();

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private planTrabajoService: PlanTrabajoService,
    private obraService: ObraService,
    private router: Router
  ) { }

  ngOnInit() {
    this.idUserLogeado = this.autenticacionService.currentUserValue;
    this.getObra();
    //paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
  }

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      console.log(data);
      this.idObra = data.id;

      this.obraService.getObraObservable(this.idObra);
        this.obraObs$ = this.obraService.getDataObra();
        
        this.obraService.getDataObra().subscribe((data:Obra) => {
          if (data !== null) {
            console.log(data);
            this.validateAccessObra(data.supervisor, data.idGerente, data.idPlaneacionPresupuesto, data.idControlObra, data.idCompras);
          }
        });
    });
  }

  validateAccessObra(supervisores, idGerente, idPP, idControlObra, idCompras) {
    let idUsuariosConPermiso = [];
    console.log(supervisores);
    supervisores.map(supervisor => {
      idUsuariosConPermiso.push(supervisor.idUsuario);
    });
    idUsuariosConPermiso.push(idGerente);
    idUsuariosConPermiso.push(idPP);
    idUsuariosConPermiso.push(idControlObra);
    idUsuariosConPermiso.push(idCompras);
    console.log(idUsuariosConPermiso);
    const idExistente = idUsuariosConPermiso.find(id => id === this.idUserLogeado);
    console.log(idExistente);
    // debugger;
    if (!idExistente) {
      this.router.navigate(['/dashboard']);
      this.useAlerts('No tienes acceso a generar plan de trabajo de esta obra', ' ', 'error-dialog');
    } else {
      this.getWorkPlans();
    }
  }

  getWorkPlans(){
    this.planTrabajoService.getWorkPlanByObra(this.idObra).subscribe(
      (list: PlanTrabajo[]) => {
        this.workPlans = list;
        this.workPlansTemp =  this.workPlans;
        this.dataSource.data = this.workPlans;
        // console.log(this.workPlans);
        
        list.map( (plan: PlanTrabajo) => {
          plan.viewConceptWorkPlan.map( (concepto: ConceptoPlanTrabajo) => {
            if(concepto.cantidadPlaneada > 0)
            this.conceptosSeleccionados.push(concepto);
            this.montoImporteConceptosSeleccionados =  this.montoImporteConceptosSeleccionados + concepto.importePlaneado;
          });
        });
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
