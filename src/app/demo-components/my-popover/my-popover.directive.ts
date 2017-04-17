import {
  Directive, HostListener, ComponentRef,
  OnInit, ElementRef, Injector, ViewContainerRef,
  Renderer, ComponentFactoryResolver, NgZone, Input, TemplateRef, OnDestroy
} from '@angular/core';
import { PopoverWindowComponent } from 'app/demo-components/my-popover/popover-window/popover-window.component';
import { PopupService } from 'app/demo-components/utils/popup';
import { positionElements } from 'app/demo-components/utils/positioning';

@Directive({
  selector: '[myPopover]'
})
export class MyPopoverDirective implements OnInit, OnDestroy {

  @Input() myPopover: string | TemplateRef<any>;
  @Input() popoverTitle: string;
  @Input() placement = 'top';
  @Input() container: string;

  private windowRef: ComponentRef<PopoverWindowComponent>;
  private popupService: PopupService<PopoverWindowComponent>;
  private zoneSubscription: any;

  constructor(
    private elementRef: ElementRef,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer,
    private componentFactoryResolver: ComponentFactoryResolver,
    private ngZone: NgZone
  ) { }

  @HostListener('click') toggle() {
    if (!this.isOpened()) {
      this.open();
    } else {
      this.close();
    }
  }

  isOpened() {
    return this.windowRef != null;
  }

  open() {
    this.windowRef = this.popupService.open(this.myPopover);
    this.windowRef.instance.title = this.popoverTitle;
    this.windowRef.instance.placement = this.placement;
  }

  close() {
    this.popupService.close();
    this.windowRef = null;
  }

  ngOnInit(): void {
    this.popupService = new PopupService<PopoverWindowComponent>(
      PopoverWindowComponent,
      this.injector,
      this.viewContainerRef,
      this.renderer,
      this.componentFactoryResolver
    );

    this.zoneSubscription = this.ngZone.onStable.subscribe(() => {
      if (this.windowRef) {
        positionElements(
          this.elementRef.nativeElement,
          this.windowRef.location.nativeElement,
          this.placement,
          this.container === 'body'
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.close();
    this.zoneSubscription.unsubscribe();
  }
}
