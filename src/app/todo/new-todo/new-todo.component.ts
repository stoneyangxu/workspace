import { Component, OnInit } from '@angular/core';
import {TodoItem} from '../model/todo-item';

@Component({
  selector: 'new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  newTodoItem(title: string) {

  }

}
