import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-text-input',
  imports: [NgIf],
  standalone: true,
  templateUrl: './text-input.component.html'
})
export class TextInputComponent {

  @Input() hasError: boolean = false;

  @Input() maxLimit: number | null = null;

  @Output() textChanged = new EventEmitter<string>();


  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;
    this.textChanged.emit(value);
  }
}
