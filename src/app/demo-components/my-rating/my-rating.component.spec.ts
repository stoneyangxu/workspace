import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, OnInit, ViewChild } from '@angular/core';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';
import { MyRatingComponent } from 'app/demo-components/my-rating/my-rating.component';

@Component({
  selector: 'app-test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(MyRatingComponent) instance: MyRatingComponent;

  currentRate: number;
}

function rateOn(fixture, rate) {
    const buttons = fixture.debugElement.queryAll(By.css('i.fa'));
    buttons[rate - 1].nativeElement.click();
    fixture.detectChanges();
}

describe('MyRatingComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let instance: MyRatingComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, MyRatingComponent]
    });
  }));

  it('should create', () => {
    fixture = createGenericTestComponent(`
      <my-rating></my-rating>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;
    expect(instance).toBeTruthy();
  });

  it('should contain 10 empty stars', () => {
    fixture = createGenericTestComponent(`
      <my-rating></my-rating>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const buttons = fixture.debugElement.queryAll(By.css('.fa-star-o'));
    expect(buttons.length).toBe(10);
  });

  it('should specify amount of stars with max property', () => {
    fixture = createGenericTestComponent(`
      <my-rating [max]="5"></my-rating>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const buttons = fixture.debugElement.queryAll(By.css('.fa-star-o'));
    expect(buttons.length).toBe(5);
  });

  it('should bind rating result by two-way binding', () => {
    fixture = createGenericTestComponent(`
      <my-rating [(rate)]="currentRate"></my-rating>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    component.currentRate = 5;
    fixture.detectChanges();
    expect(instance.rate).toBe(5);

    instance.setRate(6);
    expect(component.currentRate).toBe(6);
  });

  it('should update rate result when clicking on a star', () => {
    fixture = createGenericTestComponent(`
      <my-rating [(rate)]="currentRate"></my-rating>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    rateOn(fixture, 6);

    expect(component.currentRate).toBe(6);
  });

  it('should change class to `fa-star` if index is less than current rate ', () => {
    fixture = createGenericTestComponent(`
      <my-rating></my-rating>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    instance.setRate(6);
    fixture.detectChanges();

    const rated = fixture.debugElement.queryAll(By.css('.fa-star'));
    expect(rated.length).toBe(6);
  });

  it('should fill the stars when mouse enter', () => {
    fixture = createGenericTestComponent(`
      <my-rating></my-rating>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const buttons = fixture.debugElement.queryAll(By.css('.fa-star-o'));
    buttons[5].triggerEventHandler('mouseenter', {});

    fixture.detectChanges();

    const rated = fixture.debugElement.queryAll(By.css('.fa-star'));
    expect(rated.length).toBe(6);

    expect(instance.rate).toBe(0);
  });

  it('should disable rating with readonly property', () => {
    fixture = createGenericTestComponent(`
      <my-rating [readonly]="true" [(rate)]="currentRate"></my-rating>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    component.currentRate = 10;

    rateOn(fixture, 6);

    expect(component.currentRate).toBe(10);
  });

  it('should change max value', () => {
    fixture = createGenericTestComponent(`
      <my-rating [max]="20" [(rate)]="currentRate"></my-rating>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    rateOn(fixture, 20);

    expect(component.currentRate).toBe(20);
  });
});
