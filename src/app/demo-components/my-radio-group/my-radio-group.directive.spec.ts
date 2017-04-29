import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, OnInit, ViewChild, DebugElement } from '@angular/core';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';
import { MyRadioGroupDirective } from 'app/demo-components/my-radio-group/my-radio-group.directive';

@Component({
  selector: 'app-test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(MyRadioGroupDirective) instance: MyRadioGroupDirective;
}

function getButton(fixture, index): DebugElement {
  const buttons = fixture.debugElement.queryAll(By.css('.btn'));
  return buttons[index];
}

describe('MyRadioGroupDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let instance: MyRadioGroupDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, MyRadioGroupDirective ]
    });
  }));

  it('should create', () => {
    fixture = createGenericTestComponent(`
      <div class="btn-group" myRadioGroup>
        <button type="button" class="btn btn-primary">Left</button>
        <button type="button" class="btn btn-primary">Middle</button>
        <button type="button" class="btn btn-primary">Right</button>
      </div>
    `, TestComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy('test component is created');
    expect(component.instance).toBeTruthy('directive is created');
  });


  xdescribe('active state', () => {
    it('should `active` button whick is clicked', () => {
      fixture = createGenericTestComponent(`
        <div class="btn-group" myRadioGroup>
          <button type="button" class="btn btn-primary">Left</button>
          <button type="button" class="btn btn-primary">Middle</button>
          <button type="button" class="btn btn-primary">Right</button>
        </div>
      `, TestComponent);
      component = fixture.componentInstance;
      instance = component.instance;

      const firstBtn = getButton(fixture, 0);
      firstBtn.nativeElement.click();

      expect(firstBtn.nativeElement.classList).toContain('active');
    });
  });

});
