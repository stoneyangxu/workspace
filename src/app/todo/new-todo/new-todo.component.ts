import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../service/todo.service';
import * as moment from 'moment';
import { TodoStatus } from '../model/todo-status.enum';
import { Subject } from 'rxjs/Subject';
import { TodoItem } from 'app/todo/model/todo-item';

@Component({
  selector: 'new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {

  @Output() newTodoIsAdded = new EventEmitter<boolean>();

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
    }).then(result => {
      this.newTodoIsAdded.emit(result);
    });
  }

}
