import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'todo',
    loadChildren: 'app/todo/todo.module#TodoModule'
  },
  {
    path: 'demo-components',
    loadChildren: 'app/demo-components/demo-components.module#DemoComponentsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
