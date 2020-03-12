import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ObraService } from '../../../../shared/services/obra.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Obra } from './../../../../shared/models/obra';
import { environment } from './../../../../../environments/environment';
import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { DatePipe } from '@angular/common';
import { Usuario } from '../../../../shared/models/usuario';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { UsuariosService } from '../../../../shared/services/usuarios.service';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.scss']
})
export class ObrasComponent implements OnInit {

  idUserLogeado;
  obras: Obra[] = [];
  obrasTemp: Obra[] = [];
  fechaActual = new Date();
  pipe = new DatePipe('en-US');
  rutaImg: string;
  host: string;

  nombreComponente = 'solicitudes-suministros-obras';
  permisosEspeciales: any[] = []; //array de objetos que contiene todos los permisos especiales del proyecto
  permisosEspecialesComponente: any[] = []; //array en el que se agregan los objetos que contiene el nombre del componente
  permisosEspecialesPermitidos: any[] = []; //array donde se agrega el nombre de las opciones a las cuales el usuario si tiene permiso

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Obra> = new MatTableDataSource<Obra>();

  constructor(
    private obraService: ObraService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    private navigationService: NavigationService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.idUserLogeado = this.autenticacionService.currentUserValue;
    this.getObras();
    this.getDataUser();
    //paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  getObras() {
    this.obraService.getObras().subscribe(
      ((obras: Obra[]) => {
        console.log(obras);
        const obrasActivas = obras.filter(obra => obra.activo === 1);
        
        obrasActivas.map( (obra: Obra) => {
          if(obra.idGerente === this.idUserLogeado){
            this.obras.push(obra);
          }
          if(obra.idPlaneacionPresupuesto === this.idUserLogeado){
            this.obras.push(obra);
          }
          if(obra.idControlObra === this.idUserLogeado){
            this.obras.push(obra);
          }
          if(obra.idCompras === this.idUserLogeado){
            this.obras.push(obra);
          }
          obra.supervisor.map( (supervisor: Usuario) => {
            
            if (supervisor.idUsuario === this.idUserLogeado){
              this.obras.push(obra);
            }
          });

        });

        this.obrasTemp = this.obras;
        this.dataSource.data = this.obras;
      }),
      (error => console.log(error.message))
    );
  }

  getDataUser(){
    this.usuariosService.getUsuario(this.idUserLogeado).subscribe(
      (usuario: Usuario) => this.validateEspecialPermissions(usuario.idPerfil),
      error => console.log(error)
    );
  }

  validateEspecialPermissions(idPerfil){
    this.permisosEspeciales = environment.permisosEspeciales;

    this.permisosEspeciales.map ( permiso => {
      if( permiso.component === this.nombreComponente){
        this.permisosEspecialesComponente.push(permiso);
      }
    });

    console.log(this.permisosEspecialesComponente);

    this.permisosEspecialesComponente.map( permisoExistente => {
      this.navigationService.validatePermissions(idPerfil, permisoExistente.idOpcion).subscribe(
        (result:any) => {
          // console.log(result);
          if(result.estatus === '05'){
            this.permisosEspecialesPermitidos.push(permisoExistente.tooltip);
          }
        },
        error => console.log(error)
      );
    });

    console.log(this.permisosEspecialesPermitidos);
  }

 
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.obrasTemp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.obrasTemp.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    if(!rows.length){
      this.useAlerts('No se encontraron obras con esta referencia', ' ', 'error-dialog', 500);
    } else {
      this.useAlerts(`Fueron encontradas ${rows.length} obras con esta referencia`, ' ', 'success-dialog', 500);
    }

    this.dataSource.data = rows;
    // console.log(this.dataSource.data);
  }

  useAlerts(message, action, className, time=4000) {
    this.snackBar.open(message, action, {
      duration: time,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
