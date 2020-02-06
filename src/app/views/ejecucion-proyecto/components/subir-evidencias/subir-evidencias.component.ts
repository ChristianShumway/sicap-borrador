import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-subir-evidencias',
  templateUrl: './subir-evidencias.component.html',
  styleUrls: ['./subir-evidencias.component.scss']
})
export class SubirEvidenciasComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<SubirEvidenciasComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    console.log(this.data);
    // this.bottomSheetRef.dismiss();
  }

}
