import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obra } from '../../../../shared/models/obra';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CatalogoConceptosService } from './../../../../shared/services/catalogo-conceptos.service';
import { CatalogoConceptos } from './../../../../shared/models/catalogo-conceptos';

@Component({
  selector: 'app-catalogo-conceptos',
  templateUrl: './catalogo-conceptos.component.html',
  styleUrls: ['./catalogo-conceptos.component.scss']
})
export class CatalogoConceptosComponent implements OnInit {

  @Input() obra: Obra;
  displayedColumns: string[] = ['numero', 'descripcion', 'unidad', 'cantidad', 'precioUnitario', 'importe'];
  dataSource;
  public uploaderCatalogo: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOver: boolean = false;
  rutaImg: string;
  host: string;
  rutaServe: string;
  conceptos: CatalogoConceptos[];

  constructor(
    private snackBar: MatSnackBar,
    private catalogoConceptosService: CatalogoConceptosService
  ) { }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  ngOnInit() {
    this.initUploadCatalogo();
    this.getCatalogo();
  }

  initUploadCatalogo() {
    this.rutaServe = environment.apiURL;
    this.rutaImg = environment.imageServe;
    this.host = environment.host;
    const headers = [{ name: 'Accept', value: 'application/json' }];
    this.uploaderCatalogo = new FileUploader({ url: this.rutaServe + '/user/uploadImageUser', autoUpload: true, headers: headers });
    this.uploaderCatalogo.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('idUser', this.obra.supervisor.idUsuario);
    };
    this.uploaderCatalogo.uploadAll();
    this.uploaderCatalogo.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.obra.supervisor.imagen = item.some.name;
      this.useAlerts('Imágen de perfil actualizada', ' ', 'success-dialog');
    };
  }

  getCatalogo(){
    this.conceptos = this.catalogoConceptosService.catalogoConceptosTemp;
    this.dataSource = new MatTableDataSource(this.conceptos);
    this.dataSource.paginator = this.paginator;
    console.log(this.conceptos);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
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
