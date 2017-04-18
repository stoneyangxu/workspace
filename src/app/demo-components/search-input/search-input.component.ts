import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() placeholder = '';

  keywords: string;

  @HostBinding('class.input-group') inputGroupClass = true;

  constructor() { }

  ngOnInit() {
  }

  search() {
    console.log(this.keywords);
  }

}
