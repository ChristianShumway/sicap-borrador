import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { VistaUsuarioComponent } from '../vista-usuario/vista-usuario.component';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { Usuario } from './../../../../shared/models/usuario';
import { environment } from './../../../../../environments/environment';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  users: Usuario[] = [];
  usersTemp: Usuario[] = [];
  rutaImg: string;
  host: string;
  idUsuarioLogeado
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();



  constructor(
    private usuariosService: UsuariosService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getUsers();
    //paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
  }
  
  ngOnDestroy(){
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
  
  getUsers(){
    this.usuariosService.getUsuarios().subscribe(
      ( users => {
        this.users = users.filter( user => user.idPerfil !== 4);
        console.log(this.users);
        this.usersTemp = this.users;
        console.log(this.usersTemp);
        this.dataSource.data = this.users;
      }),
      (error => console.log(error.message))
    );
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
          const urlWpp = `https://api.whatsapp.com/api/send?phone=${id}`;
          window.open(urlWpp);
          break;
        case 'editar':
          this.router.navigate([`/configuracion/modificar-usuario/${id}`])
          break;
        case 'eliminar':
          this.openDialoAlertDelete(id);
          break;
        default:
          break;
      }
    });
  }

  openDialoAlertDelete(user) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // console.log(result);
        // console.log(user);
        const usuarioBaja = {
          ...user,
          idPerfil: 4,
          // usuarioModifico: this.idUsuarioLogeado
        };
        // console.log(usuarioBaja);
        this.usuariosService.updateUsuario(usuarioBaja).subscribe(
          response => {
            console.log(response);
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getUsers();
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

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
