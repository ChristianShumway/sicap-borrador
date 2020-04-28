import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import { environment } from './../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { ObraService } from './../../../../shared/services/obra.service';

@Component({
  selector: 'app-alta-documento',
  templateUrl: './alta-documento.component.html',
  styleUrls: ['./alta-documento.component.scss']
})
export class AltaDocumentoComponent implements OnInit {
  public uploaderArchivo: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOver: boolean = false;

  rutaImg: string;
  host: string;
  rutaServe: string;
  loadingFile = false;

  constructor(
    private snackBar: MatSnackBar,
    private obraService: ObraService,
    private bottomSheetRef: MatBottomSheetRef<AltaDocumentoComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.initUploadCatalogo();
  }

  initUploadCatalogo() {
    this.rutaServe = environment.apiURL;
    this.rutaImg = environment.imageServe;
    this.host = environment.host;

    const headers = [{ name: 'Accept', value: 'application/json'}];
    this.uploaderArchivo = new FileUploader({ url: this.rutaServe + '/obra/uploadFileObra', autoUpload: true, headers: headers });
    this.uploaderArchivo.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('idObra', this.data.idObra);
      form.append('idUserAdd', this.data.idUsuario);
      this.loadingFile = true;
      // console.log(this.loadingFile);
    };
    this.uploaderArchivo.uploadAll();
    this.uploaderArchivo.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.loadingFile = false;
      // console.log(item);
      // console.log(response);
      const result = JSON.parse(response);
      console.log(result);

      if (result != undefined) {
        if(result.noEstatus === 5) {
          this.obraService.getArchivoObraObservable(this.data.idObra, 1, this.data.idUsuario);
          this.useAlerts(result.mensaje, ' ', 'success-dialog');
        } else {
          this.useAlerts(result.mensaje, ' ', 'error-dialog');
        }
      } else {
        this.useAlerts('Ocurrio un error, favor de reportar', ' ', 'error-dialog');
      }

      this.bottomSheetRef.dismiss(); 

      // if(item.isSuccess){
      //   this.obraService.getArchivoObraObservable(this.data.idObra, 1, this.data.idUsuario);
      //   this.useAlerts('Documento cargado', ' ', 'success-dialog');
      // } else {
      //   this.useAlerts('Documento no se subió', ' ', 'error-dialog');
      // }
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
