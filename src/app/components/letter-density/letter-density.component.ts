import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAnalyzerService} from '../../services/text-analyzer.service';
import { LetterStat } from '../../interfaces/letter-stat.model';

@Component({
  selector: 'app-letter-density',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './letter-density.component.html'
})
export class LetterDensityComponent implements OnChanges {
  public analyzer = inject(TextAnalyzerService);

  @Input() text: string = '';
  
  allLetterStats: LetterStat[] = [];
  letterStats: LetterStat[] = [];
  showAll: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['text']) {
      this.allLetterStats = this.analyzer.calculateDensity(this.text);
      this.updateDisplayedStats();
    }
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
    this.updateDisplayedStats();
  }

  private updateDisplayedStats() {
    this.letterStats = this.showAll 
      ? this.allLetterStats 
      : this.allLetterStats.slice(0, 5);
  }
}