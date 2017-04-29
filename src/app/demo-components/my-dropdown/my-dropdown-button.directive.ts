import { Directive, HostListener, ElementRef } from '@angular/core';
import { MyDropdownDirective } from 'app/demo-components/my-dropdown/my-dropdown.directive';

@Directive({
  selector: '[myDropdownButton]'
})
export class MyDropdownButtonDirective {

  constructor(
    private myDropdown: MyDropdownDirective,
    private elementRef: ElementRef
  ) {
    this.myDropdown.toggleElement = this.elementRef;
  }

  @HostListener('click') click() {
    this.myDropdown.toggle();
  }
}
