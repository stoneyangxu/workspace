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

  @Output() pageChange = new EventEmitter<number>();

  pageCount: number;
  pages: number[] = [];

  constructor() { }

  ngOnInit() {
    this.updatePages();
  }

  gotoPage(newPage) {

    newPage = Math.max(1, newPage);
    newPage = Math.min(this.pages.length, newPage);

    this.page = newPage;
    this.pageChange.emit(this.page);
  }

  private updatePages() {
    this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
    for (let i = 1; i <= this.pageCount; i++) {
      this.pages.push(i);
    }
  }

}
