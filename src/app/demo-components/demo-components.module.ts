import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoComponentsRoutingModule } from './demo-components-routing.module';
import { DemoComponentsMainComponent } from './demo-components-main/demo-components-main.component';

@NgModule({
  imports: [
    CommonModule,
    DemoComponentsRoutingModule
  ],
  declarations: [DemoComponentsMainComponent]
})
export class DemoComponentsModule { }
