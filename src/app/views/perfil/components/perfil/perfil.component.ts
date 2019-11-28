import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { UsuariosService } from './../../../../shared/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  activeView : string = 'overview';

  

  constructor(
    private router: ActivatedRoute,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.getUser();
    this.activeView = this.router.snapshot.params['view'];
  }

  getUser(){
    this.router.params.subscribe( (data: Params) => {
      console.log(data);
    })
  }

}
