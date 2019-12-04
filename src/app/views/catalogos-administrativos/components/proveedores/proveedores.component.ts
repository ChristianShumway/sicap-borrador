import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { ProveedoresService } from '../../../../shared/services/proveedores.service';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { Proveedor } from './../../../../shared/models/proveedor';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit, OnDestroy {

  proveedores: Proveedor[] = [];
  proveedoresTemp: Proveedor[] = [];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Proveedor> = new MatTableDataSource<Proveedor>();

  constructor(
    private proveedoresService: ProveedoresService,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getProveedoresTemp();
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

  getProveedoresTemp(){
    this.proveedores = this.proveedoresService.proveedoresTemp;
    this.proveedoresTemp = this.proveedores;
    this.dataSource.data = this.proveedores;
    console.log(this.proveedores);
  }

  getProveedores(){
    this.proveedoresService.getProveedores().subscribe(
      ( proveedores => {
        this.proveedores = proveedores.filter( proveedor => proveedor.activo === 1);
        console.log(this.proveedores);
        this.proveedoresTemp = this.proveedores;
        console.log(this.proveedoresTemp);
        this.dataSource.data = this.proveedores;
      }),
      (error => console.log(error.message))
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.proveedoresTemp[0]);
    // Removes last "$$index" from "column"
    columns.splice(columns.length - 1);
    //console.log(columns);

    if (!columns.length)
      return;

    const rows = this.proveedoresTemp.filter(function(d) {
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

  openDialoAlertDelete(idProv) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: idProv
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const proveedorBaja = {
          idProveedor: idProv,
          activo: 0
        };
        // console.log(proveedorBaja);
        this.proveedoresService.deleteProveedor(proveedorBaja).subscribe(
          response => {
            console.log(response);
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getProveedores();
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }
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
