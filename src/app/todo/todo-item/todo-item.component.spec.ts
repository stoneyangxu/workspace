import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoItemComponent} from './todo-item.component';
import {By} from '@angular/platform-browser';
import {TodoService} from '../service/todo.service';
import * as moment from 'moment';
import {TodoStatus} from '../model/todo-status.enum';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      providers: [TodoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show list-group-item-warning when not finished', () => {

    component.todoItem = {
      id: 1,
      title: 'todo title',
      createTime: moment().unix(),
      status: TodoStatus.NEW
    };

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.list-group-item')).nativeElement;
    expect(el.classList).toContain('list-group-item-warning');
  });

});
