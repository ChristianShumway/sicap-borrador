import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { environment } from './../../../../../environments/environment';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { SolicitudesService } from './../../../../shared/services/solicitudes.service';

import {TableroControl } from './../../.././../shared/models/solicitud';

@Component({
  selector: 'app-tablero-control',
  templateUrl: './tablero-control.component.html',
  styleUrls: ['./tablero-control.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableroControlComponent implements OnInit {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTableRequest') innerTableRequest: QueryList<MatTable<NewRequest>>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<NewOrder>>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<NewRequest>;
  requestData: NewRequest[] = [];
  columnsToDisplay = ['Folio', 'Empresa', 'Contrato', 'Solicitante', 'Estatus', 'fechaSolicitud'];
  innerDisplayedColumns = ['idOrdenTrabajo', 'estatus', 'fechaOrdenTrabajo', 'fechaAutoriza', 'fechaAutorizaSuministro'];
  expandedElement: NewRequest | null;


  listaSolicitudes: TableroControl[];
  solicitudesModif: NewRequest[] = [];

  constructor(
    private solicitudesService: SolicitudesService,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getSolicitudes();
  }

  getSolicitudes() {
    this.solicitudesService.getLogRequest().subscribe(
      (list: TableroControl[]) => {
        this.listaSolicitudes = list;
        console.log(list);
        
        list.forEach( (solicitud: TableroControl) => {
          const solicidudModificada: NewRequest = {
            Folio: solicitud.folio,
            Empresa: solicitud.obra.empresa.nombre,
            Contrato: solicitud.obra.noContrato,
            idSolicitud: solicitud.idSolicitud,
            idTipo: solicitud.idTipo,
            Solicitante: solicitud.usuarioSolicito.nombreCompleto,
            fechaSolicitud: solicitud.fechaSolicito,
            Estatus: solicitud.estatus
          };

          this.solicitudesModif.push(solicidudModificada);

        });
        this.addWorkOrdersToRequest(this.solicitudesModif);

      }, 
      error => console.log(error) 
    );
  }

  addWorkOrdersToRequest(requests: NewRequest[]) {
    // console.log(requests);
    requests.forEach((request: NewRequest) => {
      this.solicitudesService.getViewDetLogRequest(request.idSolicitud, request.idTipo)
      .then( (response) => {  
        
        if (response.length) {
          // console.log(response);
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
  useAlerts(message, action, className, time = 4000){
    this.snackBar.open(message, action, {
      duration: time,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}

export interface NewRequest {
  Folio: string;
  Empresa: string;
  Contrato: string;
  Solicitante: string;
  Estatus: string;
  fechaSolicitud: string;
  idTipo?: number;
  idSolicitud?: number;
  workOrders?: NewOrder[] | MatTableDataSource<NewOrder>;
}

export interface NewOrder {
  fechaOrdenTrabajo: string;
  autorizar?: boolean;
  color?: any;
  colorAutorizar?: any;
  colorEditarOrdenTrabajo?: any;
  colorEliminarOrdenTrabajo?: any;
  colorExportanOrden?: any;
  colorOrdenTrabajo?: any;
  colorSuministrar?: any;
  colorValidar?: any;
  editarOrdenTrabajo?: boolean;
  eliminarOrdenTrabajo?: boolean;
  estatus?: string;
  exportarOrden?: boolean;
  fechaAutoriza?: string;
  fechaAutorizaSuministro?: string;
  icono?: any;
  idOrdenTrabajo?: number;
  idTipo?: number;
  idUsuarioAutoriza?: number;
  idUsuarioOrdenTrabajo?: number;
  idUsuarioRechazo?: number;
  idUsuarioSuministra?: number;
  ordenTrabajo?: boolean;
  suministrar?: boolean;
  tipo?: any;
  usuarioOrdenTrabajo?: any;
  validar?: boolean;
}