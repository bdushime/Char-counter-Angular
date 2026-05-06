import { Injectable } from '@angular/core';
import { LetterStat } from '../interfaces/letter-stat.model';
@Injectable({
  providedIn: 'root'
})
export class TextAnalyzerService {
  currentText = "";
  excludeSpaces = false;
  limitActive = false;
  characterLimit = 250;
  isDarkMode = false;

  totalCharacters = 0;
  wordCount = 0;
  sentenceCount = 0;
  readingTime = "< 1 minute";
  limitExceeded = false;
  letterStats: LetterStat[] = [];

  handleTextChange(newText: string) {
    this.currentText = newText;
    this.updateStats();
  }

  updateStats() {
    this.totalCharacters = this.excludeSpaces 
      ? this.currentText.replace(/\s/g, '').length 
      : this.currentText.length;

    const trimmed = this.currentText.trim();
    this.wordCount = trimmed ? trimmed.split(/\s+/).filter(w => w.length > 0).length : 0;
    this.sentenceCount = trimmed ? this.currentText.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    const minutes = this.wordCount / 200;
    if (minutes < 1) {
      this.readingTime = "< 1 minute";
    } else {
      const rounded = Math.ceil(minutes);
      this.readingTime = `${rounded} minute${rounded > 1 ? 's' : ''}`;
    }
    this.limitExceeded = this.limitActive && this.totalCharacters >= this.characterLimit;
    this.letterStats = this.calculateDensity(this.currentText);
  }

  calculateDensity(rawText: string): LetterStat[] {
    if (!rawText || rawText.trim() === '') return [];
    const cleanText = rawText.replace(/[^a-zA-Z]/g, '').toUpperCase();
    const totalLetters = cleanText.length;
    if (totalLetters === 0) return [];

    const counts: { [key: string]: number } = {};
    for (const char of cleanText) {
      counts[char] = (counts[char] || 0) + 1;
    }

    return Object.keys(counts).map(letter => {
      const count = counts[letter];
      return {
        letter,
        count,
        percentage: Number(((count / totalLetters) * 100).toFixed(2))
      };
    }).sort((a, b) => b.count - a.count);
  }

  toggleExcludeSpaces(checked: boolean) {
    this.excludeSpaces = checked;
    this.updateStats();
  }

  toggleLimit(checked: boolean) {
    this.limitActive = checked;
    this.updateStats();
  }

  updateLimit(limit: number) {
    this.characterLimit = limit;
    this.updateStats();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
}