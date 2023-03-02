import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Todo } from '../../model/todo.model';

@Injectable()
export class ToDoPresenterService {

  private todo: Subject<Todo>;
  public todo$: Observable<Todo>;

  constructor(private _formBuilder: FormBuilder) {
    this.todo = new Subject();
    this.todo$ = new Observable();
    this.todo$ = this.todo.asObservable();
  }

  /**
     * form group and validation
     * @returns Formcontrols
     */
  public getFormGroup() {
    return this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]],
      isActive: [''],
    })
  }

  // getTodoData(data: any) {
  //   localStorage.getItem('todo')
  // }
  submit(e: any) {
    let status = { isActive: false }
    this.todo.next(Object.assign(e, status))
  }
}
