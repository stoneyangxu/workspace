import {TodoService} from './todo.service';
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

  it('should find todoItem by id with getTodoItemById', (done) => {
    service.getTodoItemById(1).then((todoItem) => {
      expect(todoItem.id).toBe(1);
      done();
    });
  });

  it('should change todoItem status to finished when finishTodoItem is called', (done) => {
    const newTodoItem = {
      id: 1,
      title: 'todo1',
      createTime: moment().unix(),
      status: TodoStatus.NEW
    };

    service.finishTodoItem(newTodoItem);

    service.getTodoItemById(newTodoItem.id).then((todoItem) => {
      expect(todoItem.status).toBe(TodoStatus.FINISHED);
      done();
    });
  });

  it('should update todoItem status to current time when finishTodoItem is called', (done) => {
    const newTodoItem = {
      id: 1,
      title: 'todo1',
      createTime: moment().unix(),
      status: TodoStatus.NEW
    };

    service.finishTodoItem(newTodoItem);

    service.getTodoItemById(newTodoItem.id).then((todoItem) => {
      expect(todoItem.finishTime).toBeDefined();
      done();
    });
  });
});
