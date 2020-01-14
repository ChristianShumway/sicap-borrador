import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Empresa } from './../../../../shared/models/empresa';
import { EmpresasService } from './../../../../shared/services/empresas.service';
import { UsuariosService } from './../../../../shared/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { environment } from './../../../../../environments/environment';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[] = [];
  empresasTemp: Empresa[] = [];
  rutaImg: string;
  host: string;
  idUsuarioLogeado;


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Empresa> = new MatTableDataSource<Empresa>();

  constructor(
    private empresasService: EmpresasService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar,
    private usuariosService: UsuariosService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getEmpresas();
    //paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  getEmpresas() {
    this.empresasService.getAllEmpresas().subscribe(
      ((empresas: Empresa[]) => {
        this.empresas = empresas.filter(empresa => empresa.activo !== 0);
        console.log(this.empresas);
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

    const rows = this.empresasTemp.filter(function (d) {
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

  openDialoAlertDelete(idE) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: idE
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const dataEmpresa = {
          idEmpresa: idE,
          activo: 0,
          // usuarioModifico: this.idUsuarioLogeado
        };
        this.usuariosService.getUsuarios().subscribe(
          response => {
            const usuarios = response.filter(usuario => usuario.perfil.nombre !== 'Bajas' && usuario.idEmpresa === idE);
            const usuariosPertenecientesEmpresa = usuarios.length;
            if (usuariosPertenecientesEmpresa === 0) {
              // ELIMINAR EMPRESA SI NO TIENE USUARIOS
              this.empresasService.deleteEmpresa(dataEmpresa).subscribe(
                (response: any) => {
                  if (response.estatus === '05') {
                    this.useAlerts(response.mensaje, ' ', 'success-dialog');
                    this.getEmpresas();
                  } else {
                    this.useAlerts(response.mensaje, ' ', 'error-dialog');
                  }
                },
                error => {
                  console.log(error);
                  this.useAlerts(error.message, ' ', 'error-dialog');
                }
              );
            } else {
              this.useAlerts('No es posible eliminar empresa ya que tiene usuarios activos pertenecientes a la misma', ' ', 'error-dialog');
            }
          },
          error => console.log('no se obtuvieron los usuario')
        );

      }
    });
  }

  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
