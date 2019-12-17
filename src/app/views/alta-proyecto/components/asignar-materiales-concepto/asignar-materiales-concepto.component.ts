import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-asignar-materiales-concepto',
  templateUrl: './asignar-materiales-concepto.component.html',
  styleUrls: ['./asignar-materiales-concepto.component.scss']
})
export class AsignarMaterialesConceptoComponent implements OnInit {
  materiales: any[] = [];
  listaTotalMateriales: any[] = [];
  materialForm: FormGroup;


  constructor(
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<AsignarMaterialesConceptoComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    // this.getValidations();
    // this.materialForm.patchValue(this.data);
    // this.bottomSheetRef.dismiss();
    console.log(this.data);
  }



  // getValidations() {
  //   this.materialForm = new FormGroup({
  //     idConcepto: new FormControl(),
  //     idMaterial: new FormControl(),
  //     descripcion: new FormControl(),
  //     cantidadDisponible: new FormControl(),
  //     cantidadSeleccionada: new FormControl(),
  //   })
  // }

  agregarMateriales(list){
    console.log(list);
    // this.materiales = list.map(item => item.value);
    // console.log(this.materiales);
    // console.log(list.selectedOptions.selected)
  }


  // typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
