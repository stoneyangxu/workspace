import { MyTooltipDirective } from './my-tooltip.directive';

import { Component, OnInit } from '@angular/core';

import { NgModule, ViewChild } from '@angular/core';
import { TooltipWindowComponent } from 'app/demo-components/my-tooltip/tooltip-window/tooltip-window.component';
import { ComponentFixture, async } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';
import { tick } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';

@NgModule({
  imports: [],
  exports: [],
  declarations: [TooltipWindowComponent],
  providers: [],
  entryComponents: [
    TooltipWindowComponent
  ]
})
export class TestModule { }

@Component({
  selector: 'test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(MyTooltipDirective) myTooltipDirective: MyTooltipDirective;

  onOpen() {
  }

  onClose() {
  }
}

describe('MyTooltipDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [TestComponent, MyTooltipDirective]
    });
  }));


  it('should be created', () => {
    fixture = createGenericTestComponent(`
      <button myTooltip="Tooltip content.">Button</button>
    `, TestComponent);

    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should show the tooltip when mouseover moves over the element', () => {
    fixture = createGenericTestComponent(`
      <button myTooltip="Tooltip content.">Button</button>
    `, TestComponent);

    const button: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    button.dispatchEvent(new Event('mouseover'));

    const tooltip = fixture.debugElement.query(By.css('.tooltip-inner'));
    expect(tooltip).toBeTruthy();
  });


  it('should reset the position of the tooltip when mouseover with default `top` placement', () => {
    fixture = createGenericTestComponent(`
      <button myTooltip="Tooltip content.">Button</button>
    `, TestComponent);

    const button: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    button.dispatchEvent(new Event('mouseover'));

    const tooltip = fixture.debugElement.query(By.css('tooltip-window')).nativeElement;

    const expectedLeft = button.getBoundingClientRect().left + button.offsetWidth / 2 - tooltip.offsetWidth / 2;

    expect(tooltip.style.top).toBe((button.getBoundingClientRect().top - tooltip.offsetHeight) + 'px');
    expect(tooltip.style.left).toBe(expectedLeft + 'px');
  });

  it('should support `right` placement', () => {
    fixture = createGenericTestComponent(`
      <button myTooltip="Tooltip content." placement="right">Button</button>
    `, TestComponent);

    const button: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    button.dispatchEvent(new Event('mouseover'));

    const tooltip = fixture.debugElement.query(By.css('tooltip-window')).nativeElement;

    const expectedTop = Math.round(button.getBoundingClientRect().top + button.offsetHeight / 2 - tooltip.offsetHeight / 2);
    const expectedLeft = Math.round(button.getBoundingClientRect().right);

    expect(tooltip.style.top).toBe(expectedTop + 'px');
    expect(tooltip.style.left).toBe(expectedLeft + 'px');
  });


  it('should hide the tooltip when mose moves out the element', () => {
    fixture = createGenericTestComponent(`
      <button myTooltip="Tooltip content.">Button</button>
    `, TestComponent);

    component = fixture.componentInstance;
    component.myTooltipDirective.open();

    const button: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    button.dispatchEvent(new Event('mouseout'));

    const tooltip = fixture.debugElement.query(By.css('.tooltip-inner'));
    expect(tooltip).toBeFalsy();
  });

  it('should support tempalteRef as content', () => {
    fixture = createGenericTestComponent(`
      <button [myTooltip]="tooltipTemplate">Button</button>
      <ng-template #tooltipTemplate>
        Contents in a template!
      </ng-template>
    `, TestComponent);

    component = fixture.componentInstance;
    component.myTooltipDirective.open();

    const tooltip = fixture.debugElement.query(By.css('.tooltip-inner'));
    expect(tooltip.nativeElement.textContent).toContain('Contents in a template!');
  });


  it('should support to append tooltip window in body', () => {
    fixture = createGenericTestComponent(`
      <button [myTooltip]="Content" container="body">Button</button>
    `, TestComponent);

    component = fixture.componentInstance;
    component.myTooltipDirective.open();

    const tooltipInBody = document.querySelector('tooltip-window');
    expect(tooltipInBody.parentElement.nodeName.toLowerCase()).toBe('body');
  });


  it('should support `isOpen` method to check whether the window is opened', () => {
    fixture = createGenericTestComponent(`
      <button [myTooltip]="Content">Button</button>
    `, TestComponent);

    component = fixture.componentInstance;
    expect(component.myTooltipDirective.isOpen()).toBeFalsy();

    component.myTooltipDirective.open();
    expect(component.myTooltipDirective.isOpen()).toBeTruthy();
  });


  it('should catch events when status changed', () => {
    fixture = createGenericTestComponent(`
      <button [myTooltip]="Content" (shown)="onOpen($event)" (hidden)="onClose($event)">Button</button>
    `, TestComponent);
    component = fixture.componentInstance;

    const openSpy = spyOn(component, 'onOpen');
    const closeSpy = spyOn(component, 'onClose');

    component.myTooltipDirective.open();
    expect(openSpy).toHaveBeenCalled();

    component.myTooltipDirective.close();
    expect(closeSpy).toHaveBeenCalled();
  });


  it('should pass a context when opening the tooltip', () => {
    fixture = createGenericTestComponent(`
      <button [myTooltip]="tooltipTemplate">Button</button>
      <ng-template #tooltipTemplate let-name="name">
        Contents in a template - {{name}} !
      </ng-template>
    `, TestComponent);

    component = fixture.componentInstance;

    component.myTooltipDirective.open({ name: 'Stone' });

    fixture.detectChanges();

    const tooltip = fixture.debugElement.query(By.css('.tooltip-inner')).nativeElement;
    expect(tooltip.textContent).toContain('Stone');
  });

  it('should support triggers like `click:blur`', () => {
    fixture = createGenericTestComponent(`
      <button myTooltip="Content" triggers="click:blur">Button</button>
    `, TestComponent);

    component = fixture.componentInstance;

    const button: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;

    button.dispatchEvent(new Event('click'));
    expect(component.myTooltipDirective.isOpen()).toBeTruthy();

    button.dispatchEvent(new Event('blur'));
    expect(component.myTooltipDirective.isOpen()).toBeFalsy();
  });


  it('should support toggle method to open and close tip', () => {
    fixture = createGenericTestComponent(`
      <button myTooltip="Content">Button</button>
    `, TestComponent);

    component = fixture.componentInstance;
    const directive = component.myTooltipDirective;

    expect(directive.isOpen()).toBeFalsy();

    directive.toggle();
    expect(directive.isOpen()).toBeTruthy();

    directive.toggle();
    expect(directive.isOpen()).toBeFalsy();
  });

});
