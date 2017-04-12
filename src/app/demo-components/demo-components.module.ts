import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoComponentsRoutingModule } from './demo-components-routing.module';
import { DemoComponentsMainComponent } from './demo-components-main/demo-components-main.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
  imports: [
    CommonModule,
    DemoComponentsRoutingModule
  ],
  declarations: [DemoComponentsMainComponent, TabsComponent, TabComponent]
})
export class DemoComponentsModule { }
