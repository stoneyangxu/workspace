import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, OnInit, ViewChild } from '@angular/core';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';
import { MyDropdownDirective } from 'app/demo-components/my-dropdown/my-dropdown.directive';
import { MyDropdownButtonDirective } from 'app/demo-components/my-dropdown/my-dropdown-button.directive';

@Component({
  selector: 'app-test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(MyDropdownDirective) instance: MyDropdownDirective;

  onStatusChange(status) { }
}

function clickMyDropdownButton(fixture): void {
  const btn = fixture.debugElement.query(By.css('[myDropdownButton]')).nativeElement;
  btn.click();
  fixture.detectChanges();
}

describe('MyDropdownDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let instance: MyDropdownDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, MyDropdownDirective, MyDropdownButtonDirective]
    });
  }));

  it('should layout host div with bootstrap classes', () => {
    fixture = createGenericTestComponent(`
      <div class="btn-group" myDropdown>
        <button myDropdownButton type="button" class="btn btn-outline-primary dropdown-toggle">
          Action
        </button>
        <div class="dropdown-menu">
          <button class="dropdown-item">Action - 1</button>
          <button class="dropdown-item">Action - 2</button>
        </div>
      </div>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;
    expect(component).toBeTruthy();
    expect(instance).toBeTruthy();
  });

  it('should toggle `show` class when clicking myDropdownButton', () => {
    fixture = createGenericTestComponent(`
      <div class="btn-group" myDropdown>
        <button myDropdownButton type="button" class="btn btn-outline-primary dropdown-toggle">
          Action
        </button>
        <div class="dropdown-menu">
          <button class="dropdown-item">Action - 1</button>
          <button class="dropdown-item">Action - 2</button>
        </div>
      </div>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const dropdownContainerElement = fixture.debugElement.query(By.css('[myDropdown]')).nativeElement;

    expect(dropdownContainerElement.classList).not.toContain('show');

    clickMyDropdownButton(fixture);
    expect(dropdownContainerElement.classList).toContain('show');

    clickMyDropdownButton(fixture);
    expect(dropdownContainerElement.classList).not.toContain('show');
  });

  it('should set defulat open status with input property', () => {
    fixture = createGenericTestComponent(`
      <div class="btn-group" myDropdown [opened]="true">
        <button myDropdownButton type="button" class="btn btn-outline-primary dropdown-toggle">
          Action
        </button>
        <div class="dropdown-menu">
          <button class="dropdown-item">Action - 1</button>
          <button class="dropdown-item">Action - 2</button>
        </div>
      </div>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const dropdownContainerElement = fixture.debugElement.query(By.css('[myDropdown]')).nativeElement;
    expect(dropdownContainerElement.classList).toContain('show');
  });

  it('should emit statusChange event when it is opened or closed', () => {
    fixture = createGenericTestComponent(`
      <div class="btn-group" myDropdown (statusChange)="onStatusChange($event)">
        <button myDropdownButton type="button" class="btn btn-outline-primary dropdown-toggle">
          Action
        </button>
        <div class="dropdown-menu">
          <button class="dropdown-item">Action - 1</button>
          <button class="dropdown-item">Action - 2</button>
        </div>
      </div>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const spy = spyOn(component, 'onStatusChange');

    clickMyDropdownButton(fixture);
    expect(spy).toHaveBeenCalledWith(true);

    clickMyDropdownButton(fixture);
    expect(spy).not.toContain(false);
  });

  it('should open or close manually', () => {
    fixture = createGenericTestComponent(`
      <div class="btn-group" myDropdown>
        <button myDropdownButton type="button" class="btn btn-outline-primary dropdown-toggle">
          Action
        </button>
        <div class="dropdown-menu">
          <button class="dropdown-item">Action - 1</button>
          <button class="dropdown-item">Action - 2</button>
        </div>
      </div>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    expect(instance.isOpen).toBeFalsy('closed as default');

    instance.open();
    expect(instance.isOpen).toBeTruthy('opened after open()');

    instance.close();
    expect(instance.isOpen).toBeFalsy('closed after close()');

    instance.toggle();
    expect(instance.isOpen).toBeTruthy('toggle to opened');

    instance.toggle();
    expect(instance.isOpen).toBeFalsy('toggle to closed');
  });

  it('should be dropup with input property', () => {
    fixture = createGenericTestComponent(`
      <div class="btn-group" myDropdown [up]="true">
        <button myDropdownButton type="button" class="btn btn-outline-primary dropdown-toggle">
          Action
        </button>
        <div class="dropdown-menu">
          <button class="dropdown-item">Action - 1</button>
          <button class="dropdown-item">Action - 2</button>
        </div>
      </div>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const dropdownContainerElement = fixture.debugElement.query(By.css('[myDropdown]')).nativeElement;
    expect(dropdownContainerElement.classList).toContain('dropup');
    expect(dropdownContainerElement.classList).not.toContain('dropdown');

    instance.up = false;
    fixture.detectChanges();

    expect(dropdownContainerElement.classList).not.toContain('dropup');
    expect(dropdownContainerElement.classList).toContain('dropdown');
  });

  it('should be trutry of `autoClose`', () => {
    fixture = createGenericTestComponent(`
      <div class="btn-group" myDropdown>
        <button myDropdownButton type="button" class="btn btn-outline-primary dropdown-toggle">
          Action
        </button>
        <div class="dropdown-menu">
          <button class="dropdown-item">Action - 1</button>
          <button class="dropdown-item">Action - 2</button>
        </div>
      </div>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    expect(instance.autoClose).toBeTruthy();

    instance.open();
    fixture.debugElement.query(By.directive(MyDropdownDirective)).triggerEventHandler('keyup.esc', {});

    expect(instance.isOpen).toBeFalsy();
  });

  it('should close the list when clicking the button if `autoClose` is true', () => {
    fixture = createGenericTestComponent(`
      <div class="btn-group" myDropdown>
        <button myDropdownButton type="button" class="btn btn-outline-primary dropdown-toggle">
          Action
        </button>
        <div class="dropdown-menu">
          <button class="dropdown-item">Action - 1</button>
          <button class="dropdown-item">Action - 2</button>
        </div>
      </div>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const btn = fixture.debugElement.query(By.css('.dropdown-item')).nativeElement;

    instance.open();
    btn.click();

    expect(instance.isOpen).toBeFalsy();
  });

});
