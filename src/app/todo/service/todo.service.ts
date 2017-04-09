import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { TodoStatus } from 'app/todo/model/todo-status.enum';
import { TodoItem } from 'app/todo/model/todo-item';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TodoService {

  private todosUrl = 'api/todos';
  private headers = new Headers({ 'Content-Type': 'application/json' });

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
      .then((response) => response.json() as TodoItem[])
      .catch((error: any) => Promise.reject(error.message || error));
  }

  getTodoItemById(id: number): Promise<TodoItem> {
    return this.http.get(`${this.todosUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as TodoItem)
      .catch((error: any) => Promise.reject(error.message || error));
  }

  addTodoItem(newTodoItem: TodoItem): Promise<boolean> {

    return this.http.post(this.todosUrl, JSON.stringify(newTodoItem), { headers: this.headers })
      .toPromise()
      .then(response => true)
      .catch((error: any) => Promise.reject(error.message || error));

  }

  finishTodoItem(todoItem: TodoItem): Promise<boolean> {

    todoItem.status = TodoStatus.FINISHED;
    todoItem.finishTime = moment().unix();

    return this.http.put(`${this.todosUrl}/${todoItem.id}`, JSON.stringify(todoItem), { headers: this.headers })
      .toPromise()
      .then(response => true)
      .catch(error => Promise.reject(error.message || error));
  }

  private sortList(): void {
    this.todoList = this.todoList.sort((a, b) => {
      return b.createTime - a.createTime;
    });
  }
}
