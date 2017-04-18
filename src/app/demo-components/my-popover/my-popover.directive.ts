import {
  Directive, HostListener, ComponentRef,
  OnInit, ElementRef, Injector, ViewContainerRef,
  Renderer, ComponentFactoryResolver, NgZone, Input, TemplateRef, OnDestroy, EventEmitter, Output
} from '@angular/core';
import { PopoverWindowComponent } from 'app/demo-components/my-popover/popover-window/popover-window.component';
import { PopupService } from 'app/demo-components/utils/popup';
import { positionElements } from 'app/demo-components/utils/positioning';
import { listenToTriggers } from 'app/demo-components/utils/triggers';

let nextId = 0;

@Directive({
  selector: '[myPopover]'
})
export class MyPopoverDirective implements OnInit, OnDestroy {

  @Input() myPopover: string | TemplateRef<any>;
  @Input() popoverTitle: string;
  @Input() placement = 'top';
  @Input() container: string;
  @Input() triggers = 'click';

  @Output() shown = new EventEmitter();
  @Output() hidden = new EventEmitter();

  private ngbPopoverWindowId = `ngb-popover-${nextId++}`;
  private windowRef: ComponentRef<PopoverWindowComponent>;
  private popupService: PopupService<PopoverWindowComponent>;
  private zoneSubscription: any;
  private unregisterListenersFn;

  constructor(
    private elementRef: ElementRef,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer,
    private componentFactoryResolver: ComponentFactoryResolver,
    private ngZone: NgZone
  ) { }

  toggle() {
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
    this.windowRef.instance.id = this.ngbPopoverWindowId;

    this.renderer.setElementAttribute(this.elementRef.nativeElement, 'aria-describedby', this.ngbPopoverWindowId);

    if (this.container === 'body') {
      window.document.querySelector(this.container).appendChild(this.windowRef.location.nativeElement);
    }

    // we need to manually invoke change detection since events registered via
    // Renderer::listen() are not picked up by change detection with the OnPush strategy
    this.windowRef.changeDetectorRef.markForCheck();
    this.shown.emit();
  }

  close() {
    if (this.windowRef) {
      this.renderer.setElementAttribute(this.elementRef.nativeElement, 'aria-describedby', null);
      this.popupService.close();
      this.windowRef = null;
      this.hidden.emit();
    }
  }

  ngOnInit(): void {
    this.popupService = new PopupService<PopoverWindowComponent>(
      PopoverWindowComponent,
      this.injector,
      this.viewContainerRef,
      this.renderer,
      this.componentFactoryResolver
    );

    this.unregisterListenersFn = listenToTriggers(
      this.renderer,
      this.elementRef.nativeElement,
      this.triggers,
      this.open.bind(this),
      this.close.bind(this),
      this.toggle.bind(this)
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
