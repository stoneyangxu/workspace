import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoMainComponent } from './todo-main.component';
import { TodoListComponent } from 'app/todo/todo-list/todo-list.component';
import {NewTodoComponent} from '../new-todo/new-todo.component';

describe('TodoMainComponent', () => {
  let component: TodoMainComponent;
  let fixture: ComponentFixture<TodoMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoMainComponent, TodoListComponent, NewTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
