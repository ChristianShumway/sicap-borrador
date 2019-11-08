import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatProgressBarModule,
  MatButtonModule,
  MatChipsModule,
  MatListModule,
  MatGridListModule,
  MatExpansionModule,
  MatTabsModule,
  MatTableModule,
  MatSlideToggleModule, 
  MatCheckboxModule,
  MatRadioModule,
  MatInputModule,
  MatDatepickerModule, 
  MatNativeDateModule,
  MatStepperModule,
  MatDialogModule,
  MatPaginatorModule
   } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatGridListModule,
    MatSlideToggleModule, 
    MatCheckboxModule,
    MatRadioModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatStepperModule,
    MatDialogModule,
    MatPaginatorModule
  ], 
  exports: [
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatGridListModule,
    MatSlideToggleModule, 
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatStepperModule,
    MatDialogModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
