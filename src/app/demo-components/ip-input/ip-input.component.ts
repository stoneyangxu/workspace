import { Component, OnInit, Input } from '@angular/core';

const ipInputConfig = {
  ipv4: {
    BLOCK_COUNT: 4,
    SEP: '.',
    blocks(): string[] { return ['', '', '', '']; },
  },
  ipv6: {
    BLOCK_COUNT: 8,
    SEP: ':',
    blocks(): string[] { return ['', '', '', '', '', '', '', '']; },
  }
};

@Component({
  selector: 'ip-input',
  templateUrl: './ip-input.component.html',
  styleUrls: ['./ip-input.component.scss']
})
export class IpInputComponent implements OnInit {

  @Input() mode: 'ipv4' | 'ipv6' = 'ipv4';

  vX: typeof ipInputConfig.ipv4 | typeof ipInputConfig.ipv6 = ipInputConfig.ipv4;
  blocks: string[] = [] = ipInputConfig.ipv4.blocks();

  constructor() { }

  ngOnInit() {
    this.vX = this.getConfig();
    this.blocks = this.vX.blocks();
  }

  private getConfig() {
    return ipInputConfig[this.mode];
  }
}
