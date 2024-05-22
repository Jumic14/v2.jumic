import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isSticky: boolean = false;
  logoDark: string = './../../../assets/logo/primary-logo.png';
  logoLight: string = './../../../assets/logo/secondary-logo.png';

  constructor(
    public languageService: LanguageService,
    private themeService: ThemeService
  ) {}

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }
  isDarkMode(): boolean {
    return this.themeService.isDark();
  }
  changeLanguage(language: string) {
    this.languageService.selectedLanguage = language;
  }
  getLogoSrc() {
    return this.themeService.isDarkMode ? this.logoDark : this.logoLight;
  }
}
