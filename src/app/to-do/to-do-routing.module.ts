import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoContainerComponent } from './to-do-container/to-do-container.component';
import { ToDoComponent } from './to-do.component';

const routes: Routes = [
  {
    path: '',
    component: ToDoComponent,
    children: [{
      path: 'to-do',
      component: ToDoContainerComponent
    }, {
      path: '',
      pathMatch: 'full',
      redirectTo: 'to-do'
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDoRoutingModule { }
