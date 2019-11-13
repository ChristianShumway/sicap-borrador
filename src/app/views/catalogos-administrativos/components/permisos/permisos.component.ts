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
    let menu = this.navigationService.iconMenu;
    this.menu = menu.filter( opcion => opcion.type == 'dropDown' || opcion.type == 'link');
    console.log(this.menu);
  }

  openModalPerfiles(data) {
    const perfiles = this.perfilesService.getAllPerfiles();
    const dialogRef = this.dialog.open(ModalPerfilesComponent, {
      width: '300px',
      data: perfiles
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        console.log(data);
      }
    });
  }

}
