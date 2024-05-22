import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  constructor(
    public languageService: LanguageService,
    public themeService: ThemeService
  ) {}
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  isDarkMode(): boolean {
    return this.themeService.isDark();
  }
}
