import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { HeaderComponent } from './components/header/header.component';
import { LetterDensityComponent } from './components/letter-density/letter-density.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TextInputComponent, 
    StatCardComponent,
    HeaderComponent,
    LetterDensityComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  excludeSpaces: boolean = false;
  currentText: string = "";
  isDarkMode: boolean = false;
  limitActive: boolean = false;
  characterLimit: number = 250;
  limitExceeded: boolean = false;
  totalCharacters: number = 0;
  wordCount: number = 0;
  sentenceCount: number = 0;
  readingTimeMinutes: number = 0;

  handleTextChange(newText: string) {
    this.currentText = newText;
    
    // We update all stats dynamically
    this.updateCharacterCount();
    this.wordCount = this.calculateWords(this.currentText);
    this.sentenceCount = this.calculateSentences(this.currentText);
    this.readingTimeMinutes = this.calculateReadingTime(this.wordCount);
  }

  private calculateWords(text: string): number {
    if (!text.trim()) return 0;
    // Split by spaces, newlines, etc and filter out empty strings
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  private calculateSentences(text: string): number {
    if (!text.trim()) return 0;
    // Split by punctuation marks that end a sentence (. ! ?)
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    return sentences.length;
  }

  private calculateReadingTime(words: number): number {
    // Average reading speed is ~200 words per minute
    return Math.max(1, Math.ceil(words / 200));
  }

  toggleExcludeSpaces(event: any){
    this.excludeSpaces = event.target.checked;
    this.updateCharacterCount();
  }

  updateCharacterCount(){
    if(this.excludeSpaces){
      this.totalCharacters = this.currentText.replace(/\s/g,'').length;
    } else {
      this.totalCharacters = this.currentText.length;
    }
    this.checkLimit();
  }

  toggleLimit(event:any){
    this.limitActive = event.target.checked;
    this.checkLimit();
  }

  updateLimit(event:any){
    this.characterLimit = 
    Number(event.target.value);
    this.checkLimit();
  }

  checkLimit(){
    if(this.limitActive && this.totalCharacters >= this.characterLimit){
      this.limitExceeded = true;
    } else {
      this.limitExceeded = false;
    }
  }

  toggleTheme(){
    this.isDarkMode = !this.isDarkMode;

    if(this.isDarkMode){
      document.documentElement.setAttribute('data-theme','dark');
    } else{
      document.documentElement.removeAttribute('data-theme');
    }
  }
}
