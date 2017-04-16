import {
  Directive, Input, OnInit, ViewContainerRef,
  HostListener, Injector, ComponentFactoryResolver,
  Renderer, ComponentRef, ElementRef, NgZone,
  TemplateRef, EventEmitter, Output, OnDestroy
} from '@angular/core';
import { PopupService } from 'app/demo-components/utils/popup';
import { TooltipWindowComponent } from 'app/demo-components/my-tooltip/tooltip-window/tooltip-window.component';
import { positionElements } from 'app/demo-components/utils/positioning';

let nextId = 0;

@Directive({
  selector: '[myTooltip]',
  exportAs: 'myTooltip'
})
export class MyTooltipDirective implements OnInit, OnDestroy {


  @Input() myTooltip: string | TemplateRef<any>;
  @Input() placement = 'top';
  @Input() container: string;

  @Output() shown = new EventEmitter();
  @Output() hidden = new EventEmitter();

  private popupService: PopupService<TooltipWindowComponent>;
  private windowRef: ComponentRef<TooltipWindowComponent>;

  private ngbTooltipWindowId = `ngb-tooltip-${nextId++}`;
  private zoneSubscription: any;

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
  }

  ngOnDestroy(): void {
    if (this.zoneSubscription) {
      this.close();
      this.zoneSubscription.unsubscribe();
    }
  }

  @HostListener('mouseover') open(context?: any) {
    this.windowRef = this.popupService.open(this.myTooltip, context);
    this.windowRef.instance.placement = this.placement;
    this.windowRef.instance.id = this.ngbTooltipWindowId;

    this.renderer.setElementAttribute(this.elementRef.nativeElement, 'aria-describedby', this.ngbTooltipWindowId);


    if (this.container === 'body') {
      window.document.querySelector(this.container).appendChild(this.windowRef.location.nativeElement);
    }

    this.shown.emit();
  }

  @HostListener('mouseout') close() {
    if (this.windowRef) {
      this.popupService.close();
      this.windowRef = null;

      this.renderer.setElementAttribute(this.elementRef.nativeElement, 'aria-describedby', null);

      this.hidden.emit();
    }
  }

  isOpen() {
    return this.windowRef != null;
  }
}
