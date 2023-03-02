import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-to-do-container',
  templateUrl: './to-do-container.component.html',
  // styleUrls: ['./to-do-container.component.scss']
})
export class ToDoContainerComponent implements OnInit {

  public newTodo: Observable<Todo[]>;
  public allTodos: any;

  constructor(private _mainService: MainService) {
    this.allTodos = [];
    this.newTodo = new Observable();
  }

  ngOnInit(): void {
    this.newTodo = this._mainService.maintodosSubject.asObservable();

  }

  /**
   * push newtodo
   * @param newanyTodo
   */
  addTodo(newanyTodo: any) {
    this.allTodos.push(newanyTodo);
    this.storeDataInLocalStorage();
    // console.log(this.allTodos);
  }


  /**
   * store datain local storage
   */
  public storeDataInLocalStorage() {
    localStorage.setItem('newTodo', JSON.stringify(this.allTodos));
    this.newTodo = this._mainService.maintodosSubject.asObservable();
    const b = JSON.parse(JSON.stringify(localStorage.getItem('newTodo')))
    // console.log(b);
    const c = JSON.parse('[' + b + ']');
    // console.log(c);
  }

}
