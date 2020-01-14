import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { DestajistasService } from '../../../../shared/services/destajistas.service';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { Destajista } from './../../../../shared/models/destajista';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';

@Component({
  selector: 'app-destajistas',
  templateUrl: './destajistas.component.html',
  styleUrls: ['./destajistas.component.scss']
})
export class DestajistasComponent implements OnInit, OnDestroy {

  destajistas: Destajista[] = [];
  destajistasTemp: Destajista[] = [];
  idUsuarioLogeado;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Destajista> = new MatTableDataSource<Destajista>();

  constructor(
    private destajistasService: DestajistasService,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getDestajistas();
    //paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
  }

  ngOnDestroy(){
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  getDestajistas(){
    this.destajistasService.getDestajistas().subscribe(
      ( destajistas => {
        this.destajistas = destajistas.filter( destajista => destajista.activo === 1);
        console.log(this.destajistas);
        this.destajistasTemp = this.destajistas;
        console.log(this.destajistasTemp);
        this.dataSource.data = this.destajistas;
      }),
      (error => console.log(error.message))
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.destajistasTemp[0]);
    // Removes last "$$index" from "column"
    columns.splice(columns.length - 1);
    //console.log(columns);

    if (!columns.length)
      return;

    const rows = this.destajistasTemp.filter(function(d) {
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

  openDialoAlertDelete(idDest) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: idDest
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const destajistaBaja = {
          idDestajista: idDest,
          activo: 0,
          // usuarioModifico: this.idUsuarioLogeado
        };
        // console.log(destajistaBaja);
        this.destajistasService.deleteDestajista(destajistaBaja).subscribe(
          response => {
            console.log(response);
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getDestajistas();
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
