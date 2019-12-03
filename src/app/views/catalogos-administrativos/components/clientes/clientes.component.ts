import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ClientesService } from '../../../../shared/services/clientes.service';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { Cliente } from './../../../../shared/models/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, OnDestroy {

  clientes: Cliente[] = [];
  clientesTemp: Cliente[] = [];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>();

  constructor(
    private clientesService: ClientesService,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getClientesTemp();
    //paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
  }

  ngOnDestroy(){
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  getClientesTemp(){
    this.clientes = this.clientesService.clientesTemp;
    this.clientesTemp = this.clientes;
    this.dataSource.data = this.clientes;
    console.log(this.clientes);
  }

  getClientes(){
    this.clientesService.getClientes().subscribe(
      ( clientes => {
        this.clientes = clientes.filter( cliente => cliente.activo === 1);
        console.log(this.clientes);
        this.clientesTemp = this.clientes;
        console.log(this.clientesTemp);
        this.dataSource.data = this.clientes;
      }),
      (error => console.log(error.message))
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.clientesTemp[0]);
    // Removes last "$$index" from "column"
    columns.splice(columns.length - 1);
    //console.log(columns);

    if (!columns.length)
      return;

    const rows = this.clientesTemp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    })

    this.dataSource.data = rows;
    console.log(this.dataSource.data);
  }

  openDialoAlertDelete(idCliente) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: idCliente
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const clienteBaja = {
          idCliente: idCliente,
          activo: 0
        };
        // console.log(clienteBaja);
        this.clientesService.deleteCliente(clienteBaja).subscribe(
          response => {
            console.log(response);
            // if(response.estatus === '05'){
            //   this.useAlerts(response.mensaje, ' ', 'success-dialog');
            //   this.getClientes();
            // } else {
            //   this.useAlerts(response.mensaje, ' ', 'error-dialog');
            // }
          },
            error => {
            this.useAlerts(error.mensaje, ' ', 'error-dialog');
            console.log(error);
          }
        );
      }
    });
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
