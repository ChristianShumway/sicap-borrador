import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MaterialService } from '../../../../shared/services/material.service';

@Component({
  selector: 'app-asignar-materiales-concepto',
  templateUrl: './asignar-materiales-concepto.component.html',
  styleUrls: ['./asignar-materiales-concepto.component.scss']
})
export class AsignarMaterialesConceptoComponent implements OnInit {
  listaTotalMateriales: any[] = [];
  nombreMaterialesIncorrectos: any[] = [];
  cantidadConcepto;
  temp = [];
  materiales = [];

  constructor(
    private snackBar: MatSnackBar,
    private catalogoMaterialesService: MaterialService,
    private bottomSheetRef: MatBottomSheetRef<AsignarMaterialesConceptoComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    console.log(this.data.listaMateriales);
    this.cantidadConcepto = this.data.cantidadConcepto;
    this.materiales = this.data.listaMateriales;
    this.temp = this.data.listaMateriales;
  }


  agregarMateriales(list){
    list.listaMateriales.map ( material => {
      if(material.cantidadAntesDeLaOperacion !== material.cantidadSeleccionada){
        material = {
          ...material,
          idUsuarioModifico: this.data.idUsuario,
          idConcepto: this.data.idConcepto,
          cantidadAntesDeLaOperacion: material.cantidadSeleccionada
        };
        this.listaTotalMateriales.push(material);
      }
    });
    console.log(this.listaTotalMateriales);
    this.catalogoMaterialesService.addMaterialsToConcept(this.listaTotalMateriales).subscribe( 
      result => {
        console.log(result);
        result.map( material => {
          if(material.statusCode == 0){
            this.nombreMaterialesIncorrectos.push(material.descripcion);
          }
        });
        if(this.nombreMaterialesIncorrectos.length >= 1){
          this.useAlerts(`No se agregaron los materiales ${this.nombreMaterialesIncorrectos.toString()} `, ' ', 'error-dialog');
        } else {
          this.useAlerts('Materiales agregado al concepto', ' ', 'success-dialog');
        }
        console.log(this.nombreMaterialesIncorrectos);
        this.catalogoMaterialesService.getCatalogObservable(this.data.idObra);
        this.bottomSheetRef.dismiss();
      },
      error => {
        console.log(error);
      }
    );
    
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 6000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.temp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    this.materiales = rows;
  }

}
