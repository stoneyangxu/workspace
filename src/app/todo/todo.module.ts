import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoMainComponent } from './todo-main/todo-main.component';

@NgModule({
  imports: [
    CommonModule,
    TodoRoutingModule
  ],
  declarations: [TodoListComponent, TodoMainComponent]
})
export class TodoModule { }
