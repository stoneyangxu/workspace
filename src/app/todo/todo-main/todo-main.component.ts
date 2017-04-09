import { Component, OnInit, ViewChild } from '@angular/core';
import { NewTodoComponent } from 'app/todo/new-todo/new-todo.component';
import { TodoListComponent } from 'app/todo/todo-list/todo-list.component';

@Component({
  selector: 'todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss']
})
export class TodoMainComponent implements OnInit {

  @ViewChild(NewTodoComponent) newTodoComponent: NewTodoComponent;
  @ViewChild(TodoListComponent) todoListComponent: TodoListComponent;

  constructor() { }

  ngOnInit() {
  }
}
