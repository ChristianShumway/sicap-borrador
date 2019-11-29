import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { UsuariosService } from './../../../../shared/services/usuarios.service';
import { Usuario } from '../../../../shared/models/usuario';
import { environment } from './../../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  activeView : string = 'overview';
  usuario: Usuario;
  urlImg: string;
  // private usuario = new BehaviorSubject<Usuario>();


  

  constructor(
    private router: ActivatedRoute,
    private usuariosService: UsuariosService
  ) { 
    // this.usuario = {...this.usuario};
  }

  ngOnInit() {
    this.getUser();
    this.urlImg = environment.imgRUL;
    this.activeView = this.router.snapshot.params['view'];
  }

  getUser(){
    this.router.params.subscribe( (data: Params) => {
      if(data.id){
        console.log(data);
        this.usuariosService.getUsuario(data.id).subscribe(
          (usuario: Usuario) => {
            this.usuario = usuario;
          },
          error => {
            console.log(error);
          }
        );
      }
    })
  }

}
