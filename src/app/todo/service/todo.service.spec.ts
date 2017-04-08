import { TestBed, inject } from '@angular/core/testing';

import { TodoService } from './todo.service';
import * as moment from 'moment';
import {TodoStatus} from '../model/todo-status.enum';

describe('TodoService', () => {
const service = new TodoService();

  it('should return a promise with TodoItem list', (done) => {
    service.getTodoItemList().then((todoItemList) => {
      expect(todoItemList.length).toBe(2);
      done();
    });
  });

  it('should append a todoItem', (done) => {

    const todoItem = {
      title: 'todo3',
      createTime: moment().unix(),
      status: TodoStatus.NEW
    };

    service.addTodoItem(todoItem).then((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });
});
