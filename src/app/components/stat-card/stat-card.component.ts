import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  templateUrl: './stat-card.component.html'
})
export class StatCardComponent {
  // @Input allows the parent to pass data IN to this child component
  @Input() label: string = '';
  @Input() value: number = 0;
  
  // This helps us apply the specific background graphic from our CSS
  @Input() bgClass: string = ''; 
}
