import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuariosService } from '../../../../shared/services/usuarios.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {
  formData = {}
  console = console;
  updateUserForm: FormGroup; 
  user;
  
  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getValidations();
    this.getUser();
  }

  getUser() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      const idUser = data.id;
      if(idUser) {
        const user = this.usuarioService.getUsuario(idUser);
        this.user = user;
        console.log(user);
      }
    });
  }

  getValidations() {
    let password = new FormControl('', Validators.required);
    let confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.updateUserForm = new FormGroup({
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

  updateUser(){
    if(this.updateUserForm.valid){
      // const usuario = {
      //   ...this.updateUserForm.value,
      //   imagen: 'assets/images/faces/user-temp.png'
      // };
      // console.log(usuario);
      this.router.navigate(['/catalogos-administrativos/usuarios']);
    }
  }

}
