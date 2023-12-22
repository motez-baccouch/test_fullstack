import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo, TodoList, TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  @Input()
  todos: TodoList | null = null;

  @Output() 
  selectTodoEvent = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) { }

  handleSelectTodo(todo: Todo) {
    this.todoService.selectTodoItem(this.todos!.id, todo.id);
    this.selectTodoEvent.emit(todo);
  }

  getImg(todo: Todo) {
    return this.todos?.selected
      ? (todo.selected ? 'assets/todoSelected.png' : 'assets/todoUnselected.png')
      : 'assets/todoDisabled.png';
  }
}
