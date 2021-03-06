import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { ReporteSubcontratoService } from '../../../../shared/services/reporte-subcontrato.service';
import { ObraService } from '../../../../shared/services/obra.service';

import { ReporteSubcontrato } from './../../../../shared/models/reporte-subcontrato';
import { Obra } from '../../../../shared/models/obra';
import { ConceptoSubcontrato } from './../../../../shared/models/concepto-subcontrato';

import { environment } from './../../../../../environments/environment';
import { ModalEliminarComponent } from './../modal-eliminar/modal-eliminar.component';

import { NavigationService } from './../../../../shared/services/navigation.service';
import { UsuariosService } from './../../../../shared/services/usuarios.service';
import { Usuario } from './../../../../shared/models/usuario';

@Component({
  selector: 'app-lista-reporte-subcontratos',
  templateUrl: './lista-reporte-subcontratos.component.html',
  styleUrls: ['./lista-reporte-subcontratos.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ListaReporteSubcontratosComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  rutaImg: string;
  host: string;
  fechaActual = new Date();
  pipe = new DatePipe('en-US');
  
  idUserLogeado;
  accesoBitacora = false;
  reporte: ReporteSubcontrato[] = [];
  reporteTemp: ReporteSubcontrato[] = [];
  obra: Obra;
  idObra;
  panelOpenState = false;
  montoTotal: number = 0;
  total:any[] = [];
  permisoAcceso: boolean = false;
  totalObra: number;
  reporteExistente = true;
  totalAcumumladoReportes: number;

  nombreComponente = 'reporte-subcontratos';
  permisosEspeciales: any[] = []; //array de objetos que contiene todos los permisos especiales del proyecto
  permisosEspecialesComponente: any[] = []; //array en el que se agregan los objetos que contiene el nombre del componente
  permisosEspecialesPermitidos: any[] = []; //array donde se agrega el nombre de las opciones a las cuales el usuario si tiene permiso

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<ReporteSubcontrato> = new MatTableDataSource<ReporteSubcontrato>();

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private reporteSubcontratoService: ReporteSubcontratoService,
    private obraService: ObraService,
    private router: Router,
    private navigationService: NavigationService,
    private usuariosService: UsuariosService
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
    this.getDataUser();
  }

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = data.idObra;

      this.obraService.getObraObservable(this.idObra);
      this.obraObs$ = this.obraService.getDataObra();

      this.obraService.getObra(this.idObra).subscribe(
        (obra: Obra) => this.obra = obra,
        error => console.log(error)
      );
        
      this.obraService.getDataObra().subscribe((data: Obra) => {
        // console.log(data);
        if (data !== null) {
          this.validateAccessObra(data.supervisor, data.idGerente, data.idPlaneacionPresupuesto, data.idControlObra, data.idCompras);
        }
      });
    });
  }

  validateAccessObra(supervisores, idGerente, idPP, idControlObra, idCompras) {
    // console.log(supervisores);
    let idUsuariosConPermiso = [];
    supervisores.map(supervisor => {
      idUsuariosConPermiso.push(supervisor.idUsuario);
    });
    idUsuariosConPermiso.push(idGerente);
    idUsuariosConPermiso.push(idPP);
    idUsuariosConPermiso.push(idControlObra);
    idUsuariosConPermiso.push(idCompras);
    // console.log(idUsuariosConPermiso);
    const idExistente = idUsuariosConPermiso.find(id => id === this.idUserLogeado);
    // console.log(idExistente);
    if (!idExistente) {
      // this.router.navigate(['/dashboard']);
      // this.useAlerts('No tienes acceso a ver lista de reportes para esta obra', ' ', 'error-dialog');
      this.permisoAcceso = false;
      console.log(this.permisoAcceso);
    } else {
      // this.getReporte();
      this.permisoAcceso = true;
      console.log(this.permisoAcceso);
    }
  }

  getReporte(){
    this.reporteSubcontratoService.getReportSubContractdByObra(this.idObra).subscribe(
      (reportes: ReporteSubcontrato[]) => {
        if(reportes.length > 0) {
          this.reporte = reportes;
          this.getTotalShow(this.reporte);
          this.reporteTemp =  this.reporte;
          this.dataSource.data = this.reporte;
          console.log(reportes);
  
          reportes.map( reporte => {
            // console.log(reporte);
            this.totalObra = reporte.totalObra
            const total = reporte.viewReportSubContract.reduce((acc,obj) => acc + (obj.importeSubContrato),0);
            const art = {
              idReporte: reporte.idReporteSubContrato, 
              totalMateriales: total,
              totalObra: reporte.totalObra
            };
            this.total.push(art); 
          });
          // console.log(this.totalObra);         
        } else {
          this.reporteExistente = false;
        }
      }
    );
  }

  getTotalShow(reportes){
    let totalAcum = 0;
    reportes.map( reporte => {
      // console.log(reporte);
      reporte.viewReportSubContract.map( concepto => {
        if (concepto.importeSubContrato !== 0) {
          // console.log(concepto.importeSubContrato);
          totalAcum += concepto.importeSubContrato;
          // console.log(totalAcum);
        }
      });
    });
    console.log(totalAcum);
    this.totalAcumumladoReportes = totalAcum;
  }

  getDataUser(){
    this.usuariosService.getUsuario(this.idUserLogeado).subscribe(
      (usuario: Usuario) => this.validateEspecialPermissions(usuario.idPerfil),
      error => console.log(error)
    );
  }

  validateEspecialPermissions(idPerfil){
    this.permisosEspeciales = environment.permisosEspeciales;

    this.permisosEspeciales.map ( permiso => {
      if( permiso.component === this.nombreComponente){
        this.permisosEspecialesComponente.push(permiso);
      }
    });

    // console.log(this.permisosEspecialesComponente);

    this.permisosEspecialesComponente.map( permisoExistente => {
      this.navigationService.validatePermissions(idPerfil, permisoExistente.idOpcion).subscribe(
        (result:any) => {
          // console.log(result);
          if(result.estatus === '05'){
            this.permisosEspecialesPermitidos.push(permisoExistente.tooltip);
          }
        },
        error => console.log(error)
      );
    });

    console.log(this.permisosEspecialesPermitidos);
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

    // console.log(rows);

    this.dataSource.data = rows;
    // console.log(this.dataSource.data);
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

        this.reporteSubcontratoService.deleteReportSubcontract(plan).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getReporte();
              this.montoTotal = 0;
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

  onMontosTotal(monto){
    setTimeout(() => { 
      this.montoTotal+= monto;
    },0);
    console.log(this.montoTotal);
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
