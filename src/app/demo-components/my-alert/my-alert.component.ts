import { Component, OnInit, Input, EventEmitter, Output, ViewContainerRef, AfterViewInit, Renderer, Renderer2 } from '@angular/core';

@Component({
  selector: 'my-alert',
  templateUrl: './my-alert.component.html',
  styleUrls: ['./my-alert.component.scss']
})
export class MyAlertComponent implements AfterViewInit {

  @Input() type: string;
  @Input() dismissible: boolean;

  @Output() close = new EventEmitter();

  constructor(private viewContainerRef: ViewContainerRef, private renderer: Renderer2) {
    this.dismissible = true;
  }

  ngAfterViewInit(): void {
  }

  onClose() {
    this.close.emit(null);
  }
}
