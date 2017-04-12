import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-alert',
  templateUrl: './my-alert.component.html',
  styleUrls: ['./my-alert.component.scss']
})
export class MyAlertComponent implements OnInit {

  @Input() type: string;
  @Input() dismissible = true;

  constructor() { }

  ngOnInit() {
  }

}
