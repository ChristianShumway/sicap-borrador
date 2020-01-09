import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ObraService } from '../../../../shared/services/obra.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Obra } from './../../../../shared/models/obra';
import { environment } from './../../../../../environments/environment';
import { AutenticacionService } from 'app/shared/services/autenticacion.service';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.scss']
})
export class ObrasComponent implements OnInit {

  obras: Obra[] = [];
  obrasTemp: Obra[] = [];
  rutaImg: string;
  host: string;
  // fechaActual= New Date();
  estatusObraPeriodo: number;
  diasFaltantesObra: number;
  idUserLogeado;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs$: Observable<any>;
  dataSource: MatTableDataSource<Obra> = new MatTableDataSource<Obra>();



  constructor(
    private obraService: ObraService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit() {
    this.idUserLogeado = this.autenticacionService.currentUserValue;
    console.log(this.idUserLogeado);
    this.getObras();
    //paginator
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs$ = this.dataSource.connect();
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }


  getObras() {
    this.obraService.getObras().subscribe(
      ((obras: Obra[]) => {
        this.obras = obras.filter(obra => obra.activo === 1 && obra.idSupervisor === this.idUserLogeado);
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

    const rows = this.obrasTemp.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    })

    this.dataSource.data = rows;
    console.log(this.dataSource.data);
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
