import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoComponentsMainComponent } from './demo-components-main.component';

describe('DemoComponentsMainComponent', () => {
  let component: DemoComponentsMainComponent;
  let fixture: ComponentFixture<DemoComponentsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoComponentsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponentsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
