import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatCheckboxModule, MatMenuModule, MatButtonModule, MatDividerModule, MatRippleModule, MatToolbarModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatTooltipModule, MatDialogModule, MatChipsModule } from '@angular/material';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TodoRoutingModule } from "./todo-routing.module";
import { TodoComponent } from "./todo/todo.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoDetailsComponent } from "./todo-details/todo-details.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TodoSearchPipe } from './todo-search.pipe';
import { TagDialogueComponent } from './tag-dialogue/tag-dialogue.component';

@NgModule({
  declarations: [TodoComponent, TodoListComponent, TodoDetailsComponent, TodoSearchPipe, TagDialogueComponent],
  imports: [
    CommonModule, 
    TodoRoutingModule,
    MatIconModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    DragDropModule,
    FlexLayoutModule,
    MatRippleModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatDialogModule,
    MatChipsModule,
    PerfectScrollbarModule
  ],
  entryComponents: [TagDialogueComponent]
})
export class TodoModule {}
