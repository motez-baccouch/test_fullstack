// src/app/right-info/right-info.component.ts
import { Component, Input } from '@angular/core';
import { Project } from 'src/app/model/project.model';

@Component({
  selector: 'app-right-info',
  templateUrl: './right-info.component.html',
  styleUrls: ['./right-info.component.css'],
})
export class RightInfoComponent {
  @Input() selectedProject: Project;
}
