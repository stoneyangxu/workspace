import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoListComponent} from './todo-list.component';
import {By} from '@angular/platform-browser';

import * as moment from 'moment';
import {TodoStatus} from 'app/todo/model/todo-status.enum';
import {TodoService} from '../service/todo.service';
import {TodoItemComponent} from '../todo-item/todo-item.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  const todoList = [
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoItemComponent],
      providers: [TodoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list with class `.list-group`', () => {
    fixture.detectChanges();
    const tableElement = fixture.debugElement.query(By.css('.list-group'));
    expect(tableElement).not.toBeNull();
  });

  it('should list todos with todoList property', () => {
    component.todoList = todoList;

    fixture.detectChanges();

    const listElement = fixture.debugElement.queryAll(By.css('.list-group-item'));
    expect(listElement.length).toBe(2);
  });

  it('should call getTodoItemList on init', () => {

    const service = fixture.debugElement.injector.get(TodoService);
    const spy = spyOn(service, 'getTodoItemList').and.returnValues(Promise.resolve([]));

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

});
