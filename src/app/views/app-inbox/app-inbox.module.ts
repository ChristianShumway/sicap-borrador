import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatInputModule,
  MatDialogModule,
  MatListModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatExpansionModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';

import { AppInboxComponent } from './app-inbox.component';
import { MailComposeComponent } from './mail-compose.component';
import { InboxRoutes } from "./app-inbox.routing";
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatExpansionModule,
    FlexLayoutModule,
    QuillModule,
    SharedPipesModule,
    RouterModule.forChild(InboxRoutes)
  ],
  declarations: [AppInboxComponent, MailComposeComponent],
  entryComponents: [MailComposeComponent]
})
export class AppInboxModule { }
