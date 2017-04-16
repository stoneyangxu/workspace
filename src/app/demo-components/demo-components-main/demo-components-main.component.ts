import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { positionElements } from 'app/demo-components/utils/positioning';

@Component({
  selector: 'demo-components-main',
  templateUrl: './demo-components-main.component.html',
  styleUrls: ['./demo-components-main.component.scss']
})
export class DemoComponentsMainComponent implements OnInit {

  // @ViewChild('hostButton') host: ElementRef;
  // @ViewChild('toptipWin') target: ElementRef;

  constructor() { }

  ngOnInit() {
    // const pos1 = positionElements(
    //   this.host.nativeElement,
    //   this.target.nativeElement,
    //   'top-right',
    //   true
    // );
  }

}
