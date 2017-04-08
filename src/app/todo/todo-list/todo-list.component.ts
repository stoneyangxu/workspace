import { Component, OnInit } from '@angular/core';
import { TodoItem } from 'app/todo/model/todo-item';
import * as moment from 'moment';

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
      createTime: moment().unix()
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
