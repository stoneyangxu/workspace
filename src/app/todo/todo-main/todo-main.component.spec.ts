import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoMainComponent } from './todo-main.component';
import { TodoListComponent } from 'app/todo/todo-list/todo-list.component';
import { NewTodoComponent } from '../new-todo/new-todo.component';
import { TodoService } from '../service/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { HttpModule } from '@angular/http';

describe('TodoMainComponent', () => {
  let component: TodoMainComponent;
  let fixture: ComponentFixture<TodoMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [TodoMainComponent, TodoListComponent, NewTodoComponent, TodoItemComponent],
      providers: [TodoService]
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
