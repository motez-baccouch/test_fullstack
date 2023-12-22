// todo.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  selected: boolean;
}

export type TodoList = {
  id: number;
  title: string;
  icon: string;
  todos: Todo[];
  selected: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoLists = new BehaviorSubject<TodoList[]>([]);
  todoLists$ = this.todoLists.asObservable();

  constructor() {
    const initialTodoList: TodoList[] = [
      {
        id: 1,
        title: 'First Todo List',
        icon: "bi bi-highlights",
        selected: true,
        todos: [
          { id: 1, title: 'Static Todo 1-1', selected: false, completed: false },
          { id: 2, title: 'Static Todo 1-2', selected: false, completed: true },
          { id: 3, title: 'Static Todo 1-3', selected: false, completed: true },
        ],
      },
      {
        id: 2,
        title: 'Second Todo List',
        icon: "bi bi-highlights",
        selected: false,
        todos: [
          { id: 1, title: 'Static Todo 2-1', selected: false, completed: false },
        ]
      },
      {
        id: 3,
        title: 'Third Todo List',
        icon: "bi bi-highlights",
        selected: false,
        todos: [
          { id: 1, title: 'Static Todo 3-1', selected: false, completed: false },
          { id: 2, title: 'Static Todo 3-2', selected: false, completed: true },
        ]
      }
    ];

    this.todoLists.next(initialTodoList);
  }

  getTodoLists() {
    return this.todoLists.getValue();
  }

  selectTodoList(id: number): void {
    const list = this.todoLists.getValue();

    this.todoLists.next(list.map((item) => {
      item.selected = false;
      if (item.id == id) {
        item.selected = true;
      }
      return item;
    }));
  }

  selectTodoItem(todoListId: number, id: number): void {
    const list = this.todoLists.getValue();

    this.todoLists.next(list.map(todoList => {
      if (todoList.id == todoListId) {
        todoList.todos = todoList.todos.map((todo) => {
          todo.selected = false;
          if (todo.id == id) {
            todo.selected = true;
          }
          return todo;
        });
      }
      return todoList;
    }));
  }

  unselectAll(): void {
    const list = this.todoLists.getValue();

    this.todoLists.next(list.map(todoList => {
      todoList.todos = todoList.todos.map((todo) => {
        todo.selected = false;
        return todo;
      });

      return todoList;
    }));
  }
}
