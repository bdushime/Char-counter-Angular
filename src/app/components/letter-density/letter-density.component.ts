import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LetterStat {
  letter: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'app-letter-density',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './letter-density.component.html'
})
export class LetterDensityComponent implements OnChanges {
  // We receive the raw text from the parent Manager
  @Input() text: string = '';
  
  // This array will hold our calculated statistics
  letterStats: LetterStat[] = [];

  // LIFECYCLE HOOK: ngOnChanges
  // This automatically runs EVERY TIME any @Input() value changes from the parent!
  ngOnChanges(changes: SimpleChanges) {
    // If the 'text' input specifically changed, recalculate the density
    if (changes['text']) {
      this.calculateDensity(this.text);
    }
  }

  // Our custom calculation logic
  private calculateDensity(rawText: string) {
    if (!rawText || rawText.trim() === '') {
      this.letterStats = [];
      return;
    }

    // Only look at alphabetic characters, uppercase them
    const cleanText = rawText.replace(/[^a-zA-Z]/g, '').toUpperCase();
    const totalLetters = cleanText.length;

    if (totalLetters === 0) {
      this.letterStats = [];
      return;
    }

    // Count frequencies
    const counts: Record<string, number> = {};
    for (const char of cleanText) {
      counts[char] = (counts[char] || 0) + 1;
    }

    // Convert into our array format, sort by highest count, and just grab the top 5
    this.letterStats = Object.keys(counts).map(letter => {
      const count = counts[letter];
      return {
        letter: letter,
        count: count,
        percentage: Number(((count / totalLetters) * 100).toFixed(2))
      };
    }).sort((a, b) => b.count - a.count).slice(0, 5);
  }
}
