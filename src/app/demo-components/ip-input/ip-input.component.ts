import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';

const ipInputConfig = {
  ipv4: {
    BLOCK_COUNT: 4,
    SEP: '.',
    blocks(): string[] { return ['', '', '', '']; },
    RE_CHAR: /^[0-9]$/,
    RE_BLOCK: /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/,
  },
  ipv6: {
    BLOCK_COUNT: 8,
    SEP: ':',
    blocks(): string[] { return ['', '', '', '', '', '', '', '']; },
    RE_CHAR: /^[0-9A-Fa-f]$/,
    RE_BLOCK: /^[0-9A-Fa-f]{0,4}$/,
  }
};

@Component({
  selector: 'ip-input',
  templateUrl: './ip-input.component.html',
  styleUrls: ['./ip-input.component.scss']
})
export class IpInputComponent implements OnInit {


  @Input() mode: 'ipv4' | 'ipv6' = 'ipv4';

  @ViewChildren('input') inputs: QueryList<ElementRef>;

  vX: typeof ipInputConfig.ipv4 | typeof ipInputConfig.ipv6 = ipInputConfig.ipv4;
  blocks: string[] = [] = ipInputConfig.ipv4.blocks();

  constructor() { }

  ngOnInit() {
    this.vX = this.getConfig();
    this.blocks = this.vX.blocks();
  }

  get value(): string {

    if (!this.inputs) {
      return '';
    }

    return this.inputs.map(ref => {
      console.error(ref.nativeElement.value);
      return ref.nativeElement.value;
    }).join(this.vX.SEP);
  }

  onKeyPress($event, index) {

    const key = typeof $event.key === 'string' ? $event.key : String.fromCharCode($event.charCode);

    if (key === this.vX.SEP) {
      console.log('move to next');
      this.moveToNext(index);
    }

    if (!this.vX.RE_CHAR.test(key)) {
      this.cancelEvent($event);
    }

    const resultValue = $event.target.value + key;
    if (!this.vX.RE_BLOCK.test(resultValue)) {
      this.cancelEvent($event);
    }
  }

  private getConfig() {
    return ipInputConfig[this.mode];
  }

  private moveToNext(index) {
    if (index + 1 < this.inputs.length) {
      this.inputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  private cancelEvent($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
