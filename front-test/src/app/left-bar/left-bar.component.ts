import { Component, OnInit } from '@angular/core';
import { TodoList, TodoService } from '../todo.service';

@Component({
  selector: 'app-left-bar',
  standalone: true,
  imports: [],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css'
})
export class LeftBarComponent implements OnInit{
  todoLists: TodoList[]= [];

  constructor(private todoService: TodoService){}

  ngOnInit() {
    this.todoService.todoLists$.subscribe((lists) => {
      this.todoLists = lists;
    });
  }

  handleSelectList(id: number) {
    this.todoService.selectTodoList(id);
  }
 
}
