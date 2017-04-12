import { Component, OnInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from 'app/demo-components/tab/tab.component';

@Component({
  selector: 'my-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    if (this.tabs.length > 0) {
      this.tabs.first.active = true;
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.forEach(x => x.active = false);
    tab.active = true;
  }
}
