import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { UsuariosService } from './../../../../shared/services/usuarios.service';
import { Usuario } from '../../../../shared/models/usuario';
import { environment } from './../../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilComponent implements OnInit {

  private usuarioObs$: Observable<Usuario>;
  activeView : string = 'overview';
  usuario: Usuario;
  urlImg: string;
  host: string;

  constructor(
    private router: ActivatedRoute,
    private usuariosService: UsuariosService
  ) { 
  }

  ngOnInit() {
    this.getUser();
    this.urlImg = environment.imgRUL;
    this.host= environment.host;
    this.activeView = this.router.snapshot.params['view'];
  }

  getUser(){
    this.router.params.subscribe( (data: Params) => {
      if(data.id){
        console.log(data);
        this.usuariosService.getUsuarioObservable(data.id);
        this.usuarioObs$ = this.usuariosService.getDataUsuario();
        // this.usuariosService.getUsuario(data.id).subscribe(
        //   (usuario: Usuario) => {
        //     this.usuario = usuario;
        //     // this.users$ = usuario;
        //   },
        //   error => {
        //     console.log(error);
        //   }
        // );
      }
    });
  }

}
