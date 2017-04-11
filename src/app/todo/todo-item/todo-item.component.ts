import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../model/todo-item';
import { TodoStatus } from '../model/todo-status.enum';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: TodoItem;
  currentIcon: string;

  constructor() { }

  ngOnInit() {
    if (this.todoItem.status === TodoStatus.FINISHED) {
      this.currentIcon = 'fa fa-check-square-o';
    } else {
      this.currentIcon = 'fa fa-square-o';
    }
  }

}
