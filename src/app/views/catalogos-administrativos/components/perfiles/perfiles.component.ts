import { Component, OnInit,  ViewChild, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { Perfil } from './../../../../shared/models/perfil';
import { PerfilesService } from './../../../../shared/services/perfiles.service';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { ModalEliminarComponent } from './../modal-eliminar/modal-eliminar.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.scss']
})
export class PerfilesComponent implements OnInit {

  perfiles: Perfil[] = [];
  perfilesTemp: Perfil[] = [];
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Perfil> = new MatTableDataSource<Perfil>();

  constructor(
    private perfilesService: PerfilesService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPerfiles();
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

  getPerfiles(){
    this.perfilesService.getAllPerfiles().subscribe(
      ( (perfiles: Perfil[]) => {
        this.perfiles = perfiles.filter(perfil => perfil.activo !== 0);
        console.log(this.perfiles);
        this.perfilesTemp = this.perfiles;
        this.dataSource.data = this.perfiles;
      }),
      (error => console.log(error))
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.perfilesTemp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.perfilesTemp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    })

    this.dataSource.data = rows;
    // console.log(this.dataSource.data);
  }

  openDialoAlertDelete(id) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const dataPerfil = {
          idPerfil: id,
          activo: 0
        };
        console.log(result);
        console.log(id);
        this.perfilesService.deletePerfil(dataPerfil).subscribe(
          (response:any) => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.getPerfiles();
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
