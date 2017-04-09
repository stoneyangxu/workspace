import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { By } from '@angular/platform-browser';

import * as moment from 'moment';
import { TodoStatus } from 'app/todo/model/todo-status.enum';
import { TodoService } from '../service/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { HttpModule } from '@angular/http';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let getTodoItemListSpy;

  const currentTime = moment().unix();

  const todoList = [
    {
      id: 1,
      title: 'todo1',
      createTime: currentTime - 1000,
      status: TodoStatus.NEW
    },
    {
      id: 2,
      title: 'todo2',
      createTime: currentTime - 500,
      status: TodoStatus.FINISHED
    },
    {
      id: 3,
      title: 'todo3',
      createTime: currentTime - 100,
      status: TodoStatus.FINISHED
    },
    {
      id: 4,
      title: 'todo4',
      createTime: currentTime,
      status: TodoStatus.NEW
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [TodoListComponent, TodoItemComponent],
      providers: [TodoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    const service = fixture.debugElement.injector.get(TodoService);
    getTodoItemListSpy = spyOn(service, 'getTodoItemList').and.returnValue(Promise.resolve(todoList));

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
    expect(listElement.length).toBe(todoList.length);
  });

  it('should call getTodoItemList on init', () => {

    component.ngOnInit();

    expect(getTodoItemListSpy).toHaveBeenCalled();
  });

  it('should change todo status when clicking on new todo item', () => {
    component.todoList = todoList;
    fixture.detectChanges();

    const spy = spyOn(component, 'finishTodo');

    const el = fixture.debugElement.query(By.css('.list-group-item-warning')).nativeElement;

    el.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should call finishTodoItem in todoService', () => {

    const service = fixture.debugElement.injector.get(TodoService);
    const spy = spyOn(service, 'finishTodoItem');

    component.finishTodo(todoList[0]);

    expect(spy).toHaveBeenCalled();
  });

  it('should call finishTodoItem only if todo is NEW', () => {

    const service = fixture.debugElement.injector.get(TodoService);
    const spy = spyOn(service, 'finishTodoItem');

    component.finishTodo(todoList[1]);
    expect(spy).not.toHaveBeenCalled();

    component.finishTodo(todoList[0]);
    expect(spy).toHaveBeenCalled();
  });

  it('should order todo list by createTime and show new task first', async(() => {

    component.refreshTodoList();

    fixture.whenStable().then(() => {
      expect(component.todoList.length).toBe(todoList.length);

      const idArray = component.todoList.map(todo => todo.id);
      expect(idArray).toEqual([4, 1, 3, 2]);
    });
  }));

});
