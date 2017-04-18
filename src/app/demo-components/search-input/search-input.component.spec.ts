import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';

import { Component, OnInit, DebugElement, ViewChild } from '@angular/core';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(SearchInputComponent) searchInputComponent: SearchInputComponent;
}

function getInput(fixture): DebugElement {
  return fixture.debugElement.query(By.css('input'));
}

function getSearchButton(fixture): DebugElement {
  return fixture.debugElement.query(By.css('button'));
}

describe('SearchInputComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [TestComponent, SearchInputComponent]
    });
  }));

  it('should create', () => {
    fixture = createGenericTestComponent(`
      <search-input></search-input>
    `, TestComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });


  it('should contain a input element and a search button', () => {
    fixture = createGenericTestComponent(`
      <search-input></search-input>
    `, TestComponent);

    component = fixture.componentInstance;

    const input = getInput(fixture);
    expect(input).toBeTruthy();

    const button = getSearchButton(fixture);
    expect(button).toBeTruthy();
  });


  it('should call search method when button is clicked', () => {
    fixture = createGenericTestComponent(`
      <search-input></search-input>
    `, TestComponent);
    component = fixture.componentInstance;

    const spy = spyOn(component.searchInputComponent, 'search');

    const inputElement: HTMLInputElement = getInput(fixture).nativeElement;
  });


  it('should call search method when press enter key', () => {
    fixture = createGenericTestComponent(`
      <search-input></search-input>
    `, TestComponent);
    component = fixture.componentInstance;

    const spy = spyOn(component.searchInputComponent, 'search');

    getSearchButton(fixture).nativeElement.click();
    expect(spy).toHaveBeenCalled();

  });

  it('should apply placeholder parameter', () => {
    fixture = createGenericTestComponent(`
      <search-input placeholder="Pleace enter keywords."></search-input>
    `, TestComponent);
    const inputElement = getInput(fixture).nativeElement;
    expect(inputElement.getAttribute('placeholder')).toBe('Pleace enter keywords.');
  });
});
