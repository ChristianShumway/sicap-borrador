import { Component, OnInit, ViewChildren, ViewChild, ChangeDetectorRef, QueryList } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { SolicitudesService } from '../../../../shared/services/solicitudes.service';

import { ModalDatosSolicitudComponent } from '../modal-datos-solicitud/modal-datos-solicitud.component';
import { ModalEliminarComponent } from './../../../ejecucion-proyecto/components/modal-eliminar/modal-eliminar.component';
import { ModalAutorizarOrdenTrabajoComponent } from '../modal-autorizar-orden-trabajo/modal-autorizar-orden-trabajo.component';


@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ListaSolicitudesComponent implements OnInit {
  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTableRequest') innerTableRequest: QueryList<MatTable<NewRequest>>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<NewOrder>>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  idUsuarioLogeado: any;
  dataSource: MatTableDataSource<NewRequest>;
  requestData: NewRequest[];
  columnsToDisplay = ['folio', 'tipo', 'empresa', 'contrato', 'solicitante', 'verSolicitud', 'editarSolicitud', 'cancelarSolicitud', 'ordenTrabajo'];
  innerDisplayedColumns = ['folio', 'fecha', 'estatus', 'editarOrden', 'cancelarOrden', 'autorizarOrden', 'exportarOrden', 'verificarOrden'];
  expandedElement: NewRequest | null;
  solicitudes: any[] = [];
  solicitudesModif: NewRequest[];
  fechaHoy = new Date();
  pipe = new DatePipe('en-US');

  constructor(
    private autenticacionService: AutenticacionService,
    private solicitudesService: SolicitudesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    this.getResources();    
  }
  
  getResources(){
   this.solicitudesModif = [];
   this.requestData = [];
    this.solicitudesService.getSolicitudesPorUsuario(this.idUsuarioLogeado, 2).subscribe(
      solicitudes => {
        solicitudes.map( solicitud => this.solicitudes.push(solicitud));
        // this.solicitudesRecursos = solicitudes;
        console.log(solicitudes);
        solicitudes.forEach( solicitud => {
          let tipo;
          if( solicitud.idTipo === 1){
            tipo = 'Recursos'
          } else  if( solicitud.idTipo === 2){
            tipo = 'Materiales / Herramientas'
          } else  if( solicitud.idTipo === 3){
            tipo = 'Maquinaria / Equipo'
          }
          const solicidudModificada: NewRequest = {
            folio: solicitud.folio,
            empresa: solicitud.obra.empresa.nombre,
            contrato: solicitud.obra.noContrato,
            solicitante: solicitud.usuarioSolicito.nombreCompleto,
            estatus: solicitud.estatus,
            idSolicitud: solicitud.idSolicitud,
            idTipo: solicitud.idTipo,
            fechaSolicitud: solicitud.fechaSolicito,
            colorEditarSolicitud: solicitud.colorEditarSolitud,
            colorEliminarSolicitud: solicitud.colorEliminarSolitud,
            colorVerSolicitud: solicitud.colorVerSolicitud,
            colorCrearOrden: solicitud.colorCrearOrden,
            tipo: tipo
          };

          this.solicitudesModif.push(solicidudModificada);
        });

        this.addWorkOrdersToRequest(this.solicitudesModif);
      },
      error => console.log(error)
    );
    
  }

  addWorkOrdersToRequest(requests: NewRequest[]) {
    console.log(requests);
    requests.forEach((request: NewRequest) => {
      this.solicitudesService.getWorkOrdenByRequest(this.idUsuarioLogeado, request.idSolicitud, request.idTipo)
      .then( (response) => {  
        
        // console.log(response);
        if (response.length) {
          request = {
            ...request,
            workOrders: response
          }
        }  else {
          request = {...request}
        }

        if (request.workOrders && Array.isArray(request.workOrders) && request.workOrders.length) {
          this.requestData = [...this.requestData, {...request, workOrders: new MatTableDataSource(request.workOrders)}];
        } else {
          this.requestData = [...this.requestData, request];
        }

        console.log(this.requestData);
        this.dataSource = new MatTableDataSource(this.requestData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      })
      .catch( error => console.log(error));
    });
  }

  toggleRow(element: NewRequest) {
    element.workOrders && (element.workOrders as MatTableDataSource<NewOrder>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<NewOrder>).sort = this.innerSort.toArray()[index]);
  }

  applyFilterRequest(filterValue: string) {
    this.innerTableRequest.forEach((table, index) => (table.dataSource as MatTableDataSource<NewRequest>).filter = filterValue.trim().toLowerCase());
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<NewOrder>).filter = filterValue.trim().toLowerCase());
  }

  openDialoAlertDelete(idSolicitud, tipoSolicitud) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      // data: idObra
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this.solicitudesService.deleteSolicitud(idSolicitud, tipoSolicitud).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getResources();
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

  openDialogDeleteOrden(idOrdentrabajo, tipoOrdenTrabajo) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      // data: idObra
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

        const dataCancel = {
          idUsuarioRechazo: this.idUsuarioLogeado,
          idOrdenCompra: idOrdentrabajo,
          idTipo: tipoOrdenTrabajo
        }

        console.log(dataCancel);

        this.solicitudesService.cancelarOrdenTrabajo(dataCancel).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getResources();
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

  openDialogAuthorize(idOrdenTrabajo, idTipoSolicitud, idSolicitud): void{
    const dialogRef = this.dialog.open(ModalAutorizarOrdenTrabajoComponent, {
      width: '460px',
      panelClass: 'custom-dialog-container-user',
      data: { idOrdenTrabajo,idTipoSolicitud, tipoAccion: 'autorizar' }
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
                      this.getResources();
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
                      this.getResources();
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
                      this.getResources();
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
          idSolicitud: idSolicitud,
          idTipo: idTipoSolicitud,
          // idBitacoraSolicitud: 0,
        };

        console.log(datosAutorizar);
        this.solicitudesService.rechazarSolicitud(datosAutorizar).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              
              if(idTipoSolicitud === 1) {
                this.solicitudesService.updateOrdenTrabajo(ot).subscribe(
                  response => {
                    if(response.estatus === '05'){
                      this.useAlerts(response.mensaje, ' ', 'success-dialog');
                      this.getResources();
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
                      this.getResources();
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
                      this.getResources();
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

  openDialogSupply(idOrdenTrabajo, idTipoSolicitud, idSolicitud): void{
    const dialogRef = this.dialog.open(ModalAutorizarOrdenTrabajoComponent, {
      width: '460px',
      panelClass: 'custom-dialog-container-user',
      data: { idOrdenTrabajo,idTipoSolicitud, tipoAccion: 'suministrar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      const {opcion} = result[0];
      let datosSuministrar: any;

      if(opcion === 'validar'){
        datosSuministrar = {
          idUsuarioAutorizo:this.idUsuarioLogeado,
          idOrdenCompra: idOrdenTrabajo,
          idTipo: idTipoSolicitud,
          // idSolicitud: idSolicitud,
          // idBitacoraSolicitud:0,
        };
      }

      console.log(datosSuministrar);
      console.log(opcion);

      this.solicitudesService.suministrarSolicitud(datosSuministrar).subscribe(
        response => {
          if(response.estatus === '05'){
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.getResources();
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        },
        error => this.useAlerts(error.message, ' ', 'error-dialog')
      );
      
    });
  }

  descargarSolicitud(idSolicitud, tipoSolicitud) {
    console.log(idSolicitud);
    let leyenda;
    if(tipoSolicitud === 1){
      leyenda = 'solicitud-recursos';
    } else if(tipoSolicitud === 2){
      leyenda = 'solicitud-materiales-herramientas';
    } else  if(tipoSolicitud === 3){
      leyenda = 'solicitud-maquinaria-equipo';
    }

    this.solicitudesService.descargarSolicitud(idSolicitud, tipoSolicitud).subscribe(
      response => {
        var blob = new Blob([response], {type: 'application/xlsx'});
        var link=document.createElement('a');
      
        var obj_url = window.URL.createObjectURL(blob);		    
        var link = document.createElement("a");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", obj_url);
        link.setAttribute("download",`${leyenda}.xlsx`);
          
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

  descargarOrdenTrabajo(idOrdenTrabajo, tipoOrden) {
    console.log(idOrdenTrabajo);
    let leyenda;
    if(tipoOrden === 1){
      leyenda = 'orden-trabajo-recursos';
    } else if(tipoOrden === 2){
      leyenda = 'orden-trabajo-materiales-herramientas';
    } else  if(tipoOrden === 3){
      leyenda = 'orden-trabajo-maquinaria-equipo';
    }

    this.solicitudesService.descargarOrdenTrabajo(idOrdenTrabajo, tipoOrden).subscribe(
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
  folio: string;
  empresa: string;
  contrato: string;
  solicitante: string;
  estatus: string;
  fechaSolicitud: string;
  colorEditarSolicitud: string;
  colorEliminarSolicitud: string;
  colorVerSolicitud: string;
  colorCrearOrden: string;
  idTipo?: number;
  idSolicitud?: number;
  tipo: string;
  workOrders?: NewOrder[] | MatTableDataSource<NewOrder>;
}

export interface NewOrder {
  autorizar: boolean;
  color: any;
  colorAutorizar: string;
  colorEditarOrdenTrabajo: string;
  colorEliminarOrdenTrabajo: string;
  colorExportanOrden: string;
  colorOrdenTrabajo: string;
  colorSuministrar: any;
  colorValidar: any;
  editarOrdenTrabajo: boolean;
  eliminarOrdenTrabajo: boolean;
  estatus: string;
  exportarOrden: boolean;
  fechaAutoriza: string;
  fechaAutorizaSuministro: string;
  fechaOrdenTrabajo: string;
  icono: any;
  idOrdenTrabajo: number;
  idTipo: number;
  idUsuarioAutoriza: number;
  idUsuarioOrdenTrabajo: number;
  idUsuarioRechazo: number;
  idUsuarioSuministra: number;
  ordenTrabajo: boolean;
  suministrar: boolean;
  tipo: any;
  usuarioOrdenTrabajo: any;
  validar: boolean;
}
