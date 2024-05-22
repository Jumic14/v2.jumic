import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { LanguageService } from '../../../services/language.service';
import { animateFooter } from '../../../animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [animateFooter],
})
export class FooterComponent implements OnInit {
  isDarkMode: boolean = true;

  constructor(
    private themeService: ThemeService,
    public languageService: LanguageService
  ) {}
  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDark();
  }
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleDarkMode();
  }
}
