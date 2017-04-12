import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'my-alert',
  templateUrl: './my-alert.component.html',
  styleUrls: ['./my-alert.component.scss']
})
export class MyAlertComponent {

  @Input() type: string;
  @Input() dismissible: boolean;

  @Output() close = new EventEmitter();

  constructor() {
    this.dismissible = true;
  }

  onClose() {
    this.close.emit(null);
  }
}
