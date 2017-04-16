import {
  Directive, Input, OnInit, ViewContainerRef,
  HostListener, Injector, ComponentFactoryResolver,
  Renderer, ComponentRef, ElementRef, NgZone,
  TemplateRef, EventEmitter, Output, OnDestroy
} from '@angular/core';
import { PopupService } from 'app/demo-components/utils/popup';
import { TooltipWindowComponent } from 'app/demo-components/my-tooltip/tooltip-window/tooltip-window.component';
import { positionElements } from 'app/demo-components/utils/positioning';
import { listenToTriggers } from 'app/demo-components/utils/triggers';

let nextId = 0;

@Directive({
  selector: '[myTooltip]',
  exportAs: 'myTooltip'
})
export class MyTooltipDirective implements OnInit, OnDestroy {


  @Input() myTooltip: string | TemplateRef<any>;
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() container: string;
  @Input() triggers = 'mouseover:mouseout';

  @Output() shown = new EventEmitter();
  @Output() hidden = new EventEmitter();

  private popupService: PopupService<TooltipWindowComponent>;
  private windowRef: ComponentRef<TooltipWindowComponent>;

  private ngbTooltipWindowId = `ngb-tooltip-${nextId++}`;
  private zoneSubscription: any;
  private unregisterListenersFn: any;

  constructor(
    private elementRef: ElementRef,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer,
    private componentFactoryResolver: ComponentFactoryResolver,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.popupService = new PopupService<TooltipWindowComponent>(
      TooltipWindowComponent,
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

    this.unregisterListenersFn = listenToTriggers(
      this.renderer,
      this.elementRef.nativeElement,
      this.triggers,
      this.open.bind(this),
      this.close.bind(this),
      this.toggle.bind(this)
    );
  }

  ngOnDestroy(): void {
    if (this.zoneSubscription) {
      this.close();
      this.unregisterListenersFn();
      this.zoneSubscription.unsubscribe();
    }
  }

  open(context?: any) {
    this.windowRef = this.popupService.open(this.myTooltip, context);
    this.windowRef.instance.placement = this.placement;
    this.windowRef.instance.id = this.ngbTooltipWindowId;

    this.renderer.setElementAttribute(this.elementRef.nativeElement, 'aria-describedby', this.ngbTooltipWindowId);

    if (this.container === 'body') {
      window.document.querySelector(this.container).appendChild(this.windowRef.location.nativeElement);
    }

    // we need to manually invoke change detection since events registered via
    // Renderer::listen() - to be determined if this is a bug in the Angular itself
    this.windowRef.changeDetectorRef.markForCheck();

    this.shown.emit();
  }

  close() {
    if (this.windowRef) {
      this.popupService.close();
      this.windowRef = null;

      this.renderer.setElementAttribute(this.elementRef.nativeElement, 'aria-describedby', null);

      this.hidden.emit();
    }
  }

  toggle() {
    if (this.windowRef) {
      this.close();
    } else {
      this.open();
    }
  }

  isOpen() {
    return this.windowRef != null;
  }
}
