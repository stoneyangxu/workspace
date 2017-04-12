import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponent } from './tab.component';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should hide content when it is not actived', () => {
    component.active = false;

    fixture.detectChanges();

    const contentElement = fixture.debugElement.children;
    expect(contentElement.length).toBe(1);

    expect(contentElement[0].nativeElement.hidden).toBeTruthy();
  });

  it('should show content when it is actived', () => {
    component.active = true;

    fixture.detectChanges();

    const contentElement = fixture.debugElement.children;
    expect(contentElement.length).toBe(1);

    expect(contentElement[0].nativeElement.hidden).toBeFalsy();
  });

});
