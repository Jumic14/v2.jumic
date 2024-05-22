import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { getDataService } from '../../../services/database/getData.service';
import { ThemeService } from '../../../services/theme.service';
import { Curriculum } from '../../../models/curriculum.models';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  curriculums: Curriculum[] = [];
  logoDark: string = './../../../assets/logo/primary-logo.png';
  logoLight: string = './../../../assets/logo/secondary-logo.png';

  constructor(
    public languageService: LanguageService,
    private getDataService: getDataService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.getDataService.getCurriculums().subscribe({
      next: (response) => {
        this.curriculums = response;
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des curriculums :',
          error
        );
      },
    });
  }
  getCurriculumImageUrl(curriculumName: string): string {
    const curriculum = this.curriculums.find(
      (curriculum) => curriculum.curriculum_name === curriculumName
    );
    if (curriculum) {
      return curriculum.curriculum_url;
    }
    return '';
  }
  openCurriculumInNewTab(): void {
    const curriculumName =
      this.languageService.selectedLanguage === 'fr'
        ? 'curriculum'
        : 'curriculum_en';
    const curriculumUrl = this.getCurriculumImageUrl(curriculumName);
    if (curriculumUrl) {
      window.open(curriculumUrl, '_blank');
    }
  }
  getLogoSrc() {
    return this.themeService.isDarkMode ? this.logoDark : this.logoLight;
  }
  goToContact() {
    const contact = document.getElementById('contact-section');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
