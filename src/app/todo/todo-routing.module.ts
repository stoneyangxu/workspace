import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from 'app/todo/todo-list/todo-list.component';
import { TodoMainComponent } from 'app/todo/todo-main/todo-main.component';

const routes: Routes = [
  {
    path: '',
    component: TodoMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
