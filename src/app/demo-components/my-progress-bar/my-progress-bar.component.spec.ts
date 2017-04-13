import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgressBarComponent } from './my-progress-bar.component';
import { createGenericTestComponent } from 'test/common';
import { ViewChild, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

function getProgressElement(fixture) {
  const barElement = fixture.debugElement.query(By.css('.progress-bar')).nativeElement;
  return barElement;
}

function getProgressWitdh(fixture) {
  return getProgressElement(fixture).style.width;
}

function getAriaValuenow(fixture) {
  const barElement = fixture.debugElement.query(By.css('.progress-bar')).nativeElement;
  return barElement.getAttribute('aria-valuenow');
}

@Component({
  selector: 'test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(MyProgressBarComponent) myProcessBarComponent: MyProgressBarComponent;
}

describe('MyProgressBarComponent', () => {
  let component: MyProgressBarComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, MyProgressBarComponent]
    });
  }));

  it('should create', () => {
    fixture = createGenericTestComponent(`
      <my-progress-bar></my-progress-bar>
    `, TestComponent);

    component = fixture.componentInstance.myProcessBarComponent;

    expect(component).toBeTruthy();
  });

  it('should display an empty bar with bootstrap style', () => {
    fixture = createGenericTestComponent(`
      <my-progress-bar></my-progress-bar>
    `, TestComponent);

    const wapper = fixture.debugElement.query(By.css('.progress'));
    expect(wapper).toBeTruthy();

    const progressBar = fixture.debugElement.query(By.css('.progress-bar'));
    expect(progressBar).toBeTruthy();

    const barElement: HTMLDivElement = progressBar.nativeElement;
    expect(barElement.getAttribute('role')).toBe('progressbar');
  });

  describe('max', () => {
    it('should move the progress bar with value property as a percent value', () => {
      fixture = createGenericTestComponent(`
        <my-progress-bar [value]="25"></my-progress-bar>
      `, TestComponent);

      expect(getProgressWitdh(fixture)).toBe('25%');
      expect(getAriaValuenow(fixture)).toBe('25');
    });

    it('should move to 1/8  when the max value is 200', () => {
      fixture = createGenericTestComponent(`
        <my-progress-bar [value]="25" [max]="200"></my-progress-bar>
      `, TestComponent);

      expect(getProgressWitdh(fixture)).toBe('12.5%');
      expect(getAriaValuenow(fixture)).toBe('12.5');
    });
  });




  describe('value', () => {
    it('should show info bar if not specify type', () => {
      fixture = createGenericTestComponent(`
        <my-progress-bar [value]="25"></my-progress-bar>
      `, TestComponent);

      expect(getProgressElement(fixture).classList).toContain('bg-info');
    });

    it('should specify style with type property', () => {
      fixture = createGenericTestComponent(`
        <my-progress-bar [value]="25" type="warning"></my-progress-bar>
      `, TestComponent);

      expect(getProgressElement(fixture).classList).toContain('bg-warning');
    });
  });

  describe('showValue', () => {
    it('should hide current percent value in bar as default', () => {
      fixture = createGenericTestComponent(`
        <my-progress-bar [value]="25"></my-progress-bar>
      `, TestComponent);

      expect(getProgressElement(fixture).textContent.trim()).toBe('');
    });

    it('should show current percent value in bar if showValue is true', () => {
      fixture = createGenericTestComponent(`
        <my-progress-bar [value]="25" [showValue]="true"></my-progress-bar>
      `, TestComponent);

      expect(getProgressElement(fixture).textContent.trim()).toBe('25%');
    });
  });

  describe('striped', () => {
    it('should not show striped as default', () => {
      fixture = createGenericTestComponent(`
        <my-progress-bar [value]="25"></my-progress-bar>
    `, TestComponent);

      expect(getProgressElement(fixture).classList).not.toContain('progress-bar-striped');
    });

    it('should show striped bar with property', () => {
      fixture = createGenericTestComponent(`
        <my-progress-bar [value]="25" [striped]="true"></my-progress-bar>
    `, TestComponent);

      expect(getProgressElement(fixture).classList).toContain('progress-bar-striped');
    });
  });

  describe('animate', () => {
    it('should not show animated as default', () => {
      fixture = createGenericTestComponent(`
        <my-progress-bar [value]="25"></my-progress-bar>
    `, TestComponent);

      expect(getProgressElement(fixture).classList).not.toContain('progress-bar-animated');
    });

    it('should show animated bar with property', () => {
      fixture = createGenericTestComponent(`
        <my-progress-bar [value]="25" [animated]="true"></my-progress-bar>
    `, TestComponent);

      expect(getProgressElement(fixture).classList).toContain('progress-bar-animated');
    });
  });


  describe('custom labels', () => {

    it('should show custom labels inside component selector', () => {
      fixture = createGenericTestComponent(`
        <my-progress-bar [value]="25">Custom label</my-progress-bar>
      `, TestComponent);

      expect(getProgressElement(fixture).textContent).toContain('Custom label');

    });
  });

});
