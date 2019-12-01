import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.scss']
})
export class VistaUsuarioComponent implements OnInit {
  rutaImg: string;
  host: string;
  constructor(
    public dialogRef: MatDialogRef<VistaUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.rutaImg = environment.imgRUL;
    this.host = environment.host;
  }
}
