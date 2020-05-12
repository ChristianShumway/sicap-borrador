import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ListaMaquinariaEquipoService } from '../../../../shared/services/lista-maquinaria-equipo.service';

@Component({
  selector: 'app-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrls: ['./agregar-equipo.component.scss']
})
export class AgregarEquipoComponent implements OnInit {

  createExtraForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private listaMaquinariaEquipoService: ListaMaquinariaEquipoService,
    private bottomSheetRef: MatBottomSheetRef<AgregarEquipoComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.getValidations();
  }

  getValidations() {
    this.createExtraForm = new FormGroup({
      noVehiculo: new FormControl('', [
        Validators.required,
      ]),
      descripcion: new FormControl('', [
        Validators.required,
      ]),
      clave: new FormControl('', [
        Validators.required,
      ]),
      placas: new FormControl('', [
        Validators.required,
      ]),
      cantidad: new FormControl('', [
        Validators.required,
      ]),
      unidad: new FormControl('', [
        Validators.required,
      ]),
      precioUnitario: new FormControl('', [
        Validators.required,
      ]),
      importe: new FormControl('', [
        Validators.required,
      ]),
      id: new FormControl(0),
      marca: new FormControl(''),
      modelo: new FormControl(''),
      linea: new FormControl(''),
      tipoVehiculo: new FormControl(''),
      responsable: new FormControl(''),
    })
  }

  createExtraordinary(){
    if(this.createExtraForm.valid){
      const equipo = {
        ...this.createExtraForm.value,
        precioUnitario: parseFloat(this.createExtraForm.value.precioUnitario),
        importe: parseFloat(this.createExtraForm.value.importe),
        idArchivoObra: this.data.idArchivoObra,
        extraordinario: 1,
        // idUsuarioModifico: this.data.idUsuario
      };
      console.log(equipo);
      
      this.listaMaquinariaEquipoService.createConceptoExtraordinario(equipo).subscribe(
        response => {
          if(response.estatus === '05'){
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.listaMaquinariaEquipoService.getListObservable(this.data.idObra, this.data.idUsuario);
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }  
        },
        error => console.log(error)
      );
    
      
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
