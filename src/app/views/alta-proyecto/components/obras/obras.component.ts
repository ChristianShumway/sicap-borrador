import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ObraService } from '../../../../shared/services/obra.service';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { ModalEliminarComponent } from './../../../catalogos-administrativos/components/modal-eliminar/modal-eliminar.component';
import { Obra } from './../../../../shared/models/obra';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.scss']
})
export class ObrasComponent implements OnInit {

  obras: Obra[] = [];
  obrasTemp: Obra[] = [];
  rutaImg: string;
  host: string;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Obra> = new MatTableDataSource<Obra>();



  constructor(
    private obraService: ObraService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getObrasTemp();
    //paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
  }
  
  ngOnDestroy(){
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  getObrasTemp() {
    this.obras = this.obraService.obrasTemp;
    this.obrasTemp = this.obras;
    this.dataSource.data = this.obras;
  }
  
  // getObras(){
  //   this.obraService.getUsuarios().subscribe(
  //     ( users => {
  //       this.users = users.filter( user => user.idPerfil !== 4);
  //       console.log(this.users);
  //       this.usersTemp = this.users;
  //       console.log(this.usersTemp);
  //       this.dataSource.data = this.users;
  //     }),
  //     (error => console.log(error.message))
  //   );
  // }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.obrasTemp[0]);
    // Removes last "$$index" from "column"
    columns.splice(columns.length - 1);
    //console.log(columns);

    if (!columns.length)
      return;

    const rows = this.obrasTemp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        //console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    })

    this.dataSource.data = rows;
    console.log(this.dataSource.data);
  }

  openDialoAlertDelete(idObra) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: idObra
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // console.log(result);
        // console.log(user);
        const usuarioBaja = {
          idObra: idObra,
          activo: 0
        };
        console.log(usuarioBaja);
        // this.obraService.updateUsuario(usuarioBaja).subscribe(
        //   response => {
        //     console.log(response);
        //     if(response.estatus === '05'){
        //       this.useAlerts(response.mensaje, ' ', 'success-dialog');
        //       this.getUsers();
        //     } else {
        //       this.useAlerts(response.mensaje, ' ', 'error-dialog');
        //     }
        //   },
        //     error => {
        //     this.useAlerts(error.message, ' ', 'error-dialog');
        //     console.log(error);
        //   }
        // );
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
