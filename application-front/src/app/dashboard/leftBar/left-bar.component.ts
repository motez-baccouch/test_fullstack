// src/app/left-bar/left-bar.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'src/app/model/project.model';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css'],
})
export class LeftBarComponent {
  @Input() projects: Project[];
  @Output() itemSelected: EventEmitter<Project> = new EventEmitter<Project>();
}
