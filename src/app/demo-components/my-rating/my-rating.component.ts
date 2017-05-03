import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core';

@Component({
  selector: 'my-rating',
  templateUrl: './my-rating.component.html',
  styleUrls: ['./my-rating.component.scss']
})
export class MyRatingComponent implements OnInit {

  @Input() max = 10;
  @Input() readonly = false;

  @Input() rate = 0;
  @Output() rateChange = new EventEmitter<number>();

  contexts: boolean[];

  constructor() { }

  ngOnInit() {
    this.contexts = Array.from({ length: this.max }, () => (false));
  }

  setRate(rate) {
    if (!this.readonly) {
      this.rate = rate;
      this.updateContext(rate);
      this.rateChange.emit(rate);
    }
  }

  enter(rate) {
    if (!this.readonly) {
      this.updateContext(rate);
    }
  }

  @HostListener('mouseleave') leave() {
    this.updateContext(this.rate);
  }

  showRated(index) {
    return this.contexts[index];
  }

  private updateContext(value) {
    this.contexts = this.contexts.map((x, index) => index < value);
  }
}
