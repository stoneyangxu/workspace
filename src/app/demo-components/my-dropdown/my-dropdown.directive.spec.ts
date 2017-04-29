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

  it('should set defulat open state with input property', () => {
    fixture = createGenericTestComponent(`
      <div class="btn-group" myDropdown [open]="true">
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
});
