import {Component, Input, OnInit} from '@angular/core';
import {TodoItem} from '../model/todo-item';
import {TodoStatus} from '../model/todo-status.enum';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: TodoItem;
  currentClass: string;

  constructor() { }

  ngOnInit() {
  }

}
