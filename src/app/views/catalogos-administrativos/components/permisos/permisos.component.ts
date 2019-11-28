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
    // const menu = this.navigationService.iconMenu;
    this.navigationService.getMenu(1).subscribe(
      menu => {
        this.menu = menu.filter( opcion => opcion.type == 'dropDown' || opcion.type == 'link' || opcion.type == 'icon');
        
        //  OBTENEMOS PERFILES
        this.perfilesService.getAllPerfiles().subscribe(
          (perfiles => {
            this.perfiles = perfiles;
          }),
          (error => console.log(error))
        );
        
        // OBTENEMOS CATALOGO DE MODULOS CON PERMISOS
        this.navigationService.getPermisosMenu().subscribe(
          modulosPermisos => {
            console.log(modulosPermisos);
            this.permisos = modulosPermisos;
            console.log(this.permisos);
          },
          error => console.log(error)
        );
        // const permisos = this.navigationService.permisosMenu;
        
      },
      error => {
        console.log(error);
      }
    );
    // console.log(this.menu);
    // console.log(this.perfiles);
    // console.log(this.permisos);
  }

  openModalPerfiles(idModulo) {
    const permisosOpcionMenu = this.permisos.filter(permiso => permiso.idModulo === idModulo)

    //console.log(permisosOpcionMenu);
   
    const dialogRef = this.dialog.open(ModalPerfilesComponent, {
      width: '300px',
      data: permisosOpcionMenu
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        // console.log(data);
      }
    });
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
