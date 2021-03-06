import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Obra } from './../../../../shared/models/obra';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AltaDocumentoComponent } from '../alta-documento/alta-documento.component';
import { Observable } from 'rxjs';
import { DocumentosObra } from './../../../../shared/models/documentos-obra';
import { ObraService } from './../../../../shared/services/obra.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalEliminarComponent } from './../modal-eliminar/modal-eliminar.component';
import { ActivatedRoute, Params } from '@angular/router';
import { AutenticacionService } from 'app/shared/services/autenticacion.service';

// import { viewerType } from 'modules/document-viewer.component';
import { viewerType } from './../../../../../../node_modules/ngx-doc-viewer/document-viewer.component';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BibliotecaComponent implements OnInit {

  @Input() obra: Obra;
  idObra;
  usuarioLogeado;
  private documentosObs$ : Observable<DocumentosObra>;
  private listadocumentosValidosObs$ : Observable<any>;
  doc = '';
  rutaSicap: string;
  host: string;
  obraLoad: Obra;
  constructor(
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private obraService: ObraService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    // private viewerName: viewerType
  ) {}

  ngOnInit() {
    this.usuarioLogeado = this.autenticacionService.currentUserValue;
    this.getObra();
    this.rutaSicap = environment.imgRUL;
    this.host = environment.host;
  }
  
  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = data.id;
      // console.log(this.idObra);
      this.getDocuments();
      this.obraService.getObra(this.idObra).subscribe(
        (obra:Obra) => this.obraLoad = obra,
        error => console.log(error)
      );
    })
  }

  openDialoAlertDelete(idDocumento) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: idDocumento
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.obraService.deleteDocument(idDocumento, this.usuarioLogeado).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              // this.obraService.getArchivoObraObservable(this.idObra, 1, this.usuarioLogeado)
              this.obraService.getArchivosValidosObraObservable(this.idObra);
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

  getDocuments(){
    this.obraService.getArchivoObraObservable(this.idObra, 1, this.usuarioLogeado);
    this.documentosObs$ = this.obraService.getDataArchivoObra();

    this.obraService.getArchivosValidosObraObservable(this.idObra);
    this.listadocumentosValidosObs$ = this.obraService.getDataArchivosValidosObra();

    this.obraService.viewArchivos(this.idObra).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

  abrirAltaDocumento(idTipoDocumento): void {
    console.log(idTipoDocumento);
    let sheet = this.bottomSheet.open(AltaDocumentoComponent, {
    data: {
      idObra: this.idObra,
      idUsuario: this.usuarioLogeado,
      idTipoDocumento
    }
    });

    sheet.backdropClick().subscribe( () => {
      console.log('clicked'+this.idObra);
    });  
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

  vistaPreviaArchivo(doc: DocumentosObra){
    console.log(doc);
    // const archivo = `${doc.ruta}/${doc.nombre}`;
    const archivo = `http://${this.host}/${this.rutaSicap}/files/files-log-obra/${doc.nombreArchivo}`;
    console.log(archivo);
    this.doc = archivo;
  }

  noVer(){
    this.doc = '';
  }


}
