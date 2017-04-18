import { Directive, Input, ElementRef, OnChanges, HostBinding, OnInit, Host } from '@angular/core';

@Directive({
  selector: '[myCollaspe]'
})
export class MyCollaspeDirective {

  @Input() myCollaspe = false;

  @HostBinding('class.show') get showClass() { return !this.myCollaspe; }
  @HostBinding('class.collapse') collapseClass = true;
  @HostBinding('attr.aria-expanded') get attrExpanded() { return !this.myCollaspe; }
}
