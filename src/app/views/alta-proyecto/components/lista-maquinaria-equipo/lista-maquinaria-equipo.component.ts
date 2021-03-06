import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaMaquinariaEquipo } from './../../../../shared/models/lista-maquinaria-equipo';
import { ListaMaquinariaEquipoService } from './../../../../shared/services/lista-maquinaria-equipo.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { AgregarEquipoComponent } from '../agregar-equipo/agregar-equipo.component';
import { MatBottomSheet } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-lista-maquinaria-equipo',
  templateUrl: './lista-maquinaria-equipo.component.html',
  styleUrls: ['./lista-maquinaria-equipo.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ListaMaquinariaEquipoComponent implements OnInit {

  public uploaderListaMaqEquipo: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOver: boolean = false;
  private ListaMaqEquipoObs$: Observable<ListaMaquinariaEquipo>;
  listaMaquinariaEquipo: ListaMaquinariaEquipo[];
  idObra;
  usuarioLogeado;

  rutaImg: string;
  host: string;
  rutaServe: string;
  loadingFile = false;
  materialesExistentes= false;
  nameFile: string;

  rows = [];
  columns = [];
  temp = [];
  columnsToDisplay =   ['no','descripcion','clave','placas','cantidad', 'unidad','precio','importe'];
  expandedElement: any | null;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  constructor(
    private snackBar: MatSnackBar,
    private listaMaquinariaEquipoService: ListaMaquinariaEquipoService,
    private activatedRoute: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
  ) { }


  ngOnInit() {
    this.usuarioLogeado = this.autenticacionService.currentUserValue;
    this.getObra();
    this.verifyPersonalExist();
    this.initUploadList();
  }

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = data.id;
    })
  }

  verifyPersonalExist() {
    this.listaMaquinariaEquipoService.getListObservable(this.idObra, this.usuarioLogeado);
    this.ListaMaqEquipoObs$ = this.listaMaquinariaEquipoService.getDataListaMaquinariaEquipo();
  }

  initUploadList() {
    this.rutaServe = environment.apiURL;
    this.rutaImg = environment.imageServe;
    this.host = environment.host;

    const headers = [{ name: 'Accept', value: 'application/json' }];
    this.uploaderListaMaqEquipo = new FileUploader({ url: this.rutaServe + '/obra/uploadFileObraDetails', autoUpload: true, headers: headers });
    this.uploaderListaMaqEquipo.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('idObra', this.idObra);
      form.append('typeFile', 2)
      form.append('idUserAdd ', this.usuarioLogeado);
      this.loadingFile = true;
    };
    this.uploaderListaMaqEquipo.uploadAll();
    this.uploaderListaMaqEquipo.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.loadingFile = false;
      const result = JSON.parse(response);
      console.log(result);
      if(result.estatus == "05"){
        this.listaMaquinariaEquipo = result.response;
        this.listaMaquinariaEquipoService.getListObservable(this.idObra, this.usuarioLogeado);
        // this.columns = this.listaMaquinariaEquipoService.getDataColumns();
        this.rows = this.temp = this.listaMaquinariaEquipo;
        this.useAlerts(result.mensaje, ' ', 'success-dialog');
      } else {
        this.useAlerts(result.mensaje, ' ', 'error-dialog');
      }
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  updateFilter(event, cat) {
    this.temp = cat;
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    // Removes last "$$index" from "column"
    columns.splice(columns.length - 1);

    // console.log(columns);
    if (!columns.length)
      return;

    const rows = this.temp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    this.rows = rows;
  }

  eliminarLista(idArchivo) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: this.idObra
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.listaMaquinariaEquipoService.removeListaMaquinariaEquipo(idArchivo, this.usuarioLogeado).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.listaMaquinariaEquipoService.getListObservable(this.idObra, this.usuarioLogeado);
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
  openBottomExtra(idArchivoObra): void {
    let sheet = this.bottomSheet.open(AgregarEquipoComponent, {
      data: {
        idObra:this.idObra, 
        idUsuario: this.usuarioLogeado,
        tipoCatalogo: 'equipo',
        idArchivoObra
      }
    });

    sheet.backdropClick().subscribe( () => {
      console.log('clicked'+this.idObra);
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
