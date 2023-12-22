import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Todo, TodoList, TodoService } from '../todo.service';
import { TodosComponent } from '../todos/todos.component';

@Component({
  selector: 'app-middle-area',
  standalone: true,
  imports: [TodosComponent],
  templateUrl: './middle-area.component.html',
  styleUrl: './middle-area.component.css'
})
export class MiddleAreaComponent implements OnInit {
  todoLists: TodoList[] = [];
  selectedTodo: Todo | null = null;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.todoService.todoLists$.subscribe((lists) => {
      this.todoLists = lists;
    });
  }

  openNav() {
    //@ts-ignore
    new bootstrap.Offcanvas(this.el.nativeElement.querySelector("#info")).show();
    this.renderer.setStyle(this.el.nativeElement.querySelector("#main"), 'margin-right', '400px');
  }

  closeNav() {
    //@ts-ignore
    this.renderer.setStyle(this.el.nativeElement.querySelector("#main"), 'margin-right', '0');
    this.todoService.unselectAll();
  }

  handleSelectTodo(todo: Todo) {
    this.selectedTodo = todo;  
    this.openNav();
  }
}
