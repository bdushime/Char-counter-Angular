import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  templateUrl: './stat-card.component.html'
})
export class StatCardComponent {
  @Input() label: string = '';
  @Input() value: number = 0;
  
  @Input() bgClass: string = ''; 
}
