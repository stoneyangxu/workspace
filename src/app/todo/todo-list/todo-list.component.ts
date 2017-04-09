import {Component, OnInit} from '@angular/core';
import {TodoItem} from 'app/todo/model/todo-item';
import {TodoService} from '../service/todo.service';
import {TodoStatus} from '../model/todo-status.enum';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList: TodoItem[] = [];

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.getTodoItemList().then(todoItemList => {
      this.todoList = todoItemList;
    }).catch(error => console.log(error));
  }

  finishTodo(todoItem: TodoItem) {
    if (todoItem.status === TodoStatus.NEW) {
      this.todoService.finishTodoItem(todoItem);
    }
  }
}
