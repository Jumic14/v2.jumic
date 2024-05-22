import { Component } from '@angular/core';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme.service';
import { animateHeader } from './animations';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [animateHeader],
})
export class AppComponent {
  title = 'v2.jumic';
  isLoginPage: boolean = false;
  isDashboardPage: boolean = false;

  constructor(
    public languageService: LanguageService,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login';
        this.isDashboardPage = this.router.url === '/dashboard';
      }
    });
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.themeService.isDark();
  }
}
