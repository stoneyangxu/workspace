import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoComponentsRoutingModule } from './demo-components-routing.module';
import { DemoComponentsMainComponent } from './demo-components-main/demo-components-main.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { MyAlertComponent } from './my-alert/my-alert.component';
import { MyProgressBarComponent } from './my-progress-bar/my-progress-bar.component';
import { MyTooltipDirective } from './my-tooltip/my-tooltip.directive';
import { MyHighlightDirective } from './attribute-directive/my-highlight.directive';
import { DisplayTimeComponent } from './load-component/display-time/display-time.component';
import { HolderComponent } from './load-component/holder/holder.component';
import { DtPlaceholderDirective } from './load-component/dt-placeholder.directive';
import { MyUnlessDirective } from './structural-directive/my-unless.directive';
import { DemoPopupComponent } from './demo-popup/demo-popup.component';
import { PopupContentComponent } from './demo-popup/popup-content/popup-content.component';
import { TooltipWindowComponent } from './my-tooltip/tooltip-window/tooltip-window.component';
import { MyPopoverDirective } from './my-popover/my-popover.directive';
import { PopoverWindowComponent } from './my-popover/popover-window/popover-window.component';
import { HeroDetailComponent } from './react-form/hero-detail/hero-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyCollaspeDirective } from './my-collaspe/my-collaspe.directive';
import { SearchInputComponent } from './search-input/search-input.component';
import { IpInputComponent } from './ip-input/ip-input.component';
import { MyPaginationComponent } from './my-pagination/my-pagination.component';
import { MyRadioGroupDirective } from './my-radio-group/my-radio-group.directive';
import { MyRadioDirective } from './my-radio-group/my-radio.directive';

@NgModule({
  imports: [
    CommonModule,
    DemoComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DemoComponentsMainComponent,
    TabsComponent,
    TabComponent,
    MyAlertComponent,
    MyProgressBarComponent,
    MyTooltipDirective,
    MyHighlightDirective,
    DisplayTimeComponent,
    HolderComponent,
    DtPlaceholderDirective,
    MyUnlessDirective,
    DemoPopupComponent,
    PopupContentComponent,
    TooltipWindowComponent,
    MyPopoverDirective,
    PopoverWindowComponent,
    HeroDetailComponent,
    MyCollaspeDirective,
    SearchInputComponent,
    IpInputComponent,
    MyPaginationComponent,
    MyRadioGroupDirective,
    MyRadioDirective
  ],
  entryComponents: [
    DisplayTimeComponent,
    PopupContentComponent,
    TooltipWindowComponent,
    PopoverWindowComponent
  ]
})
export class DemoComponentsModule { }
