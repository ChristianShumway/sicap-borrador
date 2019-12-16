import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-asignar-materiales-concepto',
  templateUrl: './asignar-materiales-concepto.component.html',
  styleUrls: ['./asignar-materiales-concepto.component.scss']
})
export class AsignarMaterialesConceptoComponent implements OnInit {
  materiales: any[] = [];
  constructor(
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<AsignarMaterialesConceptoComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    // console.log(this.data);

    console.log(this.data);
    // this.bottomSheetRef.dismiss();
  }

  agregarMateriales(list){
    this.materiales = list.selectedOptions.selected.map(item => item.value);
    console.log(this.materiales);
    // console.log(this.shoes.selectedOptions.selected)
  }

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
