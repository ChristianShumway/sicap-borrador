import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { NavigationService } from './../../../../shared/services/navigation.service';
import { UsuariosService } from './../../../../shared/services/usuarios.service';
import { ObraService } from '../../../../shared/services/obra.service';
import { ReporteIngresosEgresosService } from '../../../../shared/services/reporte-ingresos-egresos.service';

import { ModalEliminarComponent } from './../modal-eliminar/modal-eliminar.component';
import { environment } from './../../../../../environments/environment';

import { Usuario } from './../../../../shared/models/usuario';
import { Obra } from '../../../../shared/models/obra';
import { ReporteIngresosEgresos } from './../../../../shared/models/reporte-ingresos-egresos';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ReporteIngresosEgresosComponent } from '../reporte-ingresos-egresos/reporte-ingresos-egresos.component';
import { ModificarReporteIngresosEgresosComponent } from '../modificar-reporte-ingresos-egresos/modificar-reporte-ingresos-egresos.component';

@Component({
  selector: 'app-lista-reporte-ingresos-egresos',
  templateUrl: './lista-reporte-ingresos-egresos.component.html',
  styleUrls: ['./lista-reporte-ingresos-egresos.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ListaReporteIngresosEgresosComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  rutaImg: string;
  host: string;
  fechaActual = new Date();
  pipe = new DatePipe('en-US');
  
  idUserLogeado;
  accesoBitacora = false;
  idObra;

  tipoMovimientos: any[] = [];
  idTipoMovimiento;
  loadTipoMovimientos: boolean = false;
  categoriasMovimiento: any[] = [];
  idCategoria;
  loadCategorias: boolean = false;
  panelOpenState = false;
  movimientosCategoria: ReporteIngresosEgresos[] = [];
  loadMovimientos: boolean = false;
  noMovimientos:boolean = false;
  montoTotal: number = 0;
  obra: Obra;
  permisoAcceso: boolean = false;

  nombreComponente = 'reporte-ingresos-egresos';
  permisosEspeciales: any[] = []; //array de objetos que contiene todos los permisos especiales del proyecto
  permisosEspecialesComponente: any[] = []; //array en el que se agregan los objetos que contiene el nombre del componente
  permisosEspecialesPermitidos: any[] = []; //array donde se agrega el nombre de las opciones a las cuales el usuario si tiene permiso

 
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private autenticacionService: AutenticacionService,
    private reporteIngresosEgresosService: ReporteIngresosEgresosService,
    private usuariosService: UsuariosService,
    private navigationService: NavigationService,
    private obraService: ObraService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.idUserLogeado = this.autenticacionService.currentUserValue;
    this.getObra();
    this.getTipoMovimientos();
    //paginator
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
    // this.getReports();
    this.getDataUser();
  }

  getTipoMovimientos() {
    this.loadTipoMovimientos = true;
    this.reporteIngresosEgresosService.getCatalogoTipo().subscribe(
      result => {
        result.map( cuenta => {
          this.tipoMovimientos = [...this.tipoMovimientos, {...cuenta, expanded: false}];
          this.loadTipoMovimientos = false;
        });
        // console.log(this.tipoMovimientos);
      },
      error => {
        console.error(error);
        this.useAlerts(error.message, ' ', 'error-dialog');
        this.loadTipoMovimientos = false;
      }

    );
  }

  expandPannelMovimientos(expanded, idTipoMovimiento) {
    // expanded = !expanded;
    this.tipoMovimientos.map( movimiento => {
      if(movimiento.idTipoMovimientoMonetario === idTipoMovimiento) {
        movimiento.expanded = true;
      } else {
        movimiento.expanded = false;
      }
    });

    if(!expanded) {
      this.idTipoMovimiento = idTipoMovimiento;
      this.getCategoriasPorMovimiento(idTipoMovimiento);
    }
  }

  getCategoriasPorMovimiento(idTipoMovimiento) {
    // console.log(idTipoMovimiento);
    this.loadCategorias = true;
    this.categoriasMovimiento = [];
    this.reporteIngresosEgresosService.getCatalogoCategoria(idTipoMovimiento).subscribe(
      result => {
        result.map ( categoria => {
          this.categoriasMovimiento = [...this.categoriasMovimiento, {...categoria, expanded:false}];
          this.loadCategorias = false;
        });
        // console.log(this.categoriasMovimiento);
      },
      error => {
        console.log(error);
        this.useAlerts(error.message, ' ', 'error-dialog');
        this.loadCategorias = false;
      }
    );
  }

  expandPanelCategorias(expanded, idCategoria) {
    // expanded = !expanded;
    this.categoriasMovimiento.map( categoria => {
      if(categoria.idCategoriaMovimientoMonetario === idCategoria) {
        categoria.expanded = true;
      } else {
        categoria.expanded = false;
      }
    });

    if(!expanded) {
      this.idCategoria = idCategoria;
      this.getDataCategoria(idCategoria);
    }
  }

  getDataCategoria(idCategoria) {
    this.montoTotal = 0;
    // console.log(idCategoria);
    this.loadMovimientos = true;
    this.noMovimientos = false;
    this.reporteIngresosEgresosService.getMovimientosPorCategoria(this.idObra, idCategoria).subscribe(
      result => {
        // console.log(result);
        this.loadMovimientos = false;
        this.movimientosCategoria = result;
        if(this.movimientosCategoria.length === 0) {
          this.noMovimientos = true;
        } else {
          this.movimientosCategoria.map( movimiento => {
            this.montoTotal += movimiento.monto;
          });
          // console.log(this.montoTotal);
        }
      },
      error => {
        console.error(error);
        this.useAlerts(error.message, ' ', 'error-dialog');
        this.loadMovimientos = false;
      }
    );
  }

  openBottomEdit(movimiento): void {
    console.log(movimiento);
    let sheet = this.bottomSheet.open(ModificarReporteIngresosEgresosComponent, {
      data: {
        idObra:this.idObra, 
        movimiento: movimiento,
        idUsuarioLogeado: this.idUserLogeado,
      }
    });

    sheet.afterDismissed().subscribe( data => {
      if(data) {
        // console.log(data);
        this.reporteIngresosEgresosService.addReport(data).subscribe(
          response => {
            if(response.estatus === '05'){
              this.getDataCategoria(data.idCategoriaMovimientoMonetario);
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }
          },
          error => this.useAlerts(error.message, ' ', 'error-dialog')
        );
      }
    });
  
  }

  openBottomAdd(tipoMovimiento, categoria): void {
    console.log(tipoMovimiento);
    console.log(categoria);

    let sheet = this.bottomSheet.open(ReporteIngresosEgresosComponent, {
      data: {
        idObra:this.idObra, 
        idTipoMovimiento: tipoMovimiento,
        idCategoria: categoria,
        idUsuarioLogeado: this.idUserLogeado
      }
    }); 

    sheet.afterDismissed().subscribe( data => {
      if(data) {
        // console.log(data);
        this.reporteIngresosEgresosService.addReport(data).subscribe(
          response => {
            if(response.estatus === '05'){
              this.getDataCategoria(data.idCategoriaMovimientoMonetario);
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }
          },
          error => this.useAlerts(error.message, ' ', 'error-dialog')
        );
      }
    });
  }

  openDialoAlertDelete(movimiento) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: movimiento
    });

    // console.log(movimiento)

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // console.log(movimiento);

        this.reporteIngresosEgresosService.deleteReport(movimiento).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getDataCategoria(movimiento.idCategoriaMovimientoMonetario);
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

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = data.idObra;

      this.obraService.getObra(this.idObra).subscribe(
        (obra: Obra) => {
          this.obra = obra;
          // console.log(obra);
        },
        error => console.log(error)
      );

      this.obraService.getObraObservable(this.idObra);
      this.obraObs$ = this.obraService.getDataObra();

        
      this.obraService.getDataObra().subscribe(
        (dataObra:Obra) => {
          if (dataObra !== null) {
            this.validateAccessObra(dataObra.supervisor, dataObra.idGerente, dataObra.idPlaneacionPresupuesto, dataObra.idControlObra, dataObra.idCompras);
          }
        }
      );

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
    // console.log(idUsuariosConPermiso);
    // console.log(this.idUserLogeado)
    const idExistente = idUsuariosConPermiso.find(id => id === this.idUserLogeado);
    // console.log(idExistente);
    if (!idExistente) {
      this.permisoAcceso = false;
      // console.log(this.permisoAcceso);
    } else {
      this.permisoAcceso = true;
      // console.log(this.permisoAcceso);
    }
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

    // console.log(this.permisosEspecialesPermitidos);
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
