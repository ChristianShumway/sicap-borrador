import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ObraService } from '../../../../shared/services/obra.service';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { NavigationService } from '../../../../shared/services/navigation.service';

import { Obra } from './../../../../shared/models/obra';
import { Usuario } from '../../../../shared/models/usuario';

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
  fechaActual = new Date();
  pipe = new DatePipe('en-US');
  idUserLogeado;
  option: string;
  usuarioIdentificado = true;

  nombreComponente = 'validacion-reportes';
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
    private router: Router,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    private bottomSheet: MatBottomSheet,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private usuariosService: UsuariosService,
  ) { }

  ngOnInit() {
    this.idUserLogeado = this.autenticacionService.currentUserValue;
    this.getObras();
    // this.getDataUser();
    //paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
    this.activatedRoute.params.subscribe( (option: Params) => {
    this.option = option.reporte;
    console.log(this.option);
   });
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  getObras() {
    this.obraService.getObras().subscribe(
      ((obras: Obra[]) => {
        // console.log(obras);
        const obrasActivas = obras.filter(obra => obra.activo === 1);

        obrasActivas.map( (obra: Obra) => {
          if(obra.idGerente === this.idUserLogeado){
            this.obras.push(obra);
          }

          if(obra.idPlaneacionPresupuesto === this.idUserLogeado && obra.idGerente !== obra.idPlaneacionPresupuesto){
            this.obras.push(obra);
          } else {
            this.usuarioIdentificado = false;
          }
          if(obra.idControlObra === this.idUserLogeado  && obra.idGerente !== obra.idControlObra){
            this.obras.push(obra);
          } else {
            this.usuarioIdentificado = false;
          }
          if(obra.idCompras === this.idUserLogeado  && obra.idGerente !== obra.idCompras){
            this.obras.push(obra);
          } else {
            this.usuarioIdentificado = false;
          }

          obra.supervisor.map( (supervisor: Usuario) => {
            if (supervisor.idUsuario === this.idUserLogeado  && obra.idGerente !== supervisor.idUsuario && obra.idControlObra !== supervisor.idUsuario){
              this.obras.push(obra);
            }  else {
              this.usuarioIdentificado = false;
            }
            // this.accesoBitacora = true;
          });

          obra.usuarioCliente.map( (usuario: Usuario) => {
            if(usuario.idUsuario === this.idUserLogeado) {
              this.obras.push(obra);
            }  else {
              this.usuarioIdentificado = false;
            }
          });

        });
        
        // this.obras = obrasActivas;
        // console.log(this.obras);
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
      this.useAlerts('No se encontraron obras con esta referencia', ' ', 'error-dialog');
    } else {
      this.useAlerts(`Fueron encontradas ${rows.length} obras con esta referencia`, ' ', 'success-dialog');
    }

    this.dataSource.data = rows;
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
