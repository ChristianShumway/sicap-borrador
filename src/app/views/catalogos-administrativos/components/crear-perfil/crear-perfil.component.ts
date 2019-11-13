import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-perfil',
  templateUrl: './crear-perfil.component.html',
  styleUrls: ['./crear-perfil.component.scss']
})
export class CrearPerfilComponent implements OnInit {

  formData = {}
  console = console;
  createProfileForm: FormGroup;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getValidations();
  }

  getValidations() {
    this.createProfileForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
      ]),
      descripcion: new FormControl(),
      agreed: new FormControl('', (control: FormControl) => {
        const agreed = control.value;
        if(!agreed) {
          return { agreed: true }
        }
        return null;
      })
    })
  }

  createProfile(){
    if(this.createProfileForm.valid){
      const perfil = this.createProfileForm.value;
      console.log(perfil);
      this.router.navigate(['/catalogos-administrativos/perfiles']);
    }
  }

}
