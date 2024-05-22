import { Component, OnInit } from '@angular/core';
import { animateHome } from '../../animations';
import { LanguageService } from '../../services/language.service';
import { getDataService } from '../../services/database/getData.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [animateHome],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = true;

  constructor(
    private getDataService: getDataService,
    public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  private loadAllData(): void {
    const observables = [
      this.getDataService.getCategories(),
      this.getDataService.getWorks(),
      this.getDataService.getStacks(),
      this.getDataService.getImages(),
      this.getDataService.getWorksStacks(),
    ];

    forkJoin(observables).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des données :', error);
        this.isLoading = false;
        window.location.href = 'https://v2-jumic-static.vercel.app/';
      },
    });
  }
}
