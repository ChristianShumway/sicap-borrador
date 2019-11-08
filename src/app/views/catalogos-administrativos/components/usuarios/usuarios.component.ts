import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { VistaUsuarioComponent } from '../vista-usuario/vista-usuario.component';
import { ModalEliminarUsuarioComponent } from '../modal-eliminar-usuario/modal-eliminar-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  users = [];
  usersTemp = [];
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  obs$: Observable<any>;
  // dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>(DATA);
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();



  constructor(
    private usuariosService: UsuariosService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
    this.usersTemp = this.users;
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
  
  getUsers(){
    this.users = this.usuariosService.getUsuarios();
    this.dataSource.data = this.users;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.usersTemp[0]);
    // Removes last "$$index" from "column"
    columns.splice(columns.length - 1);
    //console.log(columns);

    if (!columns.length)
      return;

    const rows = this.usersTemp.filter(function(d) {
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

  openDialogUser(user): void {
    console.log(user);
    const dialogRef = this.dialog.open(VistaUsuarioComponent, {
      width: '460px',
      panelClass: 'custom-dialog-container-user',
      data: {...user}
    });

    dialogRef.afterClosed().subscribe(result => {
      const {opcion, id} = result[0];
      switch (opcion) {
        case 'mensaje':
          break;
        case 'editar':
          this.router.navigate([`/catalogos-administrativos/modificar-usuario/${id}`])
          break;
        case 'eliminar':
          this.openDialoAlertDelete(id);
          break;
        default:
          break;
      }
    });
  }

  openDialoAlertDelete(id) {
    const dialogRef = this.dialog.open(ModalEliminarUsuarioComponent, {
      width: '300px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        console.log(id);
      }
    });
  }

}
