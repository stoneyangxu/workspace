import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'my-pagination',
  templateUrl: './my-pagination.component.html',
  styleUrls: ['./my-pagination.component.scss']
})
export class MyPaginationComponent implements OnInit {

  @Input() collectionSize = 0;
  @Input() pageSize = 10;
  @Input() directionLinks = false;
  @Input() boundaryLinks = false;
  @Input() disabled = false;
  @Input() page = 1;
  @Input() size: 'sm' | '' | 'lg' = '';
  @Input() ellipses = false;
  @Input() maxSize = 5;

  @Output() pageChange = new EventEmitter<number>();

  pageCount: number;
  pages: number[] = [];

  constructor() { }

  ngOnInit() {
    this.updatePages();
  }

  gotoPage(newPage) {

    newPage = Math.max(1, newPage);
    newPage = Math.min(this.pageCount, newPage);

    this.page = newPage;
    this.updatePages();
    this.pageChange.emit(this.page);
  }

  private updatePages() {
    this.pages = [];
    this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
    for (let i = 1; i <= this.pageCount; i++) {
      this.pages.push(i);
    }

    if (this.maxSize > 0 && this.ellipses) {
      const [start, end] = this.getRange();
      console.error(start, end);
      console.error(this.pages);
      this.pages = this.pages.slice(start, end);
      console.error(this.pages);

      this.setEllipses(start, end);
    }
  }

  private setEllipses(start: number, end: number) {
    if (this.ellipses) {
      if (start > 0) {
        if (start > 1) {
          this.pages.unshift(-1);
        }
        this.pages.unshift(1);
      }
      if (end < this.pageCount) {
        if (end < this.pageCount - 1) {
          this.pages.push(-1);
        }
        this.pages.push(this.pageCount);
      }
    }
  }

  private getRange() {
    const page = Math.ceil(this.page / this.maxSize) - 1;
    const start = page * this.maxSize;
    const end = start + this.maxSize;

    return [start, end];
  }
}
