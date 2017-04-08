import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent ]
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

  it('should display a table with class `.table`', () => {
    fixture.detectChanges();
    const tableElement = fixture.debugElement.query(By.css('.table'));
    expect(tableElement).not.toBeNull();
  });

  it('should list todos with todoList property', () => {
    component.todoList = [
      {
        id: 1,
        name: 'todo1'
      },
      {
        id: 1,
        name: 'todo2'
      }
    ];

    fixture.detectChanges();

    const listElement = fixture.debugElement.queryAll(By.css('.row'));
    expect(listElement.length).toBe(2);
  });
});
