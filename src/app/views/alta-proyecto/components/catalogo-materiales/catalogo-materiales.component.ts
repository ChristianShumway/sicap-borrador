import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obra } from '../../../../shared/models/obra';
import { Material } from './../../../../shared/models/material';
import { MaterialService } from './../../../../shared/services/material.service';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AgregarMaterialExtraordinarioComponent } from '../agregar-material-extraordinario/agregar-material-extraordinario.component';

@Component({
  selector: 'app-catalogo-materiales',
  templateUrl: './catalogo-materiales.component.html',
  styleUrls: ['./catalogo-materiales.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CatalogoMaterialesComponent implements OnInit {

  @Input() obra: Obra;
  public uploaderCatalogo: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOver: boolean = false;
  private catalogoMaterialesObs$: Observable<Material>;
  listaMateriales: Material[];

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
    private catalogoMaterialesService: MaterialService,
    private bottomSheet: MatBottomSheet
  ) { }


  ngOnInit() {
    this.verifyMaterialsExist();
    this.initUploadCatalogo();
  }

  verifyMaterialsExist() {
    this.catalogoMaterialesService.getCatalogObservable(this.obra.idObra);
    this.catalogoMaterialesObs$ = this.catalogoMaterialesService.getDataCatalogo();
    this.columns = this.catalogoMaterialesService.getDataColumns();
  }

  initUploadCatalogo() {
    this.rutaServe = environment.apiURL;
    this.rutaImg = environment.imageServe;
    this.host = environment.host;

    const headers = [{ name: 'Accept', value: 'application/json' }];
    this.uploaderCatalogo = new FileUploader({ url: this.rutaServe + '/obra/uploadMaterial', autoUpload: true, headers: headers });
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
        this.listaMateriales = result.response;
        this.catalogoMaterialesService.getCatalogObservable(this.obra.idObra);
        this.columns = this.catalogoMaterialesService.getDataColumns();
        this.rows = this.temp = this.listaMateriales;
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

  openBottomExtraordinario(): void {
    let sheet = this.bottomSheet.open(AgregarMaterialExtraordinarioComponent, {
      data: {
        idObra:this.obra.idObra, 

      }
    });

    sheet.backdropClick().subscribe( () => {
      console.log('clicked'+this.obra.idObra);
    });  
  }

}
