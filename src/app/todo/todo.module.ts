import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoMainComponent } from './todo-main/todo-main.component';
import { TodoService } from 'app/todo/service/todo.service';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  imports: [
    CommonModule,
    TodoRoutingModule
  ],
  declarations: [TodoListComponent, TodoMainComponent, NewTodoComponent, TodoItemComponent],
  providers: [
    TodoService
  ]
})
export class TodoModule { }
