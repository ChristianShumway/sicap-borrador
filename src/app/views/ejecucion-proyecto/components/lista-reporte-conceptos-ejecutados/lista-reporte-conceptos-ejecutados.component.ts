import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { ReporteConceptosEjecutadosService } from '../../../../shared/services/reporte-conceptos-ejecutados.service';
import { ObraService } from '../../../../shared/services/obra.service';

import { ReporteConceptosEjecutados } from './../../../../shared/models/reporte-conceptos-ejecutados';
import { Obra } from '../../../../shared/models/obra';

import { environment } from './../../../../../environments/environment';
import { ModalEliminarComponent } from './../modal-eliminar/modal-eliminar.component';
import { ConceptoEjecutado } from './../../../../shared/models/concepto-ejecutado';

@Component({
  selector: 'app-lista-reporte-conceptos-ejecutados',
  templateUrl: './lista-reporte-conceptos-ejecutados.component.html',
  styleUrls: ['./lista-reporte-conceptos-ejecutados.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ListaReporteConceptosEjecutadosComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  rutaImg: string;
  host: string;
  fechaActual = new Date();
  pipe = new DatePipe('en-US');
  
  idUserLogeado;
  accesoBitacora = false;
  reporte: ReporteConceptosEjecutados[] = [];
  reporteTemp: ReporteConceptosEjecutados[] = [];
  idObra;
  conceptosSeleccionados: ConceptoEjecutado[] = [];
  panelOpenState = false;
  montoImporteConceptosSeleccionados: number = 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<ReporteConceptosEjecutados> = new MatTableDataSource<ReporteConceptosEjecutados>();

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private reporteConceptosEjecutadosService: ReporteConceptosEjecutadosService,
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
    this.getReporte();
  }

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      console.log(data);
      this.idObra = data.id;

      this.obraService.getObraObservable(this.idObra);
        this.obraObs$ = this.obraService.getDataObra();
        
        this.obraService.getDataObra().subscribe((data: Obra) => {
          console.log(data);
          if (data !== null) {
            this.validateAccessObra(data.supervisor, data.idGerente, data.idPlaneacionPresupuesto, data.idControlObra, data.idCompras);
          }
        });
    });
  }

  validateAccessObra(supervisores, idGerente, idPP, idControlObra, idCompras) {
    console.log(supervisores);
    let idUsuariosConPermiso = [];
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
      this.useAlerts('No tienes acceso a generar reporte para esta obra', ' ', 'error-dialog');
    } else {
      // this.getReporte();
    }
  }

  getReporte(){
    this.reporteConceptosEjecutadosService.getConceptExecutedByObra(this.idObra).subscribe(
      (list: ReporteConceptosEjecutados[]) => {
        this.reporte = list;
        this.reporteTemp =  this.reporte;
        this.dataSource.data = this.reporte;
        console.log(this.reporte);

        list.map( (reporte: ReporteConceptosEjecutados) => {
          reporte.viewConceptExecuted.map( (concepto: ConceptoEjecutado) => {
            if(concepto.cantidadEjecutada > 0)
            this.conceptosSeleccionados.push(concepto);
            this.montoImporteConceptosSeleccionados =  this.montoImporteConceptosSeleccionados + concepto.importeEjecutado;
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
    var columns = Object.keys(this.reporteTemp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.reporteTemp.filter(function (d) {
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

        this.reporteConceptosEjecutadosService.deleteReportConceptExecuted(plan).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getReporte();
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
