import { Directive, Renderer, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[myRadio]'
})
export class MyRadioDirective {

  private isActive: boolean;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer
  ) { }

  @HostListener('click') onclick() {
    this.isActive = !this.isActive;
    this.renderer.setElementClass(this.elementRef.nativeElement, 'active', this.isActive);
  }
}
