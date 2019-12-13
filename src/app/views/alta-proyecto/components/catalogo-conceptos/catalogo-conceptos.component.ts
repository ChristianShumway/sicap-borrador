import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obra } from '../../../../shared/models/obra';
import { CatalogoConceptosService } from './../../../../shared/services/catalogo-conceptos.service';
import { CatalogoConceptos } from './../../../../shared/models/catalogo-conceptos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogo-conceptos',
  templateUrl: './catalogo-conceptos.component.html',
  styleUrls: ['./catalogo-conceptos.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CatalogoConceptosComponent implements OnInit {

  @Input() obra: Obra;
  public uploaderCatalogo: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOver: boolean = false;
  private catalogoConceptosObs$: Observable<CatalogoConceptos>;
  listaConceptos: CatalogoConceptos[];

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
    private catalogoConceptosService: CatalogoConceptosService
  ) { }


  ngOnInit() {
    this.verifyConceptsExist();
    this.initUploadCatalogo();
  }

  verifyConceptsExist() {
    this.catalogoConceptosService.getCatalogObservable(this.obra.idObra);
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
      form.append('idObra', this.obra.idObra);
      this.loadingFile = true;
    };
    this.uploaderCatalogo.uploadAll();
    this.uploaderCatalogo.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.loadingFile = false;
      const result = JSON.parse(response);
      console.log(result);
      if(result.estatus == "05"){
        this.listaConceptos = result.response;
        this.catalogoConceptosService.getCatalogObservable(this.obra.idObra);
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

  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
