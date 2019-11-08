import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  formData = {}
  console = console;
  createUserForm: FormGroup;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getValidations();
  }

  getValidations() {
    let password = new FormControl('', Validators.required);
    let confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.createUserForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      nombre: new FormControl('', [
        Validators.required,
      ]),
      apellido: new FormControl('', [
        Validators.required,
      ]),
      usuario: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      departamento: new FormControl('', [
        Validators.required
      ]),
      telefono: new FormControl('', CustomValidators.phone('BD')),
      direccion: new FormControl('', [
        Validators.required,
      ]),
      fechaNacimiento: new FormControl(),
      password: password,
      confirmPassword: confirmPassword,
      // imagen: new FormControl(),
      agreed: new FormControl('', (control: FormControl) => {
        const agreed = control.value;
        if(!agreed) {
          return { agreed: true }
        }
        return null;
      })
    })
  }

  createUser(){
    if(this.createUserForm.valid){
      const usuario = {
        ...this.createUserForm.value,
        imagen: 'assets/images/faces/user-temp.png'
      };
      console.log(usuario);
      this.router.navigate(['/catalogos-administrativos/usuarios']);
    }
  }

}
