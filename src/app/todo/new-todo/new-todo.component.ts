import {Component, OnInit} from '@angular/core';
import {TodoService} from '../service/todo.service';
import * as moment from 'moment';
import {TodoStatus} from '../model/todo-status.enum';

@Component({
  selector: 'new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
  }

  newTodoItem(title: string) {
    this.todoService.addTodoItem({
      title: title,
      createTime: moment().unix(),
      status: TodoStatus.NEW
    });
  }

}
