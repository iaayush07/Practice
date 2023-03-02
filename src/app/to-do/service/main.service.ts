import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, zipAll } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable()
export class MainService {

  public allToDo: any[];
  public maintodosSubject: BehaviorSubject<Todo[]>

  constructor() {
    // this.allToDo = [];
    // getTodoFromLocalStorage
    let data = localStorage.getItem('newTodo');
    data ? this.allToDo = JSON.parse(data) : this.allToDo = [];
    this.maintodosSubject = new BehaviorSubject(this.allToDo);
  }

  // getServiceData(): Observable<any> {
  //   let data = localStorage.getItem('newTodo');
  //   data ? this.allToDo = JSON.parse(data) : this.allToDo = []
  //   return of(this.allToDo);
  // }
}
