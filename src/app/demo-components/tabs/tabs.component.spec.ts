import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';
import { TabComponent } from 'app/demo-components/tab/tab.component';
import { QueryList } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'test-my-tabs',
  template: ''
})
export class TestTabsComponent {
  @ViewChild(TabsComponent) tabs: TabsComponent;
  constructor() { }
}

describe('TabsComponent', () => {

  const html = `
    <my-tabs>
      <my-tab tabTitle="tab1">
        Tab 1 content
      </my-tab>
      <my-tab tabTitle="tab2">
        Tab 2 content
      </my-tab>
    </my-tabs>
  `;

  let component: TestTabsComponent;
  let fixture: ComponentFixture<TestTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestTabsComponent, TabsComponent, TabComponent]
    });
  }));

  beforeEach(() => {

    TestBed.overrideComponent(TestTabsComponent, { set: { template: html } });

    fixture = TestBed.createComponent(TestTabsComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display childrens components with the property tabs', () => {
    const tabs = fixture.debugElement.queryAll(By.css('li'));
    expect(tabs.length).toBe(2);
  });

  it('should active the first tab as default', () => {
    const tabsComponent = component.tabs;
    expect(tabsComponent.tabs.first.active).toBeTruthy();
    expect(tabsComponent.tabs.last.active).toBeFalsy();
  });


  it('should siwtch tab when clicking the title', () => {
    const tabTitles = fixture.debugElement.queryAll(By.css('li'));
    const secondTabTitle = tabTitles[tabTitles.length - 1].nativeElement;

    secondTabTitle.click();

    expect(component.tabs.tabs.first.active).toBeFalsy('the first tab is unactive');
    expect(component.tabs.tabs.last.active).toBeTruthy('the tab clicked is active');
  });

});
