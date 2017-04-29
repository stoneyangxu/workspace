import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, OnInit, ViewChild, DebugElement } from '@angular/core';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';
import { MyRadioDirective } from 'app/demo-components/my-radio-group/my-radio.directive';

@Component({
  selector: 'app-test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(MyRadioDirective) instance: MyRadioDirective;
}

function getButton(fixture): DebugElement {
  return fixture.debugElement.query(By.css('button'));
}

describe('MyRadioDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let instance: MyRadioDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, MyRadioDirective ]
    });
  }));

  it('should create', () => {
    fixture = createGenericTestComponent(`
      <button type="button" myRadio class="btn btn-primary">Radio</button>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    expect(component).toBeTruthy('component is created');
    expect(instance).toBeTruthy('myRadio is created');
  });

  it('should switch `active` when clicking', () => {
    fixture = createGenericTestComponent(`
      <button type="button" myRadio class="btn btn-primary">Radio</button>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const btn = getButton(fixture);
    btn.nativeElement.click();

    expect(btn.nativeElement.classList).toContain('active');

    btn.nativeElement.click();
    expect(btn.nativeElement.classList).not.toContain('active');
  });
});
