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
import { NavigationService } from './../../../../shared/services/navigation.service';
import { UsuariosService } from './../../../../shared/services/usuarios.service';
import { Usuario } from './../../../../shared/models/usuario';

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
  planTrabajoExistente = true;
  
  idUserLogeado;
  accesoBitacora = false;
  workPlans: PlanTrabajo[] = [];
  workPlansTemp: PlanTrabajo[] = [];
  idObra;
  panelOpenState = false;
  montoTotal: number = 0;
  total:any[] = [];
  permisoAcceso: boolean = false;

  nombreComponente = 'plan-trabajo';
  permisosEspeciales: any[] = []; //array de objetos que contiene todos los permisos especiales del proyecto
  permisosEspecialesComponente: any[] = []; //array en el que se agregan los objetos que contiene el nombre del componente
  permisosEspecialesPermitidos: any[] = []; //array donde se agrega el nombre de las opciones a las cuales el usuario si tiene permiso

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
    this.getWorkPlans();
    this.getDataUser();
  }

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = data.id;

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
    // console.log(supervisores);
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
      // this.router.navigate(['/dashboard']);
      // this.useAlerts('No tienes acceso a ver lista de plan de trabajo de esta obra', ' ', 'error-dialog');
      this.permisoAcceso = false;
      console.log(this.permisoAcceso);
    } else {
      this.permisoAcceso = true;
      console.log(this.permisoAcceso);
      // this.getWorkPlans();
    }
  }

  getWorkPlans(){
    this.planTrabajoService.getWorkPlanByObra(this.idObra).subscribe(
      (planes: PlanTrabajo[]) => {
        if(planes.length > 0) {
          this.workPlans = planes;
          this.workPlansTemp =  this.workPlans;
          this.dataSource.data = this.workPlans;
  
          planes.map( plan => {
            console.log(plan);
            const total = plan.viewConceptWorkPlan.reduce((acc,obj) => acc + (obj.importePlaneado),0);
            const art = {
              idPlan: plan.idPlanTrabajo, 
              totalMateriales: total, 
              totalEjecutado: plan.totalEjecutado,
              totalObra: plan.totalObra
            };
            this.total.push(art);          
          });
        } else {
          this.planTrabajoExistente = false;
        }
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
        // console.log(plan);

        this.planTrabajoService.deleteWorkPlan(plan).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getWorkPlans();
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

  exportarReporte(idPlanTrabajo) {
    this.planTrabajoService.getExportable(idPlanTrabajo).subscribe(
      response => {
        var blob = new Blob([response], {type: 'application/xlsx'});
        var link=document.createElement('a');
      
        var obj_url = window.URL.createObjectURL(blob);		    
        var link = document.createElement("a");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", obj_url);
        link.setAttribute("download","reporte-plan-trabajo.xlsx");
          
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

}
