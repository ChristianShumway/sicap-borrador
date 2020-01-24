import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaPersonal } from './../../../../shared/models/lista-personal';
import { ListaPersonalService } from './../../../../shared/services/lista-personal.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-lista-personal',
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ListaPersonalComponent implements OnInit {

  public uploaderListaPersonal: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOver: boolean = false;
  private ListaPersonalObs$: Observable<ListaPersonal>;
  listaPersonal: ListaPersonal[];
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

  constructor(
    private snackBar: MatSnackBar,
    private listaPersonalService: ListaPersonalService,
    private activatedRoute: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    public dialog: MatDialog,
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
      this.listaPersonalService.getListaPersonal(this.idObra, this.usuarioLogeado).subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error)
      );
    })
  }

  verifyPersonalExist() {
    this.listaPersonalService.getListObservable(this.idObra, this.usuarioLogeado);
    this.ListaPersonalObs$ = this.listaPersonalService.getDataListaPersonal();
  }

  initUploadList() {
    this.rutaServe = environment.apiURL;
    this.rutaImg = environment.imageServe;
    this.host = environment.host;

    const headers = [{ name: 'Accept', value: 'application/json' }];
    this.uploaderListaPersonal = new FileUploader({ url: this.rutaServe + '/obra/uploadFileObraDetails', autoUpload: true, headers: headers });
    this.uploaderListaPersonal.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('idObra', this.idObra);
      form.append('typeFile', 1)
      form.append('idUserAdd ', this.usuarioLogeado);
      this.loadingFile = true;
    };
    this.uploaderListaPersonal.uploadAll();
    this.uploaderListaPersonal.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.loadingFile = false;
      const result = JSON.parse(response);
      console.log(result);
      if(result.estatus == "05"){
        this.listaPersonal = result.response;
        this.listaPersonalService.getListObservable(this.idObra, this.usuarioLogeado);
        // this.columns = this.listaPersonalService.getDataColumns();
        this.rows = this.temp = this.listaPersonal;
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
        this.listaPersonalService.removeListaPersonal(idArchivo, this.usuarioLogeado).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.listaPersonalService.getListObservable(this.idObra, this.usuarioLogeado);
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

  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
