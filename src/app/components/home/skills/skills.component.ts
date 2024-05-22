import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { getDataService } from '../../../services/database/getData.service';
import { ThemeService } from '../../../services/theme.service';
import { Category } from '../../../models/category.models';
import { Stack } from '../../../models/stack.models';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  stacks: Stack[] = [];
  categories: Category[] = [];
  mongoDark: string = './../../assets/logo/mean/mongodb_dark.png';
  mongoLight: string = './../../assets/logo/mean/mongodb_light.png';
  expressDark: string = './../../assets/logo/mean/expressjs_dark.png';
  expressLight: string = './../../assets/logo/mean/expressjs_light.png';
  angularDark: string = './../../assets/logo/mean/angular_dark.png';
  angularLight: string = './../../assets/logo/mean/angular_light.png';
  nodeDark: string = './../../assets/logo/mean/nodejs_dark.png';
  nodeLight: string = './../../assets/logo/mean/nodejs_light.png';

  constructor(
    public languageService: LanguageService,
    private getDataService: getDataService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.getDataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      },
    });
    this.getDataService.getStacks().subscribe({
      next: (response) => {
        this.stacks = response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des stacks :', error);
      },
    });
  }
  getMongoLogo() {
    return this.themeService.isDarkMode ? this.mongoDark : this.mongoLight;
  }
  getExpressLogo() {
    return this.themeService.isDarkMode ? this.expressDark : this.expressLight;
  }
  getAngularLogo() {
    return this.themeService.isDarkMode ? this.angularDark : this.angularLight;
  }
  getNodeLogo() {
    return this.themeService.isDarkMode ? this.nodeDark : this.nodeLight;
  }
}
