import { Component, OnInit, ChangeDetectionStrategy, OnChanges  } from '@angular/core';
import { Observable } from 'rxjs';
import { ObraService } from '../../../../shared/services/obra.service';
import { ActivatedRoute, Params, Router,  } from '@angular/router';
import { environment } from './../../../../../environments/environment';
import { Obra } from './../../../../shared/models/obra';
import { AutenticacionService } from '../../../../shared/services/autenticacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ver-obra',
  templateUrl: './ver-obra.component.html',
  styleUrls: ['./ver-obra.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class VerObraComponent implements OnInit, OnChanges {

  private obraObs$: Observable<Obra>;
  // activeView : string = 'overview';
  urlImg: string;
  host: string;
  usuarioLogeado: any;
  idSupervisorObra: any;

  constructor(
    private obraService: ObraService,
    private activatedRoute: ActivatedRoute,
    private autenticacionService: AutenticacionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getObra();
    this.urlImg = environment.imgRUL;
    this.host= environment.host;
    // this.activeView = this.activatedRoute.snapshot.params['view'];
    this.usuarioLogeado = this.autenticacionService.currentUserValue;
    console.log(this.usuarioLogeado);
  }

  ngOnChanges() {
    this.getObra();
    console.log(this.idSupervisorObra);
    if(this.usuarioLogeado !== this.idSupervisorObra){
      this.useAlerts('Usuario no tiene acceso a esta obra', ' ', 'error-dialog');
      this.router.navigate(['/dashboard']);
    }
  }

  getObra() {
    this.activatedRoute.params.subscribe( (data: Params) => {
      const idObraActual = data.id;
      this.obraService.getObraObservable(idObraActual);
      this.obraObs$ = this.obraService.getDataObra();
      this.obraService.getObra(idObraActual).subscribe(
        obra => this.idSupervisorObra = obra.idSupervisor
      );
    });
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
