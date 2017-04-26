import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, OnInit, ViewChild, DebugElement } from '@angular/core';
import { createGenericTestComponent } from 'test/common';
import { By } from '@angular/platform-browser';
import { MyPaginationComponent } from 'app/demo-components/my-pagination/my-pagination.component';

@Component({
  selector: 'app-test-component',
  template: ''
})
export class TestComponent {
  @ViewChild(MyPaginationComponent) instance: MyPaginationComponent;

  onPageChange(page) { }
}

function getPreviousButton(fixture): DebugElement {
  return fixture.debugElement.query(By.css('.previous-btn'));
}

function getNextButton(fixture): DebugElement {
  return fixture.debugElement.query(By.css('.next-btn'));
}

function getFirstButton(fixture): DebugElement {
  return fixture.debugElement.query(By.css('.first-btn'));
}

function getLastButton(fixture): DebugElement {
  return fixture.debugElement.query(By.css('.last-btn'));
}

function getPageButton(fixture, page): DebugElement {
  const buttons = fixture.debugElement.queryAll(By.css('.page-item'));
  return buttons.find(x => x.nativeElement.textContent.trim().indexOf(page.toString()) > -1);
}

function getCurrentPage(fixture): number {
  const activeButton = fixture.debugElement.query(By.css('.active'));
  return Number.parseInt(activeButton.nativeElement.textContent.trim());
}

describe('MyPaginationComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let instance: MyPaginationComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, MyPaginationComponent]
    });
  }));

  it('should create', () => {
    fixture = createGenericTestComponent(`
      <my-pagination></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;
    expect(component).toBeTruthy();
  });

  it('should display pager buttons with pages array', () => {
    fixture = createGenericTestComponent(`
      <my-pagination></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    instance.pages = [1, 2, 3, 4, 5];
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('.page-item .page-link'));
    const numbers = buttons.map(x => Number.parseInt(x.nativeElement.textContent.trim()));

    expect(numbers).toEqual([1, 2, 3, 4, 5]);
  });

  it('should apply collectionSize as amount of rows', () => {
    fixture = createGenericTestComponent(`
      <my-pagination [collectionSize]="500"></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    expect(instance.collectionSize).toBe(500);
  });

  it('should use 10 as default pageSize', () => {
    fixture = createGenericTestComponent(`
      <my-pagination [collectionSize]="50"></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    expect(instance.pageSize).toBe(10);
    expect(instance.pages).toEqual([1, 2, 3, 4, 5]);
  });

  it('should hide direction link as default', () => {
    fixture = createGenericTestComponent(`
      <my-pagination [collectionSize]="50"></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    expect(getPreviousButton(fixture)).toBeFalsy();
    expect(getNextButton(fixture)).toBeFalsy();
  });

  it('should show direction link if directionLinks is true', () => {
    fixture = createGenericTestComponent(`
      <my-pagination [collectionSize]="50" [directionLinks]="true"></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    expect(getPreviousButton(fixture)).toBeTruthy();
    expect(getNextButton(fixture)).toBeTruthy();
  });

  it('should hide boundaryLinks as default', () => {
    fixture = createGenericTestComponent(`
      <my-pagination [collectionSize]="50"></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;
    expect(getFirstButton(fixture)).toBeFalsy();
    expect(getLastButton(fixture)).toBeFalsy();
  });

  it('should show boundaryLinks if boundaryLinks is true', () => {
    fixture = createGenericTestComponent(`
      <my-pagination [boundaryLinks]="true" [collectionSize]="50"></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;
    expect(getFirstButton(fixture)).toBeTruthy();
    expect(getLastButton(fixture)).toBeTruthy();
  });

  it('should active page button if current page equals page number', () => {
    fixture = createGenericTestComponent(`
      <my-pagination [collectionSize]="50"></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    instance.page = 2;
    fixture.detectChanges();

    const activeButton = fixture.debugElement.query(By.css('.active'));
    expect(activeButton.nativeElement.textContent).toContain('2');
  });

  it('should disable first and previous button if current page is 1', () => {
    fixture = createGenericTestComponent(`
      <my-pagination [boundaryLinks]="true" [directionLinks]="true" [collectionSize]="50"></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    instance.page = 1;
    fixture.detectChanges();

    expect(getFirstButton(fixture).nativeElement.classList).toContain('disabled');
    expect(getPreviousButton(fixture).nativeElement.classList).toContain('disabled');
  });

  it('should disable last and next button if current page is last one', () => {
    fixture = createGenericTestComponent(`
      <my-pagination [boundaryLinks]="true" [directionLinks]="true" [collectionSize]="50"></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    instance.page = instance.pages.length;

    fixture.detectChanges();

    expect(getLastButton(fixture).nativeElement.classList).toContain('disabled');
    expect(getNextButton(fixture).nativeElement.classList).toContain('disabled');
  });

  it('should emit pageChange event when selecting page', () => {
    fixture = createGenericTestComponent(`
      <my-pagination
        (pageChange)="onPageChange($event)"
        [boundaryLinks]="true"
        [directionLinks]="true"
        [collectionSize]="50"
      ></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const spy = spyOn(component, 'onPageChange');

    const button = getPageButton(fixture, 2);
    button.nativeElement.click();

    expect(spy).toHaveBeenCalledWith(2);
  });

  it('should change active button when clicking', () => {
    fixture = createGenericTestComponent(`
      <my-pagination
        (pageChange)="onPageChange($event)"
        [boundaryLinks]="true"
        [directionLinks]="true"
        [collectionSize]="50"
      ></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const button = getPageButton(fixture, 2);

    expect(button.nativeElement.classList).not.toContain('active');
    button.nativeElement.click();
    fixture.detectChanges();
    expect(button.nativeElement.classList).toContain('active');
  });

  it('should goto previous if click `previous button`', () => {
    fixture = createGenericTestComponent(`
      <my-pagination
        (pageChange)="onPageChange($event)"
        [boundaryLinks]="true"
        [directionLinks]="true"
        [collectionSize]="50"
      ></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    instance.page = 3;
    fixture.detectChanges();

    expect(getCurrentPage(fixture)).toBe(3);

    getPreviousButton(fixture).nativeElement.click();
    fixture.detectChanges();

    expect(getCurrentPage(fixture)).toBe(2);
  });
  it('should goto next if click `next button`', () => {
    fixture = createGenericTestComponent(`
      <my-pagination
        (pageChange)="onPageChange($event)"
        [boundaryLinks]="true"
        [directionLinks]="true"
        [collectionSize]="50"
      ></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    instance.page = 3;
    fixture.detectChanges();

    expect(getCurrentPage(fixture)).toBe(3);

    getNextButton(fixture).nativeElement.click();
    fixture.detectChanges();

    expect(getCurrentPage(fixture)).toBe(4);
  });
  it('should goto first if click `first button`', () => {
    fixture = createGenericTestComponent(`
      <my-pagination
        (pageChange)="onPageChange($event)"
        [boundaryLinks]="true"
        [directionLinks]="true"
        [collectionSize]="50"
      ></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    instance.page = 3;
    fixture.detectChanges();

    expect(getCurrentPage(fixture)).toBe(3);

    getFirstButton(fixture).nativeElement.click();
    fixture.detectChanges();

    expect(getCurrentPage(fixture)).toBe(1);
  });
  it('should goto last if click `last button`', () => {
    fixture = createGenericTestComponent(`
      <my-pagination
        (pageChange)="onPageChange($event)"
        [boundaryLinks]="true"
        [directionLinks]="true"
        [collectionSize]="50"
      ></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    instance.page = 3;
    fixture.detectChanges();

    expect(getCurrentPage(fixture)).toBe(3);

    getLastButton(fixture).nativeElement.click();
    fixture.detectChanges();

    expect(getCurrentPage(fixture)).toBe(5);
  });

  it('should goto first if newPage is less than 1', () => {
    fixture = createGenericTestComponent(`
      <my-pagination
        [page]="3"
        [collectionSize]="50"
      ></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    instance.gotoPage(-5);

    expect(instance.page).toBe(1);
  });

  it('should goto last if newPage is greater than max pages', () => {
    fixture = createGenericTestComponent(`
      <my-pagination
        [page]="3"
        [collectionSize]="50"
      ></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    instance.gotoPage(100);

    expect(instance.page).toBe(5);
  });

  it('should disable pagination with `disabled` property', () => {
    fixture = createGenericTestComponent(`
      <my-pagination
        [collectionSize]="50"
        [disabled]="true"
      ></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const buttons = fixture.debugElement.queryAll(By.css('.page-item'));
    const allDisabled = buttons.every(x => x.nativeElement.classList.contains('disabled'));
    expect(allDisabled).toBeTruthy();
  });

  it('should change button size to sm with `size` property', () => {
    fixture = createGenericTestComponent(`
      <my-pagination
        [collectionSize]="50"
        size="sm"
      ></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const pagination = fixture.debugElement.query(By.css('.pagination'));
    expect(pagination.nativeElement.classList).toContain('pagination-sm');
  });
  it('should change button size to lg with `size` property', () => {
    fixture = createGenericTestComponent(`
      <my-pagination
        [collectionSize]="50"
        size="lg"
      ></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    const pagination = fixture.debugElement.query(By.css('.pagination'));
    expect(pagination.nativeElement.classList).toContain('pagination-lg');
  });

  it('should support ellipses and maxPage', () => {
    fixture = createGenericTestComponent(`
      <my-pagination
        [collectionSize]="500"
        [pageSize]="10"
        [ellipses]="true"
        [maxSize]="5"
      ></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    instance.gotoPage(1);
    expect(instance.pages).toEqual([1, 2, 3, 4, 5, -1, 50]);

    instance.gotoPage(5);
    expect(instance.pages).toEqual([1, 2, 3, 4, 5, -1, 50]);

    instance.gotoPage(6);
    expect(instance.pages).toEqual([1, -1, 6, 7, 8, 9, 10, -1, 50]);

    instance.gotoPage(45);
    expect(instance.pages).toEqual([1, -1, 41, 42, 43, 44, 45, -1, 50]);

    instance.gotoPage(50);
    expect(instance.pages).toEqual([1, -1, 46, 47, 48, 49, 50]);
  });

  it('should support rotate', () => {
    fixture = createGenericTestComponent(`
      <my-pagination
        [collectionSize]="500"
        [pageSize]="10"
        [rotate]="true"
        [ellipses]="true"
        [maxSize]="5"
      ></my-pagination>
    `, TestComponent);
    component = fixture.componentInstance;
    instance = component.instance;

    instance.gotoPage(1);
    expect(instance.pages).toEqual([1, 2, 3, 4, 5, -1, 50]);

    instance.gotoPage(5);
    expect(instance.pages).toEqual([1, -1, 3, 4, 5, 6, 7, -1, 50]);

    // instance.gotoPage(6);
    // expect(instance.pages).toEqual([1, -1, 6, 7, 8, 9, 10, -1, 50]);

    // instance.gotoPage(45);
    // expect(instance.pages).toEqual([1, -1, 41, 42, 43, 44, 45, -1, 50]);

    instance.gotoPage(50);
    expect(instance.pages).toEqual([1, -1, 46, 47, 48, 49, 50]);
  });

});
