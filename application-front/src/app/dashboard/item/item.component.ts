// src/app/item/item.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'src/app/model/project.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() project: Project;
  @Output() itemSelected: EventEmitter<void> = new EventEmitter<void>();

  selectItem(): void {
    this.itemSelected.emit();
  }
}
