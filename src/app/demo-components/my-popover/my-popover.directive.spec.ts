import { MyPopoverDirective } from './my-popover.directive';
import { ViewChild, Component, NgModule } from '@angular/core';
import { PopoverWindowComponent } from 'app/demo-components/my-popover/popover-window/popover-window.component';
import { createGenericTestComponent } from 'test/common';
import { ComponentFixture } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@NgModule({
  imports: [],
  exports: [],
  declarations: [PopoverWindowComponent],
  providers: [],
  entryComponents: [
    PopoverWindowComponent
  ]
})
export class TestModule { }

@Component({
  selector: 'test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(MyPopoverDirective) myPopoverDirective: MyPopoverDirective;

  onOpen() {
  }

  onClose() {
  }
}


describe('MyPopoverDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [TestComponent, MyPopoverDirective]
    });
  }));

  it('should be created', () => {
    fixture = createGenericTestComponent(`
      <button myPopover>Button</button>
    `, TestComponent);

    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });


  it('should call open and close method when clicking the host element', () => {
    fixture = createGenericTestComponent(`
      <button myPopover>Button</button>
    `, TestComponent);

    component = fixture.componentInstance;

    const buttonElement: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;

    const openSpy = spyOn(component.myPopoverDirective, 'open').and.callThrough();
    const closeSpy = spyOn(component.myPopoverDirective, 'close').and.callThrough();

    buttonElement.click();
    expect(openSpy).toHaveBeenCalled();

    buttonElement.click();
    expect(closeSpy).toHaveBeenCalled();
  });


  it('should load a PopoverWindowComponent when open method is called', () => {
    fixture = createGenericTestComponent(`
      <button myPopover>Button</button>
    `, TestComponent);

    component = fixture.componentInstance;
    component.myPopoverDirective.open();

    expect(fixture.debugElement.query(By.css('popover-window'))).toBeTruthy();
  });

  it('should specify title and string content with input property', () => {
    fixture = createGenericTestComponent(`
      <button myPopover="Contents" popoverTitle="Title">Button</button>
    `, TestComponent);

    component = fixture.componentInstance;
    component.myPopoverDirective.open();

    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.popover-title'));
    expect(title.nativeElement.textContent).toContain('Title');

    const content = fixture.debugElement.query(By.css('.popover-content'));
    expect(content.nativeElement.textContent).toContain('Contents');
  });

  it('should specify content with a template', () => {
    fixture = createGenericTestComponent(`
      <button [myPopover]="t" popoverTitle="Title">Button</button>
      <ng-template #t>
        Contents in template.
      </ng-template>
    `, TestComponent);

    component = fixture.componentInstance;
    component.myPopoverDirective.open();

    fixture.detectChanges();

    const content = fixture.debugElement.query(By.css('.popover-content'));
    expect(content.nativeElement.textContent).toContain('Contents in template');
  });


  it('should use top placement as default', () => {
    fixture = createGenericTestComponent(`
      <button myPopover="Contents" popoverTitle="Title">Button</button>
    `, TestComponent);

    component = fixture.componentInstance;
    component.myPopoverDirective.open();
    fixture.detectChanges();

    const popover = fixture.debugElement.query(By.css('.popover'));
    expect(popover.nativeElement.classList).toContain('popover-top');
  });

  it('should specify placement by input property', () => {
    fixture = createGenericTestComponent(`
      <button myPopover="Contents" popoverTitle="Title" placement="right">Button</button>
    `, TestComponent);

    component = fixture.componentInstance;
    component.myPopoverDirective.open();
    fixture.detectChanges();

    const popover = fixture.debugElement.query(By.css('.popover'));
    expect(popover.nativeElement.classList).toContain('popover-right');
  });


  it('should emit shown and hidden events', () => {
    fixture = createGenericTestComponent(`
      <button myPopover="Contents" popoverTitle="Title" (shown)="onOpen()" (hidden)="onClose()">Button</button>
    `, TestComponent);
    component = fixture.componentInstance;

    const openSpy = spyOn(component, 'onOpen');
    const closeSpy = spyOn(component, 'onClose');

    component.myPopoverDirective.open();
    expect(openSpy).toHaveBeenCalled();

    component.myPopoverDirective.close();
    expect(closeSpy).toHaveBeenCalled();
  });

});
