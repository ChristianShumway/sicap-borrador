import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PerfilesService } from '../../../../shared/services/perfiles.service';
import { Perfil } from './../../../../shared/models/perfil';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.scss']
})
export class ModificarPerfilComponent implements OnInit {
  
  perfil: Perfil;
  formData = {}
  console = console;
  updateProfileForm: FormGroup;
  idPerfil;
  idUsuarioLogeado;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private perfilesService: PerfilesService,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getProfile();
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
  }

  updateProfile(){
    if(this.updateProfileForm.valid){
      const perfil = {
        idPerfil: parseInt(this.idPerfil),
        ...this.updateProfileForm.value,
        // usuarioModifico: this.idUsuarioLogeado
      };
      console.log(perfil);
      this.perfilesService.updatePerfil(perfil).subscribe(
        ((response:any) => {
          console.log(response);
          if(response.estatus === '05'){
            this.router.navigate(['/configuracion/perfiles']);
            this.useAlerts(response.mensaje, ' ', 'success-dialog');
          } else {
            this.useAlerts(response.mensaje, ' ', 'error-dialog');
          }
        }),
        (error => {
          console.log(error);
          this.useAlerts(error.message, ' ', 'error-dialog');
        })
      );
    }
  }

  getValidations() {
    this.updateProfileForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
      ]),
      descripcion: new FormControl(),
    })
  }

  getProfile() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      this.idPerfil = data.id;
      if (this.idPerfil) {
        this.perfilesService.getPerfil(this.idPerfil).subscribe(
          ((perfil: Perfil) =>{
            console.log(perfil);
            this.updateProfileForm.patchValue(perfil);
            // this.perfil = perfil;
          }),
          (error => console.log(error))
        );
      }
    })
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
