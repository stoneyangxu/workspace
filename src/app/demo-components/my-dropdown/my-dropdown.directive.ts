import { Directive, HostBinding, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[myDropdown]'
})
export class MyDropdownDirective {

  @Input() up = false;
  @Input() autoClose = true;

  @Output() statusChange = new EventEmitter<boolean>();

  @HostBinding('class.show') isOpen = false;

  toggleElement: ElementRef;

  @Input() set opened(isOpen) {
    this.isOpen = isOpen;
  }

  @HostBinding('class.dropup') get dropup() {
    return this.up;
  }

  @HostBinding('class.dropdown') get dropdown() {
    return !this.up;
  }

  open() {
    this.isOpen = true;
    this.statusChange.emit(true);
  }

  close() {
    this.isOpen = false;
    this.statusChange.emit(false);
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.statusChange.emit(this.isOpen);
  }

  @HostListener('keyup.esc') closeFromEsc($event) {
    if (this.autoClose) {
      this.close();
    }
  }

  @HostListener('document:click', ['$event.target']) closeFormOutside(target) {
    if (this.autoClose && !this.isEventFromToggle(target)) {
      this.close();
    }
  }

  private isEventFromToggle(target) {
    return !!this.toggleElement && this.toggleElement.nativeElement.contains(target);
  }
}
