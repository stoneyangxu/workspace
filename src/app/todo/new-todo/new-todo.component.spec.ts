import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewTodoComponent} from './new-todo.component';
import {By} from '@angular/platform-browser';

describe('NewTodoComponent', () => {
  let component: NewTodoComponent;
  let fixture: ComponentFixture<NewTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewTodoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an input element', () => {

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.todo-input')).nativeElement;
    expect(el.classList).toContain('form-control');
    expect(el.classList).toContain('col-md-12');
  });

  it('should call newTodoItem method when input event', () => {

    const spy = spyOn(component, 'newTodoItem');

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.todo-input')).nativeElement;
    el.value = 'new todo title';
    el.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalled();
  });
});
