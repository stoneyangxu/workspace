import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-progress-bar',
  templateUrl: './my-progress-bar.component.html',
  styleUrls: ['./my-progress-bar.component.scss']
})
export class MyProgressBarComponent {

  @Input() value = 0;
  @Input() max = 100;

  getProgressPercent() {
    return this.value / this.max * 100;
  }
}
