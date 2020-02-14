import { Component, OnInit, Input } from '@angular/core';
import { Observacion } from '../../../../shared/models/observacion';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { Usuario } from '../../../../shared/models/usuario';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-observacion-header',
  templateUrl: './observacion-header.component.html',
  styleUrls: ['./observacion-header.component.scss']
})
export class ObservacionHeaderComponent implements OnInit {

  @Input() observacion: Observacion;
  nombre: string;
  imgUser: string;
  rutaImg: string;
  host: string;

  constructor(
    private usuariosService: UsuariosService
  ) {
  }
  
  ngOnInit() {
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
    this.usuariosService.getUsuario(this.observacion.idUsuarioModifico).subscribe( (usuario: Usuario) =>{
      this.nombre = `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`;
      this.imgUser = `http://${this.host}/${this.rutaImg}/files/${usuario.imagen}`;
    })
  }

}
