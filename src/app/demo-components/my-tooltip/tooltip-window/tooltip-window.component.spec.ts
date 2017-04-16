import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipWindowComponent } from './tooltip-window.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(TooltipWindowComponent) tooltipWindowComponent: TooltipWindowComponent;
}

describe('TooltipWindowComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TooltipWindowComponent]
    });
  }));

  it('should create', () => {
    fixture = createGenericTestComponent(`
      <tooltip-window></tooltip-window>
    `, TestComponent);
    component = fixture.componentInstance;
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });


  it('should display a .tooltip and a .tooltip-inner inside', () => {
    fixture = createGenericTestComponent(`
      <tooltip-window></tooltip-window>
    `, TestComponent);

    const tooltipContainer = fixture.debugElement.query(By.css('.tooltip'));
    const inner = tooltipContainer.query(By.css('.tooltip-inner'));

    expect(tooltipContainer).toBeTruthy();
    expect(inner).toBeTruthy();
  });

  it('should display content arround <tooltip-window> tags', () => {
    fixture = createGenericTestComponent(`
      <tooltip-window>Custom Content!</tooltip-window>
    `, TestComponent);

    const tooltip = fixture.debugElement.query(By.css('.tooltip-inner'));
    expect(tooltip.nativeElement.textContent).toContain('Custom Content!');
  });

  it('should add tooltip-top class to the container as default', () => {
    fixture = createGenericTestComponent(`
      <tooltip-window>Custom Content!</tooltip-window>
    `, TestComponent);

    const tooltip = fixture.debugElement.query(By.css('.tooltip'));
    expect(tooltip.nativeElement.classList).toContain('tooltip-top');
  });

  it('should add tooltip-{placement} class to the container', () => {
    fixture = createGenericTestComponent(`
      <tooltip-window placement="bottom">Custom Content!</tooltip-window>
    `, TestComponent);

    const tooltip = fixture.debugElement.query(By.css('.tooltip'));
    expect(tooltip.nativeElement.classList).toContain('tooltip-bottom');
  });


  it('should add id by hostbinding', () => {
    fixture = createGenericTestComponent(`
      <tooltip-window placement="bottom">Custom Content!</tooltip-window>
    `, TestComponent);

    fixture.componentInstance.tooltipWindowComponent.id = 'id-by-hostbinding';

    fixture.detectChanges();

    const tooltip: HTMLElement = fixture.debugElement.query(By.css('tooltip-window')).nativeElement;
    expect(tooltip.getAttribute('id')).toBe('id-by-hostbinding');
  });

});
