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
import { ActivatedRoute, Params } from '@angular/router';
import { AutenticacionService } from 'app/shared/services/autenticacion.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-catalogo-materiales',
  templateUrl: './catalogo-materiales.component.html',
  styleUrls: ['./catalogo-materiales.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CatalogoMaterialesComponent implements OnInit {

  // @Input() obra: Obra;
  public uploaderCatalogo: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOver: boolean = false;
  private catalogoMaterialesObs$: Observable<Material>;
  listaMateriales: Material[];
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
    private catalogoMaterialesService: MaterialService,
    private bottomSheet: MatBottomSheet,
    private activatedRoute: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    public dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.getObra();
    this.verifyMaterialsExist();
    this.initUploadCatalogo();
    this.usuarioLogeado = this.autenticacionService.currentUserValue;
  }

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = data.id;
    })
  }

  verifyMaterialsExist() {
    this.catalogoMaterialesService.getCatalogObservable(this.idObra);
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
        this.listaMateriales = result.response;
        this.catalogoMaterialesService.getCatalogObservable(this.idObra);
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

  eliminarCatalogo() {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: this.idObra
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.catalogoMaterialesService.removeCatalogoMateriales(this.idObra).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.catalogoMaterialesService.getCatalogObservable(this.idObra);
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
    let sheet = this.bottomSheet.open(AgregarMaterialExtraordinarioComponent, {
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
