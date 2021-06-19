import { Component, OnInit, ViewChildren, ViewChild, ChangeDetectorRef, QueryList } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { SolicitudesService } from 'app/shared/services/solicitudes.service';

import { ModalDatosSolicitudComponent } from '../modal-datos-solicitud/modal-datos-solicitud.component';
import { ModalEliminarComponent } from './../../../ejecucion-proyecto/components/modal-eliminar/modal-eliminar.component';
import { ModalAutorizarOrdenTrabajoComponent } from '../modal-autorizar-orden-trabajo/modal-autorizar-orden-trabajo.component';
import { Obra } from 'app/shared/models/obra';
import { ObraService } from 'app/shared/services/obra.service';
import { ModalCancelacionComponent } from '../modal-cancelacion/modal-cancelacion.component';
import { Empresa } from 'app/shared/models/empresa';
import { EmpresasService } from 'app/shared/services/empresas.service';

@Component({
  selector: 'app-pagos-suministros',
  templateUrl: './pagos-suministros.component.html',
  styleUrls: ['./pagos-suministros.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PagosSuministrosComponent implements OnInit {

  idUsuarioLogeado: any;
  obras: Obra[] = [];
  empresas: Empresa[] = [];
  obra: Obra;
  empresa: any;
  estatus: any;
  columnsToDisplay = ['verSolicitud', 'fecha', 'folio', 'empresa', 'contrato', 'solicitante'];
  innerDisplayedColumns = ['verOrden', 'fecha', 'folio', 'elaboro', 'validarOrden', 'cancelarOrden', 'comprobante'];
  solicitudes: any[] = [];
  fechaHoy = new Date();
  pipe = new DatePipe('en-US');
  whoSolicitud;
  noSolicitud: boolean;
  panelOpenState: boolean = false;
  objetoOrdenesObtenidas: NewOrder[] = [];

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChild('outerSortMat', { static: true }) sortMat: MatSort;
  @ViewChildren('innerSortMat') innerSortMat: QueryList<MatSort>;
  @ViewChild('outerSortMaq', { static: true }) sortMaq: MatSort;
  @ViewChildren('innerSortMaq') innerSortMaq: QueryList<MatSort>;

  @ViewChildren('innerTableRequest') innerTableRequest: QueryList<MatTable<NewRequest>>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<NewOrder>>;
  @ViewChild('paginatorRec', {static: true}) paginator: MatPaginator;
  @ViewChild('paginatorMat', {static: true}) paginatorMat: MatPaginator;
  @ViewChild('paginatorMaq', {static: true}) paginatorMaq: MatPaginator;

  dataSource: MatTableDataSource<NewRequest>;
  
  dataWorkOrders:  MatTableDataSource<NewOrder>;

  expandedElements: NewRequest | null;

  constructor(
    private autenticacionService: AutenticacionService,
    private solicitudesService: SolicitudesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private obraService: ObraService,
    private empresasService: EmpresasService
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getCatalogCompanies(); 
  }

  getCatalogCompanies() {
    this.empresasService.getAllEmpresasActive().subscribe(
      empresas => this.empresas = empresas,
      error => console.log(error)
    );
  }

  getObrasByCompanie(empresa: Empresa) {
    console.log(empresa);
    let idEmpresa = empresa.idEmpresa === 1 ?  0 : empresa.idEmpresa;
    idEmpresa = !empresa ? -1 : idEmpresa; 
    const cierre = 0;
    const activo = 1;
    this.obraService.getObrasByCompanie(cierre, activo, idEmpresa).subscribe(
      result => this.obras = result,
      error => console.log(error)
    );
  }
  
  getResources(tipoSolicitud){
    this.whoSolicitud = tipoSolicitud;
    this.noSolicitud = false;
    this.solicitudes = [];
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator = this.paginatorMat;
    this.dataSource.paginator = this.paginatorMaq;
    
    if(!this.whoSolicitud) {
      this.whoSolicitud = 1;
      this.panelOpenState = !this.panelOpenState;
    }

    let obr = !this.obra ? 0 : this.obra.idObra;
    let emp = !this.empresa ? 0 : this.empresa.idEmpresa;
    let est = !this.estatus ? -1 : this.estatus;
    
    // console.log(this.whoSolicitud);
    // console.log(obr);
    // console.log(emp);  
    // console.log(est); 
   
    this.solicitudesService.getLogSolicitudesValidadas(this.whoSolicitud, emp, obr, est).subscribe(
      solicitudes => {
        this.solicitudes = solicitudes;
        console.log(this.solicitudes);
        
        if(this.solicitudes.length === 0) {
          this.noSolicitud = true;
        } else {
          this.dataSource = new MatTableDataSource(this.solicitudes);
          solicitudes.forEach( solicitud => {
            
            if( solicitud.idTipo === 1) {
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            } else if (solicitud.idTipo === 2 ) {
              this.dataSource.sort = this.sortMat;
              this.dataSource.paginator = this.paginatorMat;
            } else if (solicitud.idTipo === 3 ) {
              this.dataSource.sort = this.sortMaq;
              this.dataSource.paginator = this.paginatorMaq;
            }
              
          });
        }
      },
      error => console.log(error)
    );
      
  }

  toggleRow(element: NewRequest) {
    this.objetoOrdenesObtenidas = [];
    this.solicitudesService.getViewDetLogRequest(parseInt(element.idSolicitud), element.idTipo, 1)
    .then( (response: NewOrder[]) => {
      
      let newots: NewOrder[] = [];
      response.map( (ot: NewOrder) => {
        this.objetoOrdenesObtenidas = [ ...this.objetoOrdenesObtenidas, {
          ...ot,
          idSolicitud: element.idSolicitud
        }];
      });

      console.log(this.objetoOrdenesObtenidas);
      this.dataWorkOrders = new MatTableDataSource(this.objetoOrdenesObtenidas);
      // element.workOrders && (element.workOrders as MatTableDataSource<NewOrder>).data.length ? (this.expandedElements = this.expandedElements === element ? null : element) : null;
      this.dataWorkOrders && (this.dataWorkOrders as MatTableDataSource<NewOrder>) ? (this.expandedElements = this.expandedElements === element ? null : element) : null;
      this.cd.detectChanges();
      this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<NewOrder>).sort = this.innerSort.toArray()[index]);
    })
    .catch( error => console.log(error));
  }

  openDialogDeleteOrden(orden: NewOrder) {
    const dialogRef = this.dialog.open(ModalCancelacionComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
       data: 'cancelar-orden'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

        const dataCancel = {
          idUsuarioRechazo: this.idUsuarioLogeado,
          idOrdenCompra: orden.idOrdenTrabajo,
          idTipo: orden.idTipo
        }

        console.log(dataCancel);

        let newOrder: NewOrder = {
          ...orden,
          colorAutorizar: "gray",
          colorEditarOrdenTrabajo: "gray",
          colorEliminarOrdenTrabajo: "gray",
        };

        this.solicitudesService.cancelarOrdenTrabajo(dataCancel).subscribe(
          response => {
            console.log(response)
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.deletIndex(orden);
              // this.getResources(1);
              // let foundIndex = this.objetoOrdenesObtenidas.findIndex( (order: NewOrder) => order.idOrdenTrabajo === orden.idOrdenTrabajo);
              // this.objetoOrdenesObtenidas[foundIndex] = newOrder;
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

  openDialogRequest(idSolicitud, idTipo): void {
    const dialogRef = this.dialog.open(ModalDatosSolicitudComponent, {
      width: 'auto',
      panelClass: 'custom-dialog-container-user',
      data: {
        idSolicitud, 
        idTipo
      }
    });

    dialogRef.afterClosed().subscribe(result =>  result);
  }

  openDialogAuthorize(idOrdenTrabajo, idTipoSolicitud, idSolicitud, tipoAccion): void{
    const dialogRef = this.dialog.open(ModalAutorizarOrdenTrabajoComponent, {
      width: 'auto',
      panelClass: 'custom-dialog-container-user',
      data: { idOrdenTrabajo, idTipoSolicitud, tipoAccion }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      const {opcion, ot} = result[0];
      let datosAutorizar: any;
      console.log(opcion);

      delete ot['fechaElaboro'];
      delete ot['idTipo'];
      delete ot['solicitud'];
      delete ot['usuarioElaboro'];

     if(idTipoSolicitud === 2) {
        delete ot['pk'];
        delete ot['sizeDetOrdenTrabajo'];
      } 

      console.log(ot);

      if (opcion === 'validar') {
        
        datosAutorizar = {
          idUsuarioAutorizo:this.idUsuarioLogeado,
          idOrdenCompra: idOrdenTrabajo,
          idTipo: idTipoSolicitud,
        };

        console.log(datosAutorizar);
  
        this.solicitudesService.autorizarSolicitud(datosAutorizar).subscribe(
          response => {
            // debugger;
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              if(idTipoSolicitud === 1) {
                this.solicitudesService.updateOrdenTrabajo(ot).subscribe(
                  response => {
                    if(response.estatus === '05'){
                      this.useAlerts(response.mensaje, ' ', 'success-dialog');
                      this.getResources(1);
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
              else if(idTipoSolicitud === 2) {
                this.solicitudesService.updateOrdenTrabajoMateriales(ot).subscribe(
                  response => {
                    if(response.estatus === '05'){
                      this.useAlerts(response.mensaje, ' ', 'success-dialog');
                      this.getResources(1);
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
              else if(idTipoSolicitud === 3) {
                this.solicitudesService.updateOrdenTrabajoVehiculos(ot).subscribe(
                  response => {
                    if(response.estatus === '05'){
                      this.useAlerts(response.mensaje, ' ', 'success-dialog');
                      this.getResources(1);
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
            } 
            else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }
          },
          error => this.useAlerts(error.message, ' ', 'error-dialog')
        );

      } else if (opcion === 'rechazar') {        
        datosAutorizar = {
          idUsuarioRechazo: this.idUsuarioLogeado,
          idOrdenCompra: idOrdenTrabajo,
          idTipo: idTipoSolicitud,
          // idSolicitud: idSolicitud,
          // idBitacoraSolicitud: 0,
        };

        console.log(datosAutorizar);
        this.solicitudesService.cancelarOrdenTrabajo(datosAutorizar).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              
              if(idTipoSolicitud === 1) {
                this.solicitudesService.updateOrdenTrabajo(ot).subscribe(
                  response => {
                    if(response.estatus === '05'){
                      this.useAlerts(response.mensaje, ' ', 'success-dialog');
                      this.getResources(1);
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
              else if(idTipoSolicitud === 2) {
                this.solicitudesService.updateOrdenTrabajoMateriales(ot).subscribe(
                  response => {
                    if(response.estatus === '05'){
                      this.useAlerts(response.mensaje, ' ', 'success-dialog');
                      this.getResources(1);
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
              else if(idTipoSolicitud === 3) {
                this.solicitudesService.updateOrdenTrabajoVehiculos(ot).subscribe(
                  response => {
                    if(response.estatus === '05'){
                      this.useAlerts(response.mensaje, ' ', 'success-dialog');
                      this.getResources(1);
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

              // this.getResources();
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }
          },
          error => this.useAlerts(error.message, ' ', 'error-dialog')
        );
      }

      
    });
  }

  validateOrder(orden: NewOrder, index) {
    const dataValidate = {
      idTipo: orden.idTipo,
      idOrdenCompra: orden.idOrdenTrabajo,
      idUsuarioValidate: this.idUsuarioLogeado
    };

    console.log(JSON.stringify(dataValidate));

    this.solicitudesService.setValidate(dataValidate).subscribe(
      response => {
        console.log(response);
        if(response.estatus === '05'){
          this.useAlerts(response.mensaje, ' ', 'success-dialog');
          // this.getResources(this.whoSolicitud);
          this.deletIndex(orden);
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

  deletIndex(orden) {
    let foundIndex = this.objetoOrdenesObtenidas.findIndex( (order: NewOrder) => order.idOrdenTrabajo === orden.idOrdenTrabajo);
    this.objetoOrdenesObtenidas.splice(foundIndex, 1);
    this.objetoOrdenesObtenidas = [...this.objetoOrdenesObtenidas];
    this.dataWorkOrders = new MatTableDataSource(this.objetoOrdenesObtenidas);
  }

  descargarOrdenTrabajo(orden: NewOrder) {
    console.log(orden);
    let leyenda;
    if(orden.idTipo === 1){
      leyenda = 'orden-trabajo-recursos';
    } else if(orden.idTipo === 2){
      leyenda = 'orden-trabajo-materiales-herramientas';
    } else  if(orden.idTipo === 3){
      leyenda = 'orden-trabajo-maquinaria-equipo';
    }

    this.solicitudesService.descargarOrdenTrabajo(orden.idOrdenTrabajo, orden.idTipo).subscribe(
      response => {
        var blob = new Blob([response], {type: 'application/pdf'});
        var link=document.createElement('a');
      
        var obj_url = window.URL.createObjectURL(blob);		    
        var link = document.createElement("a");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", obj_url);
        link.setAttribute("download",`${leyenda}.pdf`);
          
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

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}

export interface NewRequest {
  colorCrearOrden: string;
  colorEditarSolitud: string;
  colorEliminarSolitud: string;
  crearOrden: Boolean;
  editarSolicitud: Boolean;
  eliminarSolicitud: Boolean;
  estatus: number;
  estatusText: string;
  fechaSolicito: string;
  folio: string;
  idObra: number;
  idSolicitud?: string;
  idTipo?: number;
  idUsuarioSolicito: number;
  tipo?: string;
  totalOrden: number;
  usuarioSolicito: string;
  empresa: string;
  noCcontrato: string;
  solicitante?: string;
  colorVerSolicitud?: string;
  workOrders?: NewOrder[] | MatTableDataSource<NewOrder>;
}

export interface NewOrder {
  autorizar: boolean;
  colorValidar: any;
  color: any;
  colorAutorizar: string;
  colorEditarOrdenTrabajo: string;
  colorEliminarOrdenTrabajo: string;
  colorExportanOrden: string;
  colorOrdenTrabajo: string;
  colorSuministrar: any;
  editarOrdenTrabajo: boolean;
  eliminarOrdenTrabajo: boolean;
  estatus: string;
  exportarOrden: boolean;
  fechaOrdenTrabajo: string;
  icono: any;
  idOrdenTrabajo: number;
  idTipo: number;
  idUsuarioAutoriza: number;
  idUsuarioOrdenTrabajo: number;
  idUsuarioRechazo: number;
  idUsuarioValidar: number;
  ordenTrabajo: boolean;
  tipo: any;
  validar: boolean;
  usuarioOrdenTrabajo?: any;
  fechaAutoriza?: string;
  fechaAutorizaSuministro?: string;
  idUsuarioSuministra?: number;
  suministrar?: boolean;
  idSolicitud?: string;
}
