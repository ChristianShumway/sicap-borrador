import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CatalogoConceptos } from './../../../../shared/models/catalogo-conceptos';
import { CatalogoConceptosService } from '../../../../shared/services/catalogo-conceptos.service';
import { CatalogoSubcontratoService } from '../../../../shared/services/catalogo-subcontrato.service';
import { CatalogoManoObraService } from '../../../../shared/services/catalogo-mano-obra.service';

@Component({
  selector: 'app-agregar-concepto-extraordinario',
  templateUrl: './agregar-concepto-extraordinario.component.html',
  styleUrls: ['./agregar-concepto-extraordinario.component.scss']
})
export class AgregarConceptoExtraordinarioComponent implements OnInit {

  createExtraordinaryConceptForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private catalogoConceptosService: CatalogoConceptosService,
    private catalogoSubcontratoService: CatalogoSubcontratoService,
    private catalogoManoObraService: CatalogoManoObraService,
    private bottomSheetRef: MatBottomSheetRef<AgregarConceptoExtraordinarioComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.getValidations();
    console.log(this.data.tipoCatalogo);
  }

  getValidations() {
    this.createExtraordinaryConceptForm = new FormGroup({
      noConcepto: new FormControl('', [
        Validators.required,
      ]),
      descripcion: new FormControl('', [
        Validators.required,
      ]),
      unidad: new FormControl('', [
        Validators.required,
      ]),
      cantidad: new FormControl('', [
        Validators.required,
      ]),
      precioUnitario: new FormControl('', [
        Validators.required,
      ]),
      importe: new FormControl('', [
        Validators.required,
      ]),
      partida: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  createExtraordinary(){
    if(this.createExtraordinaryConceptForm.valid){
      
      let concepto;

      if(this.data.tipoCatalogo === 'concepto'){
        
        concepto = {
          ...this.createExtraordinaryConceptForm.value,
          tipo:2,
          idObra: this.data.idObra,
          idUsuarioModifico: this.data.idUsuario
        };

        console.log(concepto);

        this.catalogoConceptosService.createConceptoExtraordinario(concepto).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.catalogoConceptosService.getCatalogObservable(this.data.idObra);
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }  
          },
          error => console.log(error)
        );

      } else if (this.data.tipoCatalogo === 'mano-obra') {
        concepto = {
          noManoObra: this.createExtraordinaryConceptForm.value.noConcepto,
          descripcion: this.createExtraordinaryConceptForm.value.descripcion,
          unidad: this.createExtraordinaryConceptForm.value.unidad,
          cantidad: this.createExtraordinaryConceptForm.value.cantidad,
          precio: parseFloat(this.createExtraordinaryConceptForm.value.precioUnitario),
          importe: parseFloat(this.createExtraordinaryConceptForm.value.importe),
          partida: this.createExtraordinaryConceptForm.value.partida,
          idArchivoObra: this.data.idArchivoObra,
          extraordinario: 1,
          // idUsuarioModifico: this.data.idUsuario,
          // tipo:3,
        };

        console.log(concepto);

        this.catalogoManoObraService.createConceptoExtraordinario(concepto).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.catalogoManoObraService.getCatalogObservable(this.data.idObra, this.data.idUsuario);
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }  
          },
          error => console.log(error)
        );

      } else if (this.data.tipoCatalogo === 'subcontrato') {
        console.log('subcontrato');
        concepto = {
          noSubcontrato: this.createExtraordinaryConceptForm.value.noConcepto,
          descripcion: this.createExtraordinaryConceptForm.value.descripcion,
          unidad: this.createExtraordinaryConceptForm.value.unidad,
          cantidad: this.createExtraordinaryConceptForm.value.cantidad,
          precio: parseFloat(this.createExtraordinaryConceptForm.value.precioUnitario),
          importe: parseFloat(this.createExtraordinaryConceptForm.value.importe),
          partida: this.createExtraordinaryConceptForm.value.partida,
          idArchivoObra: this.data.idArchivoObra,
          extraordinario: 1,
          // idUsuarioModifico: this.data.idUsuario,
          // tipo:3,
        };

        console.log(concepto);

        this.catalogoSubcontratoService.createConceptoExtraordinario(concepto).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
              this.catalogoSubcontratoService.getCatalogObservable(this.data.idObra, this.data.idUsuario);
            } else {
              this.useAlerts(response.mensaje, ' ', 'error-dialog');
            }  
          },
          error => console.log(error)
        );
      }
      
      this.bottomSheetRef.dismiss();
    }
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
