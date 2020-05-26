import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ObraService } from '../../../../shared/services/obra.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Obra } from './../../../../shared/models/obra';
import { environment } from './../../../../../environments/environment';
import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { DatePipe } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ObservacionObraGeneralComponent } from '../observacion-obra-general/observacion-obra-general.component';
import { Usuario } from '../../../../shared/models/usuario';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { BitacoraObraComponent } from './../bitacora-obra/bitacora-obra.component';
import { ReporteManoObraService } from './../../../../shared/services/reporte-mano-obra.service';
import { ReporteConceptosEjecutadosService } from '../../../../shared/services/reporte-conceptos-ejecutados.service';
import { ReporteSubcontratoService } from '../../../../shared/services/reporte-subcontrato.service';
import { ReporteMaterialService } from './../../../../shared/services/reporte-material.service';
import { ReporteMaquinariaEquipoService } from './../../../../shared/services/reporte-maquinaria-equipo.service';
import { ReporteIngresosEgresosService } from './../../../../shared/services/reporte-ingresos-egresos.service';
import { ValidacionReporteService } from './../../../../shared/services/validacion-reporte.service';

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
  estatusObraPeriodo: number;
  diasFaltantesObra: number;
  idUserLogeado;
  porcentajeEjecucionFaltante: number;
  accesoBitacora = false;
  option: string;

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
    private reporteManoObraService: ReporteManoObraService,
    private reporteConceptosEjecutadosService: ReporteConceptosEjecutadosService,
    private reporteSubcontratoService: ReporteSubcontratoService,
    private reporteMaterialService: ReporteMaterialService,
    private reporteMaquinariaEquipoService: ReporteMaquinariaEquipoService,
    private reporteIngresosEgresosService: ReporteIngresosEgresosService,
    private validacionReporteService: ValidacionReporteService,
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
    this.activatedRoute.params.subscribe( (option: Params) => {
    this.option = option.tipo;
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
              this.accesoBitacora = true;
              this.obras.push(obra);
            }
          });

          obra.usuarioCliente.map( (usuario: Usuario) => {
            if(usuario.idUsuario === this.idUserLogeado) {
              this.obras.push(obra);
            }
          });

        });

        this.obrasTemp = this.obras;
        this.dataSource.data = this.obras;
        this.vadilateStatus(this.obras);
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

    // console.log(this.permisosEspecialesComponente);

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

  vadilateStatus(obras){
    const format = 'yyyy/MM/dd';
    const nuevaFechaActual = this.pipe.transform(this.fechaActual, format);
    let fechaActual = new Date(nuevaFechaActual).getTime();

    obras.map( (obra: Obra) => { 
      let fechaFinObra    = new Date(obra.fechaFin).getTime();
      let plazoEjecucion = fechaFinObra - fechaActual;
      const diasFaltantes = Math.ceil(plazoEjecucion/(1000*60*60*24));

      this.porcentajeEjecucionFaltante = (diasFaltantes/obra.plazoEjecucion) * 100;
      // console.log(this.porcentajeEjecucionFaltante);
    })
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
    // console.log(this.dataSource.data);
  }

  abrirAltaComentario(idObra): void {
    let sheet = this.bottomSheet.open(ObservacionObraGeneralComponent, {
    data: {
      idObra: idObra,
      idUsuario: this.idUserLogeado
    }
    });

    sheet.backdropClick().subscribe( () => {
      console.log('clicked' + idObra);
    });  
  }

  viewComments(idObra): void{
    const dialogRef = this.dialog.open(BitacoraObraComponent, {
      panelClass: 'custom-dialog-container-bitacora',
      data:{
        idObra,
        idUsuario: this.idUserLogeado
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  exportarReporte(idObra, tipoReporte){
    if(tipoReporte === 'mano-obra'){
      this.reporteManoObraService.getExportable(idObra, this.idUserLogeado).subscribe(
        response => {
          var blob = new Blob([response], {type: 'application/xlsx'});
          var link=document.createElement('a');
        
          var obj_url = window.URL.createObjectURL(blob);		    
          var link = document.createElement("a");
          link.setAttribute("target", "_blank");
          link.setAttribute("href", obj_url);
          link.setAttribute("download","reporte-mano-obra.xlsx");
            
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        }
      );
    } else if(tipoReporte === 'conceptos-ejecutados'){
      this.reporteConceptosEjecutadosService.getExportable(idObra).subscribe(
        response => {
          var blob = new Blob([response], {type: 'application/xlsx'});
          var link=document.createElement('a');
        
          var obj_url = window.URL.createObjectURL(blob);		    
          var link = document.createElement("a");
          link.setAttribute("target", "_blank");
          link.setAttribute("href", obj_url);
          link.setAttribute("download","reporte-conceptos-ejecutados.xlsx");
            
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        }
      );
    } else if(tipoReporte === 'subcontratos'){
      this.reporteSubcontratoService.getExportable(idObra, this.idUserLogeado).subscribe(
        response => {
          var blob = new Blob([response], {type: 'application/xlsx'});
          var link=document.createElement('a');
        
          var obj_url = window.URL.createObjectURL(blob);		    
          var link = document.createElement("a");
          link.setAttribute("target", "_blank");
          link.setAttribute("href", obj_url);
          link.setAttribute("download","reporte-subcontratos.xlsx");
            
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        }
      );
    } else if(tipoReporte === 'materiales'){
      this.reporteMaterialService.getExportable(idObra, this.idUserLogeado).subscribe(
        response => {
          var blob = new Blob([response], {type: 'application/xlsx'});
          var link=document.createElement('a');
        
          var obj_url = window.URL.createObjectURL(blob);		    
          var link = document.createElement("a");
          link.setAttribute("target", "_blank");
          link.setAttribute("href", obj_url);
          link.setAttribute("download","reporte-materiales.xlsx");
            
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        }
      );
    } else if(tipoReporte === 'maquinaria-equipo'){
      this.reporteMaquinariaEquipoService.getExportable(idObra, this.idUserLogeado).subscribe(
        response => {
          var blob = new Blob([response], {type: 'application/xlsx'});
          var link=document.createElement('a');
        
          var obj_url = window.URL.createObjectURL(blob);		    
          var link = document.createElement("a");
          link.setAttribute("target", "_blank");
          link.setAttribute("href", obj_url);
          link.setAttribute("download","reporte-maquinaria-equipo.xlsx");
            
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        }
      );
    } else if(tipoReporte === 'ingresos-egresos'){
      this.reporteIngresosEgresosService.getExportable(idObra).subscribe(
        response => {
          var blob = new Blob([response], {type: 'application/xlsx'});
          var link=document.createElement('a');
        
          var obj_url = window.URL.createObjectURL(blob);		    
          var link = document.createElement("a");
          link.setAttribute("target", "_blank");
          link.setAttribute("href", obj_url);
          link.setAttribute("download","reporte-ingresos-egresos.xlsx");
            
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        }
      );
    } else if(tipoReporte === 'validacion') {
      this.validacionReporteService.getExportable(idObra, this.idUserLogeado).subscribe(
        response => {
          var blob = new Blob([response], {type: 'application/xlsx'});
          var link=document.createElement('a');
        
          var obj_url = window.URL.createObjectURL(blob);		    
          var link = document.createElement("a");
          link.setAttribute("target", "_blank");
          link.setAttribute("href", obj_url);
          link.setAttribute("download","reporte-validaciones.xlsx");
            
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        }
      );
    } else if(tipoReporte === 'bitacora-obra') {
      this.reporteManoObraService.getExportableBitacota(idObra).subscribe(
        response => {
          var blob = new Blob([response], {type: 'application/xlsx'});
          var link=document.createElement('a');
        
          var obj_url = window.URL.createObjectURL(blob);		    
          var link = document.createElement("a");
          link.setAttribute("target", "_blank");
          link.setAttribute("href", obj_url);
          link.setAttribute("download","reporte-bitacora-obra.xlsx");
            
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        }
      );
    }
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
