import { MyCollaspeDirective } from './my-collaspe.directive';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(MyCollaspeDirective) myCollaspeDirective: MyCollaspeDirective;

  collaspe = false;
}

describe('MyCollaspeDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TestComponent, MyCollaspeDirective]
    });
  }));

  it('should create an instance', () => {
    fixture = createGenericTestComponent(`
      <div [myCollaspe]>Content</div>
    `, TestComponent);

    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should be hidden as default with ngCollaspe', () => {
    fixture = createGenericTestComponent(`
      <div [myCollaspe]="false">Content</div>
    `, TestComponent);

    component = fixture.componentInstance;

    const content = fixture.debugElement.query(By.css('.collapse')).nativeElement;
    expect(content.classList).toContain('show');
  });


  it('should be hidden when myCollaspe is true', () => {
    fixture = createGenericTestComponent(`
      <div [myCollaspe]="true">Content</div>
    `, TestComponent);

    component = fixture.componentInstance;

    const content = fixture.debugElement.query(By.css('.collapse')).nativeElement;
    expect(content.classList).not.toContain('show');
  });

  it('should switch the visibility when updating the property', () => {
    fixture = createGenericTestComponent(`
      <div [myCollaspe]="collaspe">Content</div>
    `, TestComponent);

    component = fixture.componentInstance;

    const content = fixture.debugElement.query(By.css('.collapse')).nativeElement;
    expect(content.classList).toContain('show');

    component.collaspe = true;

    fixture.detectChanges();
    expect(content.classList).not.toContain('show');
  });
});
