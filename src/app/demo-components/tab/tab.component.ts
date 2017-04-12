import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input() tabTitle: string;
  active = false;

  constructor() { }

  ngOnInit() {
  }

}
