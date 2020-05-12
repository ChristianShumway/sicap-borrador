import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ListaPersonalService } from '../../../../shared/services/lista-personal.service';

@Component({
  selector: 'app-agregar-personal',
  templateUrl: './agregar-personal.component.html',
  styleUrls: ['./agregar-personal.component.scss']
})
export class AgregarPersonalComponent implements OnInit {

  createExtraForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private listaPersonalService: ListaPersonalService,
    private bottomSheetRef: MatBottomSheetRef<AgregarPersonalComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.getValidations();
  }

  getValidations() {
    this.createExtraForm = new FormGroup({
      noPersonal: new FormControl('', [
        Validators.required,
      ]),
      nombre: new FormControl('', [
        Validators.required,
      ]),
      categoria: new FormControl('', [
        Validators.required,
      ]),
      ciudadOrigen: new FormControl('', [
        Validators.required,
      ]),
      telefono: new FormControl('', [
        Validators.required,
      ]),
      numeroImms: new FormControl('', [
        Validators.required,
      ]),
      sueldo: new FormControl('', [
        Validators.required,
      ]),
      partida: new FormControl(''),
    })
  }

  createExtraordinary(){
    if(this.createExtraForm.valid){

      const personal = {
        ...this.createExtraForm.value,
        idArchivoObra: this.data.idArchivoObra,
        extraordinario: 1,
        // idUsuarioModifico: this.data.idUsuario
        // tipo:2,
      };
      console.log(personal);
      
      this.listaPersonalService.createPersonalExtra(personal).subscribe(
        response => {
          if(response.estatus === '05'){
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
            this.listaPersonalService.getListObservable(this.data.idObra, this.data.idUsuario);
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
