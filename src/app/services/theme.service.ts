import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'selectedTheme';

  isDarkMode: boolean;

  constructor() {
    const storedTheme = localStorage.getItem(this.themeKey);
    this.isDarkMode =
      storedTheme === 'dark' ||
      (!storedTheme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    localStorage.setItem(this.themeKey, this.isDarkMode ? 'dark' : 'light');
  }

  isDark(): boolean {
    return this.isDarkMode;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem(this.themeKey, this.isDarkMode ? 'dark' : 'light');
  }
}
