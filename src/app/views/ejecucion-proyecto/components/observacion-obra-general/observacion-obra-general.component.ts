import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import { environment } from './../../../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ObraService } from './../../../../shared/services/obra.service';
import { Observacion } from '../../../../shared/models/observacion';

@Component({
  selector: 'app-observacion-obra-general',
  templateUrl: './observacion-obra-general.component.html',
  styleUrls: ['./observacion-obra-general.component.scss']
})
export class ObservacionObraGeneralComponent implements OnInit {
 
  observacionGeneralForm: FormGroup;
  fecha = new Date();
  pipe = new DatePipe('en-US');
  tipoObservaciones;
  showUpload = false;
  idObservacion: number;

  rutaImg: string;
  host: string;
  rutaServe: string;
  loadingFile = false;
  countFiles =1;
  countFileSucces=0;
  countFileError=0;

  public uploaderEvidence: FileUploader = new FileUploader({ url: '' });
  public hasBaseDropZoneOver: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<ObservacionObraGeneralComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private obraService: ObraService
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getCatalogoObservaciones();
    this.initUploadEvidence();
  }

  getValidations() {
    this.observacionGeneralForm = new FormGroup({
      idTipoObservacion: new FormControl('', [
        Validators.required,
      ]),
      comentario: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  getCatalogoObservaciones(){
    this.obraService.geTiposObservacionParaMontosObra().subscribe(
      observaciones => {
        this.tipoObservaciones = observaciones;
      },
      error => console.log(error)
    );
  }

  addObservation(){
    if(this.observacionGeneralForm.valid){
      const format = 'yyyy/MM/dd';
      const nuevaFechaInicio = this.pipe.transform(this.fecha, format);
      const comentario:Observacion = {
        ...this.observacionGeneralForm.value,
        idObra: this.data.idObra,
        idUsuarioModifico: this.data.idUsuario,
        tipo: 2,
        fechaCreo: nuevaFechaInicio,
      }
      console.log(comentario);
      this.showUpload = true;
      this.obraService.createObservacionObra(comentario).subscribe(
        (response => {
          if(response.estatus === '05'){
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.obraService.getObservacionesObraObservable(this.data.idObra);
            console.log(response);
            this.idObservacion = response.pk;
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
            this.bottomSheetRef.dismiss();
          }
        }),
        (error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
          this.bottomSheetRef.dismiss();
        })
      );
    }
  }

  initUploadEvidence() {
    this.rutaServe = environment.apiURL;
    this.rutaImg = environment.imageServe;
    this.host = environment.host;

    const headers = [{ name: 'Accept', value: 'application/json' }];
    this.uploaderEvidence = new FileUploader({ url: this.rutaServe + '/obra/uploadFileLogObra', autoUpload: true,headers: headers });
    
    this.uploaderEvidence.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('idObservation', this.idObservacion);
      form.append('idUserAdd', this.data.idUsuario);
      this.loadingFile = true;
    };

    this.uploaderEvidence.uploadAll();
    this.uploaderEvidence.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

      const result = JSON.parse(response);
      console.log(result);
      this.loadingFile = false;
      if (result) {
        if(result.noEstatus === 5) {
          console.log(result);
          this.countFileSucces++;
          this.useAlerts(result.mensaje, ' ', 'success-dialog');
        } else {
          this.countFileError ++;
          this.useAlerts(result.mensaje, ' ', 'error-dialog');
        }
      } else {
        this.useAlerts('Ocurrio un error, favor de reportar', ' ', 'error-dialog');
      }

      if(this.uploaderEvidence.queue.length==this.countFiles){
        this.countFiles=1;
        // this.bottomSheetRef.dismiss(); 
      }
      this.countFiles++;
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  closeModal(){
    this.bottomSheetRef.dismiss(); 
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
