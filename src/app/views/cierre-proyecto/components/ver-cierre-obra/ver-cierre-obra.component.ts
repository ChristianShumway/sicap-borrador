import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ObraService } from '../../../../shared/services/obra.service';
import { ActivatedRoute, Params, Router,  } from '@angular/router';
import { environment } from './../../../../../environments/environment';
import { Obra } from './../../../../shared/models/obra';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from './../../../../shared/models/usuario';

@Component({
  selector: 'app-ver-cierre-obra',
  templateUrl: './ver-cierre-obra.component.html',
  styleUrls: ['./ver-cierre-obra.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class VerCierreObraComponent implements OnInit {

  private obraObs$: Observable<Obra>;
  urlImg: string;
  host: string;
  usuarioLogeado: any;
  idSupervisorObra: any;
  usuario: Usuario;
  diaActual = new Date();
  obra: any;

  constructor(
    private obraService: ObraService,
    private activatedRoute: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    private snackBar: MatSnackBar,
    private router: Router,
    private usuariosService: UsuariosService
  ) {
  }

  ngOnInit() {
    this.usuarioLogeado = this.autenticacionService.currentUserValue;
    this.urlImg = environment.imgRUL;
    this.host= environment.host;
    this.usuario = {...this.usuario};
    this.getObra();
    // this.getUsuario();
  }

  getObra() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      const idObraActual = data.idObra;
      this.obraService.getObraObservable(idObraActual);
      this.obraObs$ = this.obraService.getDataObra();
      // this.getUsuario();
    });
  }

  getUsuario() {
    this.usuariosService.getUsuario(this.usuarioLogeado).subscribe(
      (user: Usuario) => {
        this.usuario = user;
        if(this.usuario.idPerfil !== 1 && this.usuario.idPerfil !== 2  && this.usuario.idPerfil !== 10){
          this.useAlerts('Usuario no tiene acceso a esta obra', ' ', 'error-dialog');
          this.router.navigate(['/dashboard']);
        }
      }
    );
  }

  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
