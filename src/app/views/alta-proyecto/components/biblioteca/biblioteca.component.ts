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

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BibliotecaComponent implements OnInit {

  @Input() obra: Obra;
  private documentosObs$ : Observable<DocumentosObra>;

  constructor(
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private obraService: ObraService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getDocuments();
  }


  openDialoAlertDelete(idDocumento) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      width: '300px',
      panelClass: 'custom-dialog-container-delete',
      data: idDocumento
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.obraService.deleteDocument(idDocumento).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.obraService.getArchivoObraObservable(this.obra.idObra)
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
    this.obraService.getArchivoObraObservable(this.obra.idObra);
    this.documentosObs$ = this.obraService.getDataArchivoObra();
  }

  abrirAltaDocumento(): void {
    let sheet = this.bottomSheet.open(AltaDocumentoComponent, {
    data: {
      idObra: this.obra.idObra
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

}
