import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myUnless]'
})
export class MyUnlessDirective {

  constructor(
    private tempalteRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  @Input() set myUnless(unless: boolean) {
    if (unless) {
      this.viewContainerRef.clear();
    } else {
      const embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.tempalteRef);
      console.log(this.tempalteRef, this.viewContainerRef, embeddedViewRef);
    }
  }
}
