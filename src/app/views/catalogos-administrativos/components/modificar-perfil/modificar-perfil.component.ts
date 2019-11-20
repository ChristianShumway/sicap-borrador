import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PerfilesService } from '../../../../shared/services/perfiles.service';
import { Perfil } from './../../../../shared/models/perfil';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private perfilesService: PerfilesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getProfile();
  }

  updateProfile(){
    if(this.updateProfileForm.valid){
      const perfil = this.updateProfileForm.value;
      console.log(perfil);
      this.router.navigate(['catalogos-administrativos/perfiles']);
      this.useAlerts('Modificación de Perfil', 'Correcto', 'success-dialog');
    }
  }

  getProfile() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      const idPerfil = data.id;
      if (idPerfil) {
        this.perfil = this.perfilesService.getPerfil(idPerfil);
      }
    })
  }

  getValidations() {
    this.updateProfileForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
      ]),
      descripcion: new FormControl(),
    })
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
