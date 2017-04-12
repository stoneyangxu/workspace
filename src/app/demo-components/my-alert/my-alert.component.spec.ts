import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAlertComponent } from './my-alert.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(MyAlertComponent) myAlertComponent: MyAlertComponent;
}

describe('MyAlertComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  const html = `
    <my-alert>
      <strong>Warning!</strong>Alert message!
    </my-alert>
  `;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, MyAlertComponent]
    });
  }));

  beforeEach(() => {
  });

  it('should create', () => {
    fixture = createGenericTestComponent(html, TestComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });


  it('should show contents around in my-alert tag', () => {
    fixture = createGenericTestComponent(html, TestComponent);

    const contentElement = fixture.debugElement.query(By.css('.alert-content')).nativeElement;
    expect(contentElement.textContent).toContain(`Alert message!`);
  });

  it('should get type property from html attribute', () => {

    const customFixture = createGenericTestComponent(`
      <my-alert type='success'>
        Message
      </my-alert>
    `, TestComponent);

    const contentElement = customFixture.debugElement.query(By.css('.alert-content')).nativeElement;
    expect(contentElement.classList).toContain('bg-success');
  });

  it('should remove close button if dismissible is false', () => {
    const customFixture = createGenericTestComponent(`
      <my-alert type='success' [dismissible]='false'>
        Message
      </my-alert>
    `, TestComponent);

    const button = customFixture.debugElement.query(By.css('button.close'));
    expect(button).toBeNull('hide close button');
  });

  it('should show close button if dismissible is true', () => {
    const customFixture = createGenericTestComponent(`
      <my-alert type='success' [dismissible]='true'>
        Message
      </my-alert>
    `, TestComponent);

    const button = customFixture.debugElement.query(By.css('button.close'));
    expect(button).not.toBeNull('show close button');
  });

  it('should show close button as default', () => {
    const customFixture = createGenericTestComponent(`
      <my-alert type='success'>
        Message
      </my-alert>
    `, TestComponent);

    const button = customFixture.debugElement.query(By.css('button.close'));
    expect(button).not.toBeNull('show close button');
  });

});
