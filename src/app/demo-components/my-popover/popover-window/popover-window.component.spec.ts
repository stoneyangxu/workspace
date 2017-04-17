import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverWindowComponent } from './popover-window.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(PopoverWindowComponent) popoverWindowComponent: PopoverWindowComponent;
}

describe('PopoverWindowComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, PopoverWindowComponent]
    });
  }));

  it('should create', () => {
    fixture = createGenericTestComponent(`
      <popover-window></popover-window>
    `, TestComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });


  it('should use `popover` class in container, `popover-title` and `popover-content`', () => {
    fixture = createGenericTestComponent(`
      <popover-window></popover-window>
    `, TestComponent);
    component = fixture.componentInstance;

    const popup = fixture.debugElement.query(By.css('popover-window'));
    expect(popup.nativeElement.classList).toContain('popover');

    const title = fixture.debugElement.query(By.css('.popover-title'));
    expect(title).toBeTruthy();

    const content = fixture.debugElement.query(By.css('.popover-content'));
    expect(content).toBeTruthy();
  });


  it('should specify id attribute', () => {
    fixture = createGenericTestComponent(`
      <popover-window></popover-window>
    `, TestComponent);

    component = fixture.componentInstance;

    component.popoverWindowComponent.id = 'window-id';
    fixture.detectChanges();

    const popup = fixture.debugElement.query(By.css('popover-window'));

    expect(popup.nativeElement.getAttribute('id')).toBe('window-id');
  });


  it('should support title property and contents inside tags', () => {
    fixture = createGenericTestComponent(`
      <popover-window title='Title'>
        Contents!
      </popover-window>
    `, TestComponent);

    const title = fixture.debugElement.query(By.css('.popover-title'));
    expect(title.nativeElement.textContent).toContain('Title');

    const content = fixture.debugElement.query(By.css('.popover-content'));
    expect(content.nativeElement.textContent).toContain('Contents!');
  });


  it('should support placement property', () => {
    fixture = createGenericTestComponent(`
      <popover-window title='Title' placement='right'>
        Contents!
      </popover-window>
    `, TestComponent);

    const popup = fixture.debugElement.query(By.css('popover-window'));
    expect(popup.nativeElement.classList).toContain('popover-right');
  });

});
