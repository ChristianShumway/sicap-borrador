import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';

import { environment } from './../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { ObraService } from './../../../../shared/services/obra.service';

@Component({
  selector: 'app-subir-evidencias',
  templateUrl: './subir-evidencias.component.html',
  styleUrls: ['./subir-evidencias.component.scss']
})
export class SubirEvidenciasComponent implements OnInit {

  public uploaderEvidence: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOver: boolean = false;

  rutaImg: string;
  host: string;
  rutaServe: string;
  loadingFile = false;

  constructor(
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<SubirEvidenciasComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private obraService: ObraService,
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.initUploadEvidence();
    // this.bottomSheetRef.dismiss();
  }

  initUploadEvidence() {
    this.rutaServe = environment.apiURL;
    this.rutaImg = environment.imageServe;
    this.host = environment.host;

    const headers = [{ name: 'Accept', value: 'application/json' }];
    this.uploaderEvidence = new FileUploader({ url: this.rutaServe + '/obra/uploadFileObra', autoUpload: true, headers: headers });
    this.uploaderEvidence.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('idObra', this.data.idObra);
      form.append('idUserAdd', this.data.idUsuario);
      this.loadingFile = true;
      console.log(this.loadingFile);
    };
    this.uploaderEvidence.uploadAll();
    this.uploaderEvidence.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.loadingFile = false;
      if(item.isSuccess){
        // this.obraService.getArchivoObraObservable(this.data.idObra, 1, this.data.idUsuario);
        this.useAlerts('Documento cargado', ' ', 'success-dialog');
      } else {
        this.useAlerts('Documento no se subió', ' ', 'error-dialog');
      }
      this.bottomSheetRef.dismiss(); 
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
