import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Obra } from '../../../../shared/models/obra';
import { Observable } from 'rxjs';
import { CatalogoConceptos } from './../../../../shared/models/catalogo-conceptos';
import { CatalogoConceptosService } from './../../../../shared/services/catalogo-conceptos.service';
import { Material } from './../../../../shared/models/material';
import { MaterialService } from '../../../../shared/services/material.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AsignarMaterialesConceptoComponent } from '../asignar-materiales-concepto/asignar-materiales-concepto.component';

@Component({
  selector: 'app-materiales-por-concepto',
  templateUrl: './materiales-por-concepto.component.html',
  styleUrls: ['./materiales-por-concepto.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class MaterialesPorConceptoComponent implements OnInit {

  @Input() obra: Obra;
  private conceptosObs$: Observable<CatalogoConceptos>;
  private materialesObs$ : Observable<Material>;

  rows = [];
  columns = [];
  temp = [];
  reorderable: boolean = true;
  loadingIndicator: boolean = true;

  constructor(
    private catalogoConceptosService: CatalogoConceptosService,
    private catalogoMaterialesService: MaterialService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.getCatalogoConceptos();
    this.getCatalogoMateriales();
  }


  getCatalogoConceptos(){
    this.catalogoConceptosService.getCatalogObservable(this.obra.idObra);
    this.conceptosObs$ = this.catalogoConceptosService.getDataCatalogo();
    this.columns = this.catalogoConceptosService.getDataColumns();
    this.catalogoConceptosService.getDataCatalogo().subscribe(
      cat => this.temp = [cat] ,
      error => console.log(error)
    );
  }

  getCatalogoMateriales(){
    this.catalogoMaterialesService.getCatalogObservable(this.obra.idObra);
    this.materialesObs$ = this.catalogoMaterialesService.getDataCatalogo();
  }


 
  verListaMateriales(idConcepto): void {
    console.log(idConcepto);
    this.catalogoMaterialesService.getMaterialAvailable(this.obra.idObra, idConcepto).subscribe(
      materialesDisponibles => {
        let sheet = this.bottomSheet.open(AsignarMaterialesConceptoComponent, {
        data: materialesDisponibles
        });

        sheet.backdropClick().subscribe( () => {
          console.log('clicked'+this.obra.idObra);
        });  
      },
      error => console.log(error)
    );

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

  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
