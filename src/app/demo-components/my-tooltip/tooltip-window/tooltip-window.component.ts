import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'tooltip-window',
  templateUrl: './tooltip-window.component.html',
  styleUrls: ['./tooltip-window.component.scss']
})
export class TooltipWindowComponent implements OnInit {

  @Input() placement = 'top';
  @HostBinding('class') hostClass: string;
  @HostBinding('id') id: string;

  constructor() { }

  ngOnInit() {
    this.hostClass = `tooltip show tooltip-${this.placement}`;
  }
}
