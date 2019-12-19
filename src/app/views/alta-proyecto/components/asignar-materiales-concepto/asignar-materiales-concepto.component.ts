import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { MaterialService } from '../../../../shared/services/material.service';

@Component({
  selector: 'app-asignar-materiales-concepto',
  templateUrl: './asignar-materiales-concepto.component.html',
  styleUrls: ['./asignar-materiales-concepto.component.scss']
})
export class AsignarMaterialesConceptoComponent implements OnInit {
  listaTotalMateriales: any[] = [];
  idUsuarioLogeado;
  nombreMaterialesIncorrectos: any[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    private catalogoMaterialesService: MaterialService,
    private bottomSheetRef: MatBottomSheetRef<AsignarMaterialesConceptoComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
    console.log(this.data.listaMateriales);
  }


  agregarMateriales(list){
    //console.log(list.listaMateriales);
    list.listaMateriales.map ( material => {
      if(material.cantidadAntesDeLaOperacion !== material.cantidadSeleccionada){
        material = {
          ...material,
          idUsuarioModifico: this.idUsuarioLogeado,
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
        this.bottomSheetRef.dismiss();
        // this.catalogoMaterialesService.getCatalogObservable(this.data.idObra);
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

}
