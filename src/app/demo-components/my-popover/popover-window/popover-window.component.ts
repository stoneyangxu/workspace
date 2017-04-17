import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'popover-window',
  templateUrl: './popover-window.component.html',
  styleUrls: ['./popover-window.component.scss']
})
export class PopoverWindowComponent implements OnInit {

  @Input() title: string;
  @Input() placement = 'top';

  @HostBinding('class') hostClass: string;
  @HostBinding('id') id: string;

  ngOnInit() {
    this.hostClass = `popover show popover-${this.placement}`;
  }
}
