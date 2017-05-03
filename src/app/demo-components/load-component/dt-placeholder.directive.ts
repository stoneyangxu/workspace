import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dtPlaceholder]'
})
export class DtPlaceholderDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
