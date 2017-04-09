import {Component, OnInit} from '@angular/core';
import {TodoItem} from 'app/todo/model/todo-item';
import {TodoService} from '../service/todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList: TodoItem[] = [];

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.todoService.getTodoItemList().then(todoItemList => {
      this.todoList = todoItemList;
    });
  }

  finishTodo(todoItem: TodoItem) {
    this.todoService.finishTodoItem(todoItem);
  }

}
