import { Component, OnInit } from '@angular/core';
import { NavigationService } from './../../../../shared/services/navigation.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalPerfilesComponent } from './../modal-perfiles/modal-perfiles.component';
import { PerfilesService } from '../../../../shared/services/perfiles.service';
import {MatSnackBar} from '@angular/material/snack-bar';


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
  listaPermisosEspeciales = [];
  panelOpenState = false;
  firstSubPanelOpenState = false;
  secondSubPanelOpenState = false;

  constructor(
    private navigationService: NavigationService,
    public dialog: MatDialog,
    private perfilesService: PerfilesService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.navigation();
    this.getOptionsToPermisosEspeciales();

  }

  navigation() {
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
            this.permisos = modulosPermisos;
            // console.log(this.permisos);
          },
          error => console.log(error)
        );
        
      },
      error => {
        console.log(error);
      }
    );
  }

  getOptionsToPermisosEspeciales(){
    this.navigationService.getOptionsToPermisosEspeciales(1, 2).subscribe(
      options => this.listaPermisosEspeciales = options,
      error => console.log(error)
    );
  }

  openModalPermisos(idModulo) {
    this.perfilesService.getAuthorizedProfiles(idModulo).subscribe(
      perfiles => this.loadModal(perfiles),
      error => console.log(error)
    );
  }

  loadModal(profile){
    const dialogRef = this.dialog.open(ModalPerfilesComponent, {
      width: '300px',
      data: profile
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        this.perfilesService.updateAuthorizedProfile(result).subscribe(
          response => {
            if(response.estatus === '05'){
              this.useAlerts(response.mensaje, ' ', 'success-dialog');
            }
          },
          error => console.log(error)
        );
      }
    });
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
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
