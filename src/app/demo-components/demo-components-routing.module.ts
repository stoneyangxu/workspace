import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponentsMainComponent } from 'app/demo-components/demo-components-main/demo-components-main.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponentsMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoComponentsRoutingModule { }
