import { MyHighlightDirective } from './my-highlight.directive';

import { Component, OnInit } from '@angular/core';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { async } from '@angular/core/testing';

@Component({
  selector: 'test-compoennt',
  template: ''
})

export class TestComponent {
}

describe('MyHighlightDirective', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, MyHighlightDirective]
    });
  }));

  it('should highlight element', () => {
    const fixture = createGenericTestComponent(`
      <div myHighlight>Content</div>
    `, TestComponent);

    const elemnt = fixture.debugElement.query(By.css('div')).nativeElement;

    expect(elemnt.style['background-color']).toBe('yellow');
  });

  it('should change the background-color when mouse enter', () => {
    const fixture = createGenericTestComponent(`
      <div myHighlight>Content</div>
    `, TestComponent);

    const elemnt: HTMLDivElement = fixture.debugElement.query(By.css('div')).nativeElement;

    elemnt.dispatchEvent(new Event('mouseenter'));
    expect(elemnt.style['background-color']).toBe('green');

    elemnt.dispatchEvent(new Event('mouseleave'));
    expect(elemnt.style['background-color']).toBe('yellow');
  });

  it('should define the highlight color by attribute', () => {
    const fixture = createGenericTestComponent(`
      <div myHighlight highlightColor="pink">Content</div>
    `, TestComponent);

    const elemnt = fixture.debugElement.query(By.css('div')).nativeElement;
    expect(elemnt.style['background-color']).toBe('pink');
  });

});
