import { Component, OnInit } from '@angular/core';
import { TodoItem } from 'app/todo/model/todo-item';
import { TodoService } from '../service/todo.service';
import { TodoStatus } from '../model/todo-status.enum';
import * as _ from 'lodash';

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
    this.refreshTodoList();
  }

  finishTodo(todoItem: TodoItem) {
    if (todoItem.status === TodoStatus.NEW) {
      this.todoService.finishTodoItem(todoItem).then(result => {
        this.refreshTodoList();
      });
    }
  }

  refreshTodoList() {
    this.todoService.getTodoItemList().then(todoItemList => {
      this.todoList = todoItemList;
      this.groupAndSort();
    });
  }

  private groupAndSort(): void {
    const groupListByStatus = _.groupBy(this.todoList, (todo) => {
      return todo.status;
    });

    const newList = groupListByStatus[TodoStatus.NEW].sort(this.sortByCreateTimeDesc);
    const finishedList = groupListByStatus[TodoStatus.FINISHED].sort(this.sortByCreateTimeDesc);

    this.todoList = newList.concat(finishedList);
  }

  private sortByCreateTimeDesc(a: TodoItem, b: TodoItem): number {
    return b.createTime - a.createTime;
  }
}
