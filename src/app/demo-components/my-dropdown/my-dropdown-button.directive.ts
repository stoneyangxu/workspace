import { Directive, HostListener } from '@angular/core';
import { MyDropdownDirective } from 'app/demo-components/my-dropdown/my-dropdown.directive';

@Directive({
  selector: '[myDropdownButton]'
})
export class MyDropdownButtonDirective {

  constructor(private myDropdown: MyDropdownDirective) { }

  @HostListener('click') click() {
    this.myDropdown.toggle();
  }
}
