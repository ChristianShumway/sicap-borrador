import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obra } from '../../../../shared/models/obra';
import { CatalogoConceptosService } from './../../../../shared/services/catalogo-conceptos.service';
import { CatalogoConceptos } from './../../../../shared/models/catalogo-conceptos';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AgregarConceptoExtraordinarioComponent } from '../agregar-concepto-extraordinario/agregar-concepto-extraordinario.component';
import { ActivatedRoute, Params } from '@angular/router';
import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-catalogo-conceptos',
  templateUrl: './catalogo-conceptos.component.html',
  styleUrls: ['./catalogo-conceptos.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CatalogoConceptosComponent implements OnInit {

  // @Input() obra: Obra;
  public uploaderCatalogo: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOver: boolean = false;
  private catalogoConceptosObs$: Observable<CatalogoConceptos>;
  listaConceptos: CatalogoConceptos[];
  idObra;
  usuarioLogeado;

  rutaImg: string;
  host: string;
  rutaServe: string;
  loadingFile = false;
  conceptosExistentes= false;
  nameFile: string;

  rows = [];
  columns = [];
  temp = [];

  constructor(
    private snackBar: MatSnackBar,
    private catalogoConceptosService: CatalogoConceptosService,
    private bottomSheet: MatBottomSheet,
    private activatedRoute: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    public dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.getObra();
    this.verifyConceptsExist();
    this.initUploadCatalogo();
    this.usuarioLogeado = this.autenticacionService.currentUserValue;
  }

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = data.id;
      this.catalogoConceptosService.getCatalogoObra(this.idObra)
      .subscribe( 
        conceptos => {
          console.log(conceptos);
          this.temp = conceptos;
        }
      );
    })
  }

  verifyConceptsExist() {
    this.catalogoConceptosService.getCatalogObservable(this.idObra);
    this.catalogoConceptosObs$ = this.catalogoConceptosService.getDataCatalogo();
    this.columns = this.catalogoConceptosService.getDataColumns();
  }

  initUploadCatalogo() {
    this.rutaServe = environment.apiURL;
    this.rutaImg = environment.imageServe;
    this.host = environment.host;

    const headers = [{ name: 'Accept', value: 'application/json' }];
    this.uploaderCatalogo = new FileUploader({ url: this.rutaServe + '/obra/uploadConcepts', autoUpload: true, headers: headers });
    this.uploaderCatalogo.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('idObra', this.idObra);
      form.append('idUsuario', this.usuarioLogeado);
      this.loadingFile = true;
    };
    this.uploaderCatalogo.uploadAll();
    this.uploaderCatalogo.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.loadingFile = false;
      const result = JSON.parse(response);
      console.log(result);
      if(result.estatus == "05"){
        this.listaConceptos = result.response;
        this.catalogoConceptosService.getCatalogObservable(this.idObra);
        this.columns = this.catalogoConceptosService.getDataColumns();
        this.rows = this.temp = this.listaConceptos;
        this.useAlerts(result.mensaje, ' ', 'success-dialog');
      } else {
        this.useAlerts(result.mensaje, ' ', 'error-dialog');
      }
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.temp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    this.rows = rows;
  }

  eliminarCatalogo() {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: this.idObra
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.catalogoConceptosService.removeCatalogoObra(this.idObra).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.catalogoConceptosService.getCatalogObservable(this.idObra);
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

  openBottomExtraordinario(): void {
    let sheet = this.bottomSheet.open(AgregarConceptoExtraordinarioComponent, {
      data: {
        idObra:this.idObra, 
        idUsuario: this.usuarioLogeado
      }
    });

    sheet.backdropClick().subscribe( () => {
      console.log('clicked'+this.idObra);
    });  
  }

}
