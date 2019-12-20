import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MontoProgramado } from './../../../../shared/models/monto-programado';
import { ObraService } from '../../../../shared/services/obra.service';

@Component({
  selector: 'app-modificar-monto-programado',
  templateUrl: './modificar-monto-programado.component.html',
  styleUrls: ['./modificar-monto-programado.component.scss']
})
export class ModificarMontoProgramadoComponent implements OnInit {
  
  modificarMontoForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<ModificarMontoProgramadoComponent>,
    private obraService: ObraService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getPrespuesto();
    console.log(this.data);
  }

  getValidations() {
    this.modificarMontoForm = new FormGroup({
      monto: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  getPrespuesto(){
    const presupuesto = this.data.monto;
    console.log(presupuesto);
    this.modificarMontoForm.patchValue(presupuesto);
  }

  ModificarMonto(){
    if(this.modificarMontoForm.valid){
      const monto: MontoProgramado = {
        ...this.modificarMontoForm.value,
        idUsuarioCreo: this.data.idUsuarioLogeado,
        idUsuarioModifico: this.data.idUsuarioLogeado,
        idObra: this.data.idObra,
        idPresupuesto: this.data.monto.idPresupuesto
      };
      this.obraService.createUpdateMontoObra(monto).subscribe(
        response => {
          console.log(response);
          if(response.estatus === '05'){
            this.obraService.getMontosObraObservable(this.data.idObra);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.bottomSheetRef.dismiss();
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog'); 
          }
        },
        error => this.useAlerts(error.message, ' ', 'success-dialog')
      );
    }
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
