import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, Renderer2, Injector, Renderer, TemplateRef, ViewChild } from '@angular/core';
import { PopupContentComponent } from 'app/demo-components/demo-popup/popup-content/popup-content.component';
import { PopupService } from 'app/demo-components/utils/popup';

@Component({
  selector: 'demo-popup',
  templateUrl: './demo-popup.component.html',
  styleUrls: ['./demo-popup.component.scss']
})
export class DemoPopupComponent implements OnInit {

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  private popupService: PopupService<PopupContentComponent>;

  constructor(
    private renderer: Renderer,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {

    this.popupService = new PopupService<PopupContentComponent>(
      PopupContentComponent,
      this.injector,
      this.viewContainerRef,
      this.renderer,
      this.componentFactoryResolver
    );
  }

  clickButton() {
    this.popupService.open(this.templateRef);
  }

}
