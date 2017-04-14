import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[myHighlight]'
})
export class MyHighlightDirective implements OnInit {

  @Input() highlightColor = 'yellow';

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.changeBackgroundColor(this.highlightColor);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeBackgroundColor('green');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackgroundColor(this.highlightColor);
  }

  private changeBackgroundColor(color: string) {
    this.elementRef.nativeElement.style.backgroundColor = color;
  }
}
