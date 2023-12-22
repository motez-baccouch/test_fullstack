import { Component } from '@angular/core';
import { LeftBarComponent } from '../left-bar/left-bar.component';
import { MiddleAreaComponent } from '../middle-area/middle-area.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LeftBarComponent, MiddleAreaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
