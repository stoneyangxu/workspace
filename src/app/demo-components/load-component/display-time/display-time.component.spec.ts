import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTimeComponent } from './display-time.component';

import { Component, OnInit } from '@angular/core';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: ''
})
export class TestComponent {
}

describe('DisplayTimeComponent', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, DisplayTimeComponent ]
    });
  }));

  it('should display current time', () => {
    fixture = createGenericTestComponent(`
      <display-time></display-time>
    `, TestComponent);

    const element = fixture.debugElement.query(By.css('.create-time')).nativeElement;
    expect(element.textContent).toBeTruthy();
  });


  it('should set background-color with bgColor property', () => {
    fixture = createGenericTestComponent(`
      <display-time bgColor="green"></display-time>
    `, TestComponent);

    const element = fixture.debugElement.query(By.css('.create-time')).nativeElement;
    expect(element.style.backgroundColor).toBe('green');
  });
});
