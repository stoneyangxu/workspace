import { Component, OnInit, HostBinding, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

  @Input() placeholder = '';
  @Output() search = new EventEmitter<string>();

  keywords: string;

  @HostBinding('class.input-group') inputGroupClass = true;

  doSearch() {
    if (this.keywords && this.keywords.trim().length > 0) {
      this.search.emit(this.keywords.trim());
    }
  }
}
