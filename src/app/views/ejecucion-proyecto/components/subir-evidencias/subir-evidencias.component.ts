import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';

import { environment } from './../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { ReporteConceptosEjecutadosService } from './../../../../shared/services/reporte-conceptos-ejecutados.service';
import { EvidenciaReporte } from './../../../../shared/models/evidencia-reporte';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subir-evidencias',
  templateUrl: './subir-evidencias.component.html',
  styleUrls: ['./subir-evidencias.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SubirEvidenciasComponent implements OnInit {

  public uploaderEvidence: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOver: boolean = false;

  rutaImg: string;
  host: string;
  rutaServe: string;
  loadingFile = false;
  countFiles =1;
  countFileSucces=0;
  countFileError=0;
  private EvidenciasObs$ : Observable<EvidenciaReporte[]>;

  constructor(
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<SubirEvidenciasComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private reporteConceptosEjecutadosService: ReporteConceptosEjecutadosService,
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.initUploadEvidence();
    this.getEvidence()
    // this.bottomSheetRef.dismiss();
  }

  initUploadEvidence() {
    this.rutaServe = environment.apiURL;
    this.rutaImg = environment.imageServe;
    this.host = environment.host;

    const headers = [{ name: 'Accept', value: 'application/json' }];
    this.uploaderEvidence = new FileUploader({ url: this.rutaServe + '/projectExecution/uploadEvidence', autoUpload: true,headers: headers });
    
    this.uploaderEvidence.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('idCatalog', this.data.idConcepto);
      form.append('idUsuario', this.data.idUsuario);
      form.append('tipo', this.data.tipo);
      this.loadingFile = true;
      // console.log(this.loadingFile);
    };

    this.uploaderEvidence.uploadAll();
    this.uploaderEvidence.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.loadingFile = false;
      // console.log(item);
      if(item.isSuccess) {
        this.countFileSucces++;
      } else {
        this.countFileError ++;
      }
      
      console.log(this.countFiles + ' -- ' + this.uploaderEvidence.queue.length);

      if(this.uploaderEvidence.queue.length==this.countFiles){
          // debugger;
          // this.obraService.getArchivoObraObservable(this.data.idObra, 1, this.data.idUsuario);
        this.useAlerts(this.countFileSucces + ' Documento(s) cargado(s) '
          + " " +this.countFileError+ ' Documento(s) no se subieron ', ' ', 'success-dialog');
          //this.useAlerts(this.countFileError+ 'Documento(s) no se subieron', ' ', 'error-dialog');
        this.countFiles=1;
        this.getEvidence();
        this.bottomSheetRef.dismiss(); 
      }
      this.countFiles++;
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getEvidence(){
    this.reporteConceptosEjecutadosService.getEvidenceObservable(this.data.idConcepto, this.data.idUsuario, this.data.fechaHoy, this.data.tipo);
    this.EvidenciasObs$ = this.reporteConceptosEjecutadosService.getDataEvidence();
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
