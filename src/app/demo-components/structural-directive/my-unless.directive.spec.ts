import { MyUnlessDirective } from './my-unless.directive';
import { Component } from '@angular/core';
import { async } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { createGenericTestComponent } from 'test/common';
import { By, BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'test-compoennt',
  template: ''
})

export class TestComponent {
}

describe('MyUnlessDirective', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
      declarations: [TestComponent, MyUnlessDirective]
    });
  }));

  it('should show element when `myUnless` is false', () => {
    const fixture = createGenericTestComponent(`
      <div class="content" *myUnless="false">Content</div>
    `, TestComponent);

    const el = fixture.debugElement.query(By.css('.content'));
    expect(el).toBeTruthy();
  });

  it('should remove element when `myUnless` is true', () => {
    const fixture = createGenericTestComponent(`
      <div class="content" *myUnless="true">Content</div>
    `, TestComponent);

    const el = fixture.debugElement.query(By.css('.content'));
    expect(el).toBeFalsy();
  });


  it('should take effect with template tag', () => {
    const fixture = createGenericTestComponent(`
      <ng-template [myUnless]="false">
        <div class="content">Content</div>
      </ng-template>
    `, TestComponent);

    const el = fixture.debugElement.query(By.css('.content'));
    expect(el).toBeTruthy();
  });

});
