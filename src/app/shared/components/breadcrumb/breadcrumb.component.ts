import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { RoutePartsService } from '../../../shared/services/route-parts.service';
import { LayoutService } from '../../../shared/services/layout.service';
import { Subscription, ObjectUnsubscribedError } from "rxjs";
import { filter } from 'rxjs/operators';
import { Usuario } from './../../models/usuario';
import { NavigationService } from './../../services/navigation.service';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy, OnChanges {
  @Input() usuarioLogeado: Usuario;
  routeParts:any[];
  routerEventSub: Subscription;
  href: String;
  idPerfilLogeado: number;
  // public isEnabled: boolean = true;

  constructor(
    private router: Router,
    private routePartsService: RoutePartsService, 
    private activeRoute: ActivatedRoute,
    public layout: LayoutService,
    private autenticationService: AutenticacionService,
    private navigationService: NavigationService
  ) {
    this.routerEventSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((routeChange) => {
        this.routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
        console.log(this.routeParts);
        if(this.idPerfilLogeado || this.idPerfilLogeado == 0){
          this.validarSesion();
        }
        // generate url from parts
        this.routeParts.reverse().map((item, i) => {
          item.breadcrumb = this.parseText(item);
          item.urlSegments.forEach((urlSegment, j) => {
            if(j === 0)
              return item.url = `${urlSegment.path}`;
            item.url += `/${urlSegment.path}`
          });
          if(i === 0) {
            return item;
          }
          // prepend previous part to current part
          item.url = `${this.routeParts[i - 1].url}/${item.url}`;
          return item;
        });
      });
  }

  ngOnInit() {
  }
  
  ngOnChanges(){
    this.idPerfilLogeado = this.usuarioLogeado.idPerfil;
    this.validarSesion();
  }
  
  validarSesion(){
    if(this.idPerfilLogeado || this.idPerfilLogeado !== 0){
      console.log(this.idPerfilLogeado, 'se ejecuto');
      this.href = this.router.url.substr(1);
      this.navigationService.getOptionsMenu().subscribe(
        (options: any[]) => {
          const modulo = options.filter( option => option.pagina === this.href);
          if(modulo.length === 1){
            const idModulo = modulo[0].idConfiguracion;
            this.autenticationService.userAuthenticated(this.idPerfilLogeado, idModulo).subscribe(
              (result: any) =>{
                if(result.noEstatus === 0){
                  this.router.navigate(['/dashboard']);
                }
              } ,
              error => console.log(error)
            );
          }
        },
        error => console.log(error)
      );
    }
  }
  
  
  ngOnDestroy() {
    if(this.routerEventSub) {
      this.routerEventSub.unsubscribe()
    }
  }

  parseText(part) {
      if(!part.breadcrumb) {
        return ''
      }
    part.breadcrumb = part.breadcrumb.replace(/{{([^{}]*)}}/g, function (a, b) {
      var r = part.params[b];
      return typeof r === 'string' ? r : a;
    });
    return part.breadcrumb;
  }

}
