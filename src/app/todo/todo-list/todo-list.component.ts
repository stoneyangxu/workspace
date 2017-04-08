import { Component, OnInit } from '@angular/core';
import { TodoItem } from 'app/todo/model/todo-item';
import * as moment from 'moment';
import { TodoStatus } from 'app/todo/model/todo-status.enum';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList: TodoItem[] = [
    {
      id: 1,
      title: 'todo1',
      createTime: moment().unix(),
      status: TodoStatus.NEW
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
