import { Directive, HostBinding, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[myDropdown]'
})
export class MyDropdownDirective {

  @Output() statusChange = new EventEmitter<boolean>();

  @HostBinding('class.show') isOpen = false;

  @Input() set open(isOpen) {
    this.isOpen = isOpen;
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.statusChange.emit(this.isOpen);
  }
}
