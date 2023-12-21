// src/app/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { Project } from '../model/project.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  projects: Project[] = [
    // Initialize with sample projects
    {  name: 'Project 1' , amount : 999 , description: 'test' , ownerUsername : 'admin'},
    {  name: 'Project 2' , amount : 555 , description: 'test1' , ownerUsername : 'trino'},

    // Add more projects as needed
  ];

  onItemSelected(selectedProject: Project): void {
    // Handle the selected project, update the right info component, etc.
  }
}
