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

 
  allLetterStats: LetterStat[] = [];
  showAll: boolean = false;


  @Input() text: string = '';
  
  letterStats: LetterStat[] = [];


  ngOnChanges(changes: SimpleChanges) {
    if (changes['text']) {
      this.calculateDensity(this.text);
    }
  }

  private calculateDensity(rawText: string) {
    if (!rawText || rawText.trim() === '') {
      this.letterStats = [];
      return;
    }

    const cleanText = rawText.replace(/[^a-zA-Z]/g, '').toUpperCase();
    const totalLetters = cleanText.length;

    if (totalLetters === 0) {
      this.letterStats = [];
      return;
    }

  
    const counts: Record<string, number> = {};
    for (const char of cleanText) {
      counts[char] = (counts[char] || 0) + 1;
    }


        this.allLetterStats = Object.keys(counts).map(letter => {
      const count = counts[letter];
      return {
        letter: letter,
        count: count,
        percentage: Number(((count / totalLetters) * 100).toFixed(2))
      };
    }).sort((a, b) => b.count - a.count);
    
    this.updateDisplayedStats();
  }

    toggleShowAll() {
    this.showAll = !this.showAll;
    this.updateDisplayedStats();
  }

  updateDisplayedStats() {
    if (this.showAll) {
      this.letterStats = this.allLetterStats;
    } else {
      this.letterStats = this.allLetterStats.slice(0, 5);
    }
  }


}
