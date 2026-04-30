import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { HeaderComponent } from './components/header/header.component';
import { LetterDensityComponent } from './components/letter-density/letter-density.component';
import { TextAnalyzerService } from './services/text-analyzer.service';

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

  public analyzer = inject(TextAnalyzerService);

}
