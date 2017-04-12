import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProgressBarComponent } from './my-progress-bar.component';
import { createGenericTestComponent } from 'test/common';
import { ViewChild, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

function getProgressWitdh(fixture) {
  const barElement = fixture.debugElement.query(By.css('.progress-bar')).nativeElement;
  return barElement.style.width;
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


  it('should move the progress bar with value property as a percent valud', () => {
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

    const progressBar = fixture.debugElement.query(By.css('.progress-bar'));
    const barElement: HTMLDivElement = progressBar.nativeElement;

    expect(getProgressWitdh(fixture)).toBe('12.5%');
    expect(getAriaValuenow(fixture)).toBe('12.5');
  });
});
