import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {
  
  userEmail;
  @ViewChild(MatProgressBar, {static: false}) progressBar: MatProgressBar;
  @ViewChild(MatButton, {static: false}) submitButton: MatButton;

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  submitEmail() {
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
    this.useAlerts('Correo electrónico enviado', ' ', 'success-dialog');
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }
  
}
