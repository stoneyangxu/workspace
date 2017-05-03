import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {positionElements} from 'app/demo-components/utils/positioning';
import {IpInputComponent} from 'app/demo-components/ip-input/ip-input.component';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'demo-components-main',
  templateUrl: './demo-components-main.component.html',
  styleUrls: ['./demo-components-main.component.scss']
})
export class DemoComponentsMainComponent implements OnInit {

  @ViewChild('ipv4') ipv4Comp: IpInputComponent;
  @ViewChild('ipv6') ipv6Comp: IpInputComponent;

  ipv4: string;
  ipv6: string;

  switchButtonValue = true;

  switchButtonControl = new FormControl(true);

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      // this.switchButtonValue = false;
      this.switchButtonControl.disable();

      setTimeout(() => {
        this.switchButtonControl.enable();
      }, 5000)
    }, 5000);
    // const pos1 = positionElements(
    //   this.host.nativeElement,
    //   this.target.nativeElement,
    //   'top-right',
    //   true
    // );
  }

  refresh() {
    this.ipv4 = this.ipv4Comp.value;
    this.ipv6 = this.ipv6Comp.value;
  }

}
