import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { NavigationService } from './../../../../shared/services/navigation.service';
import { UsuariosService } from './../../../../shared/services/usuarios.service';
import { ObraService } from '../../../../shared/services/obra.service';
import { ReporteMaterialService } from '../../../../shared/services/reporte-material.service';

import { ModalEliminarComponent } from './../modal-eliminar/modal-eliminar.component';
import { environment } from './../../../../../environments/environment';

import { Usuario } from './../../../../shared/models/usuario';
import { Obra } from '../../../../shared/models/obra';
import { ReporteMaterial } from './../../../../shared/models/reporte-material';
import { ConceptoMaterial } from './../../../../shared/models/concepto-material';


@Component({
  selector: 'app-lista-reporte-materiales',
  templateUrl: './lista-reporte-materiales.component.html',
  styleUrls: ['./lista-reporte-materiales.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ListaReporteMaterialesComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  rutaImg: string;
  host: string;
  fechaActual = new Date();
  pipe = new DatePipe('en-US');
  
  idUserLogeado;
  accesoBitacora = false;
  reports: ReporteMaterial[] = [];
  reportsTemp: ReporteMaterial[] = [];
  idObra;
  panelOpenState = false;
  montoTotal: number = 0;
  total:any[] = [];
  permisoAcceso: boolean = false;
  totalMonto: number;
  reporteExistente = true;

  nombreComponente = 'reporte-materiales';
  permisosEspeciales: any[] = []; //array de objetos que contiene todos los permisos especiales del proyecto
  permisosEspecialesComponente: any[] = []; //array en el que se agregan los objetos que contiene el nombre del componente
  permisosEspecialesPermitidos: any[] = []; //array donde se agrega el nombre de las opciones a las cuales el usuario si tiene permiso

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<ReporteMaterial> = new MatTableDataSource<ReporteMaterial>();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    private obraService: ObraService,
    private navigationService: NavigationService,
    private usuariosService: UsuariosService,
    private reporteMaterialService: ReporteMaterialService,
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
    this.getReports();
    this.getDataUser();
  }

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = data.idObra;

      this.obraService.getObraObservable(this.idObra);
        this.obraObs$ = this.obraService.getDataObra();
        
        this.obraService.getDataObra().subscribe((data:Obra) => {
          if (data !== null) {
            this.validateAccessObra(data.supervisor, data.idGerente, data.idPlaneacionPresupuesto, data.idControlObra, data.idCompras);
          }
        });
    });
  }

  validateAccessObra(supervisores, idGerente, idPP, idControlObra, idCompras) {
    let idUsuariosConPermiso = [];
    supervisores.map(supervisor => {
      idUsuariosConPermiso.push(supervisor.idUsuario);
    });
    idUsuariosConPermiso.push(idGerente);
    idUsuariosConPermiso.push(idPP);
    idUsuariosConPermiso.push(idControlObra);
    idUsuariosConPermiso.push(idCompras);
    console.log(idUsuariosConPermiso);
    console.log(this.idUserLogeado)
    const idExistente = idUsuariosConPermiso.find(id => id === this.idUserLogeado);
    console.log(idExistente);
    if (!idExistente) {
      this.permisoAcceso = false;
      console.log(this.permisoAcceso);
    } else {
      this.permisoAcceso = true;
      console.log(this.permisoAcceso);
    }
  }

  getReports(){
    this.reporteMaterialService.getReportsByObra(this.idObra).subscribe(
      (reportes: ReporteMaterial[]) => {
        if(reportes.length > 0) {
          this.reports = reportes;
          this.reportsTemp =  this.reports;
          this.dataSource.data = this.reports;
  
          reportes.map( reporte => {
            console.log(reporte);
            this.totalMonto = reporte.totalMaterial;
            const total = reporte.detMaterial.reduce((acc,obj) => acc + (obj.importeCapturado),0);
            const art = {
              idReporte: reporte.idCapturaMaterial, 
              totalMateriales: total, 
              totalMaterial: reporte.totalMaterial
            };
            this.total.push(art);          
          });
          // console.log(this.total);
        } else {
          this.reporteExistente = false;
        }
      }
    );
  }

  getReportsAfterDelete(){
    this.reporteMaterialService.getReportsByObra(this.idObra).subscribe(
      (reportes: ReporteMaterial[]) => {
        this.reports = reportes;
        this.reportsTemp =  this.reports;
        this.dataSource.data = this.reports;
      }
    );
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
    var columns = Object.keys(this.reportsTemp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.reportsTemp.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    })
    this.dataSource.data = rows;
  }

  openDialoAlertDelete(reporte) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: reporte
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(reporte);

        this.reporteMaterialService.deleteReport(reporte).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getReportsAfterDelete();
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
    // console.log(this.montoTotal);
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
