import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { TodoStatus } from 'app/todo/model/todo-status.enum';
import { TodoItem } from 'app/todo/model/todo-item';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TodoService {

  private todosUrl = 'api/todos';

  todoList: TodoItem[] = [
    {
      id: 1,
      title: 'todo1',
      createTime: moment().unix(),
      status: TodoStatus.NEW
    },
    {
      id: 1,
      title: 'todo2',
      createTime: moment().unix(),
      status: TodoStatus.FINISHED
    }
  ];

  constructor(private http: Http) {
  }

  getTodoItemList(): Promise<TodoItem[]> {
    return this.http.get(this.todosUrl)
      .toPromise()
      .then((response) => response.json().data as TodoItem[])
      .catch((error: any) => Promise.reject(error.message || error));
  }

  getTodoItemById(id: number): Promise<TodoItem> {
    return Promise.resolve(this.todoList.find(todoItem => {
      return todoItem.id === id;
    }));
  }

  addTodoItem(newTodoItem: TodoItem): Promise<boolean> {
    this.todoList.push(newTodoItem);
    this.sortList();
    return Promise.resolve(true);
  }

  finishTodoItem(todoItem: TodoItem): void {
    this.todoList.forEach(item => {
      if (todoItem.id === item.id) {
        item.status = TodoStatus.FINISHED;
        item.finishTime = moment().unix();
      }
    });
  }

  private sortList(): void {
    this.todoList = this.todoList.sort((a, b) => {
      return b.createTime - a.createTime;
    });
  }
}
