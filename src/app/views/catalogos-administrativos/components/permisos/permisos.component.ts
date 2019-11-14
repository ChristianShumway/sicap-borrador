import { Component, OnInit } from '@angular/core';
import { NavigationService } from './../../../../shared/services/navigation.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalPerfilesComponent } from './../modal-perfiles/modal-perfiles.component';
import { PerfilesService } from '../../../../shared/services/perfiles.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss']
})
export class PermisosComponent implements OnInit {
  menu = [];
  permisos = [];
  perfiles = [];
  arbol = [];
  panelOpenState = false;
  firstSubPanelOpenState = false;
  secondSubPanelOpenState = false;

  constructor(
    private navigationService: NavigationService,
    public dialog: MatDialog,
    private perfilesService: PerfilesService
  ) { }

  ngOnInit() {
    this.navigation();
  }

  navigation() {
    // this.menu = this.navigationService.iconMenu;
    const menu = this.navigationService.iconMenu;
    const permisos = this.navigationService.permisosMenu;
    const perfiles = this.perfilesService.getAllPerfiles();
    this.menu = menu.filter( opcion => opcion.type == 'dropDown' || opcion.type == 'link' || opcion.type == 'icon');
    this.permisos = permisos;
    this.perfiles = perfiles;
    console.log(this.menu);
    console.log(this.permisos);
  }

  openModalPerfiles(idPadre, idHijo) {
    const moduloSeleccionado = this.menu.filter( modulo => modulo.id === idPadre);
    moduloSeleccionado.map( modulo => {
      this.arbol.push(modulo.id);
      this.generaArbolModulo(modulo);
    })

    console.log(this.arbol);
   
    // const dialogRef = this.dialog.open(ModalPerfilesComponent, {
    //   width: '300px',
    //   data: this.perfiles
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result){
    //     console.log(result);
    //     console.log(data);
    //   }
    // });
  }

  generaArbolModulo(obj){
    if(obj.sub) {
      obj.sub.find( modulo => {
        this.arbol.push(modulo.id);
        return this.generaArbolModulo(modulo);
      })
    }
  }

}
