import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Todo } from '../../model/todo.model';
import { ToDoRoutingModule } from '../../to-do-routing.module';
import { ToDoPresenterService } from '../to-do-presenter/to-do-presenter.service';

@Component({
  selector: 'app-to-do-presentation',
  templateUrl: './to-do-presentation.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ToDoPresenterService]
  // styleUrls: ['./to-do-presentation.component.scss']
})
export class ToDoPresentationComponent implements OnInit, OnChanges {

  // Getting value of todos
  @Input() public set todo(a: Todo[] | null) {
    this._todoPresentation = a;
  }
  public get todo(): Todo[] | null {
    return this._todoPresentation;
  }

  private _todoPresentation: Todo[] | null;
  public allTodoData: any;
  public activetodo: any;
  public remaining: any;
  public isDarkMode: boolean;
  public isClose: boolean;
  public todoFormGroup: FormGroup;
  @Output() public addTodo!: EventEmitter<Todo>;

  constructor(private todoPresenterService: ToDoPresenterService) {
    this.isDarkMode = false;
    this.isClose = false;
    this.todoFormGroup = this.todoPresenterService.getFormGroup();
    this.addTodo = new EventEmitter();

    this._todoPresentation = [];
    this.remaining = 0;
  }

  ngOnInit(): void {
    this.todoPresenterService.todo$.subscribe((data) => this.addTodo.emit(data));
    this.allTodoData = this.todo;
    localStorage.clear();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.clearCompleted();
  }
  /**
   * theming
   */
  changeMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  /**
   * submit value and add value in localstorage + list
   */
  onSubmit() {
    this.todoPresenterService.submit(this.todoFormGroup.value);
    this.allTodoData.push(this.todoFormGroup.value)
    // console.log(this.todoFormGroup.value);
    this.todoFormGroup.reset();
    this.remainingItem();
    // localStorage.setItem('name', 'ygfsf');
  }

  /**
   * drag and drop to reorder
   * @param CdkDragDrop<string[]>
   */
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allTodoData, event.previousIndex, event.currentIndex);
  }

  /**
   * delete
   * @param i
   */
  ondelete(i: any) {
    this.allTodoData.splice(i, 1);
    localStorage.clear();
    localStorage.setItem('newTodo', JSON.stringify(this.allTodoData));
    this.remainingItem();
  }

  /**
   * apppling ngClass on hover
   */
  onHover() {
    this.isClose = true;
  }

  /**
   * applying ngClass after completed toddo task
   * @param i
   */
  onCheck(i: any) {
    this.allTodoData[i].isActive = !this.allTodoData[i].isActive;
    this.remainingItem();
  }

  /**
   * all ,active and completed todo task show on click
   * @param id
   */
  showTodo(id: number) {
    if (id === 1) {
      this.allTodoData = this.todo;
    }
    if (id === 2) {
      this.allTodoData = this.todo?.filter((data: any) => data.isActive == false);
      this.remaining = this.allTodoData.length;
    }
    if (id === 3) {
      this.allTodoData = this.todo?.filter((data: any) => data.isActive == true);
    }
    this.remainingItem();
    // this.clearCompleted();
  }

  /**
   * remaining item show
  */
  remainingItem() {
    this.remaining = this.todo?.filter(res => res.isActive == false).length;
  }

  /**
   * clear localStorage and all todo task
  */
  clearCompleted() {
    this.activetodo = this.allTodoData?.filter((data: any) => data.isActive == false);
    // console.log(this.activetodo);
    this.allTodoData = this.activetodo;
  }
}
