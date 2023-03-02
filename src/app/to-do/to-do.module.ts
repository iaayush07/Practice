import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoComponent } from './to-do.component';
import { ToDoContainerComponent } from './to-do-container/to-do-container.component';
import { ToDoPresentationComponent } from './to-do-container/to-do-presentation/to-do-presentation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainService } from './service/main.service';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    ToDoComponent,
    ToDoContainerComponent,
    ToDoPresentationComponent
  ],
  imports: [
    CommonModule,
    ToDoRoutingModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [
    MainService
  ]
})
export class ToDoModule { }
