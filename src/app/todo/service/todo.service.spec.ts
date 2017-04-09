import { TestBed, inject } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpModule, XHRBackend, Response, ResponseOptions, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { async } from '@angular/core/testing';
import { TodoItem } from 'app/todo/model/todo-item';
import { TodoStatus } from 'app/todo/model/todo-status.enum';
import * as moment from 'moment';


describe('TodoService', () => {

  const todoItemList = [
    {
      'id': 1,
      'title': 'todo 1',
      'createTime': 1234567890,
      'status': 0
    },
    {
      'id': 2,
      'title': 'todo 2',
      'createTime': 1234567891,
      'status': 0
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TodoService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  it('should return a promise with TodoItem list',
    async(inject([TodoService, MockBackend], (service: TodoService, mockBackend: MockBackend) => {

      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(todoItemList) })));
      });

      service.getTodoItemList().then(list => {
        expect(list.length).toBe(2);
      });
    }))
  );

  it('should append a new item into TodoItem list',
    async(inject([TodoService, MockBackend], (service: TodoService, mockBackend: MockBackend) => {

      mockBackend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new ResponseOptions({ status: 200 })));
      });

      service.addTodoItem({
        title: 'new',
        createTime: moment().unix(),
        status: TodoStatus.NEW
      }).then((result) => {
        expect(result).toBeTruthy();
      });
    }))
  );

  it('should find todoItem by id with getTodoItemById',
    async(inject([TodoService, MockBackend], (service: TodoService, mockBackend: MockBackend) => {

      mockBackend.connections.subscribe(conn => {
        if (conn.request.url === 'api/todos/1') {
          conn.mockRespond(new Response(new ResponseOptions({ body: todoItemList[0] })));
        } else {
          conn.mockRespond(new Response(new ResponseOptions({ body: {} })));
        }
      });

      service.getTodoItemById(1).then((todoItem) => {
        expect(todoItem).toEqual(todoItemList[0]);
      });
    }))
  );

  it('should change todoItem status to finished when finishTodoItem is called',
    async(inject([TodoService, MockBackend], (service: TodoService, mockBackend: MockBackend) => {

      mockBackend.connections.subscribe(conn => {
          conn.mockRespond(new Response(new ResponseOptions({ status: 200 })));
      });

      service.finishTodoItem(todoItemList[0]).then((result) => {
        expect(result).toBeTruthy();
      });
    }))
  );

  //   it('should change todoItem status to finished when finishTodoItem is called', (done) => {

});
