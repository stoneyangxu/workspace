import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolderComponent } from './holder.component';
import { Component, NgModule } from '@angular/core';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';
import { DisplayTimeComponent } from 'app/demo-components/load-component/display-time/display-time.component';
import { DtPlaceholderDirective } from 'app/demo-components/load-component/dt-placeholder.directive';

@Component({
  selector: 'test-component',
  template: ''
})
export class TestComponent {
}

@NgModule({
  declarations: [DisplayTimeComponent],
  entryComponents: [
    DisplayTimeComponent,
  ]
})
class TestModule {}

describe('HolderComponent', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [TestComponent, HolderComponent, DtPlaceholderDirective]
    });
  }));


  it('should display with a button', () => {
    fixture = createGenericTestComponent(`
      <holder></holder>
    `, TestComponent);

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement).toBeTruthy('display a button');
  });

  it('should load DisplayTimeComponent in the placeholder', () => {
    fixture = createGenericTestComponent(`
      <holder></holder>
    `, TestComponent);

    const placeholder = fixture.debugElement.query(By.css('.create-time'));
    expect(placeholder.nativeElement.textContent).toBeTruthy('display create time');
  });
});
