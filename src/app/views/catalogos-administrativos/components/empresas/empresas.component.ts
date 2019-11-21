import { Component, OnInit,  ViewChild, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { Empresa } from './../../../../shared/models/empresa';
import { EmpresasService } from './../../../../shared/services/empresas.service';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar';

import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { environment } from './../../../../../environments/environment.prod';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[] = [];
  empresasTemp: Empresa[] = [];
  rutaImg: string;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Empresa> = new MatTableDataSource<Empresa>();

  constructor(
    private empresasService: EmpresasService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getEmpresas();
    //paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.rutaImg = environment.imgRUL;
  }

  ngOnDestroy(){
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  getEmpresas(){
    // this.empresas = this.empresasService.getAllEmpresas();
    this.empresasService.getAllEmpresas().subscribe(
      ( (empresas: Empresa[]) => {
        console.log(empresas)
        this.empresas = empresas;
        this.empresasTemp = this.empresas;
        this.dataSource.data = this.empresas;
      }),
      (error => console.log(error))
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.empresasTemp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.empresasTemp.filter(function(d) {
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

  openDialoAlertDelete(id) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        console.log(id);
        this.useAlerts('Eliminación de Empresa', 'Correcto', 'success-dialog');
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
