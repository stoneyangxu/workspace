import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'display-time',
  templateUrl: './display-time.component.html',
  styleUrls: ['./display-time.component.scss']
})
export class DisplayTimeComponent implements OnInit {

  createTime: string;
  @Input() bgColor: string;

  ngOnInit() {
    this.createTime = moment().format();
  }
}
