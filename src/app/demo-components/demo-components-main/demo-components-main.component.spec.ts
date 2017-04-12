import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoComponentsMainComponent } from './demo-components-main.component';
import { TabComponent } from 'app/demo-components/tab/tab.component';
import { TabsComponent } from 'app/demo-components/tabs/tabs.component';

describe('DemoComponentsMainComponent', () => {
  let component: DemoComponentsMainComponent;
  let fixture: ComponentFixture<DemoComponentsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoComponentsMainComponent, TabsComponent, TabComponent ]
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
