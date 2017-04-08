import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { TodoStatus } from 'app/todo/model/todo-status.enum';
import { TodoItem } from 'app/todo/model/todo-item';

@Injectable()
export class TodoService {

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

  constructor() { }

  getTodoItemList(): Promise<TodoItem[]> {
    return Promise.resolve(this.todoList);
  }

  addTodoItem(newTodoItem: TodoItem): Promise<boolean> {
    this.todoList.push(newTodoItem);
    return Promise.resolve(true);
  }
}
