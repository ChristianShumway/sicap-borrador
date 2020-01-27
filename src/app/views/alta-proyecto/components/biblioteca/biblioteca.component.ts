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
  doc = '';


 
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
    this.getDocuments();
  }

  getObra(){
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idObra = data.id;
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
              this.obraService.getArchivoObraObservable(this.obra.idObra, 1, this.usuarioLogeado)
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
    this.obraService.getArchivoObraObservable(this.obra.idObra, 1, this.usuarioLogeado);
    this.documentosObs$ = this.obraService.getDataArchivoObra();
  }

  abrirAltaDocumento(): void {
    let sheet = this.bottomSheet.open(AltaDocumentoComponent, {
    data: {
      idObra: this.obra.idObra,
      idUsuario: this.usuarioLogeado
    }
    });

    sheet.backdropClick().subscribe( () => {
      console.log('clicked'+this.obra.idObra);
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
    const archivo = `${doc.ruta}/${doc.nombre}`;
    // console.log(archivo);
    this.doc = archivo;
  }

  noVer(){
    this.doc = '';
  }


}
