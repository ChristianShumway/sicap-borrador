import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ObraService } from '../../../../shared/services/obra.service';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { Obra } from './../../../../shared/models/obra';
import { environment } from './../../../../../environments/environment';
import { AutenticacionService } from './../../../../shared/services/autenticacion.service';
import { CierreObraService } from './../../../../shared/services/cierre-obra.service';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.scss']
})
export class ObrasComponent implements OnInit {

  obras: Obra[] = [];
  obrasTemp: Obra[] = [];
  rutaSicap: string;
  host: string;
  idUsuarioLogeado;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Obra> = new MatTableDataSource<Obra>();

  constructor(
    private obraService: ObraService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute,
    private cierreObraService: CierreObraService
  ) { }

  ngOnInit() {
    this.getObras();
    //paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.rutaSicap = environment.imgRUL;
    this.host = environment.host;
    this.idUsuarioLogeado = this.autenticacionService.currentUserValue;
  }
  
  ngOnDestroy(){
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
  
  getObras(){
    this.obraService.getObras().subscribe(
      ( (obras: Obra[]) => {
        this.obras = obras.filter( obra => obra.activo === 1);
        console.log(this.obras);
        this.obrasTemp = this.obras;
        this.dataSource.data = this.obras;
      }),
      (error => console.log(error.message))
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.obrasTemp[0]);
    columns.splice(columns.length - 1);

    if (!columns.length)
      return;

    const rows = this.obrasTemp.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    })

    if(!rows.length){
      this.useAlerts('No se encontraron obras con esta referencia', ' ', 'error-dialog');
    } else {
      this.useAlerts(`Fueron encontradas ${rows.length} obras con esta referencia`, ' ', 'success-dialog');
    }

    this.dataSource.data = rows;
  }

  descargaCierreObra(idObra){

    this.cierreObraService.descargarReporteCierreObra(idObra).subscribe(
      response => {
        var blob = new Blob([response], {type: 'application/xlsx'});
        var link=document.createElement('a');
      
        var obj_url = window.URL.createObjectURL(blob);		    
        var link = document.createElement("a");
        link.setAttribute("target", "_blank");
        link.setAttribute("href", obj_url);
        link.setAttribute("download","cierre-obra.xlsx");
          
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error => {
        console.log(error);
        this.useAlerts(error.message, ' ', 'error-dialog');
      }
    );

  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

}
