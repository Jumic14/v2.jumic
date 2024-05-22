import {
  Component,
  OnDestroy,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { getDataService } from '../../../services/database/getData.service';
import { LanguageService } from '../../../services/language.service';
import { ThemeService } from '../../../services/theme.service';
import { zoomIn, crossfade, bounce } from '../../../animations';
import { Category } from '../../../models/category.models';
import { Image } from '../../../models/image.models';
import { Stack } from '../../../models/stack.models';
import { WorkStack } from '../../../models/workStack.models';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
  animations: [zoomIn, crossfade, bounce],
})
export class WorksComponent implements OnInit, OnDestroy {
  isDarkMode: boolean = true;
  autoScrollEnabled: boolean = false;
  @ViewChild('dialog') dialog!: ElementRef;
  currentWork = 0;
  subscription!: Subscription;
  @Input() works!: any[];
  categories!: Category[];
  stacks!: Stack[];
  worksStacks!: WorkStack[];
  images!: Image[];
  currentWorkImages: Image[] = [];
  currentImageIndex = 0;
  currentWorkIndex = 0;
  currentImage!: Image;
  intervalId!: any;
  constructor(
    public languageService: LanguageService,
    private getDataService: getDataService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDark();

    this.getDataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      },
    });
    this.getDataService.getWorksStacks().subscribe({
      next: (response) => {
        this.worksStacks = response;
        if (this.worksStacks && this.stacks) {
          this.updateAssociatedStacks();
        }
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des works_stacks :',
          error
        );
      },
    });
    this.getDataService.getStacks().subscribe({
      next: (response) => {
        this.stacks = response;
        if (this.stacks) {
          this.works.forEach((work) => {
            const associatedStacks = this.worksStacks.filter(
              (ws) => ws.work_id === work.work_id
            );
            work.associatedStacks = associatedStacks.map((ws) => {
              return this.stacks.find(
                (stack) => stack.stack_id === ws.stack_id
              );
            });
          });
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des stacks :', error);
      },
    });
    this.getDataService.getImages().subscribe({
      next: (response) => {
        this.images = response;
        this.updateCurrentWorkImages();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des images :', error);
      },
    });
    this.subscription = this.getDataService.getWorks().subscribe({
      next: (response) => {
        this.works = response.reverse();
        if (this.works) {
          this.currentWork = 0;
          this.updateCurrentWorkImages();
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des projets :', error);
      },
    });
    this.stopAutoScroll();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.stopAutoScroll();
  }
  updateAssociatedStacks() {
    this.works.forEach((work) => {
      const associatedStacks = this.worksStacks.filter(
        (ws) => ws.work_id === work.work_id
      );
      work.associatedStacks = associatedStacks.map((ws) => {
        return this.stacks.find((stack) => stack.stack_id === ws.stack_id);
      });
    });
  }
  onPreviousClick() {
    this.currentWork =
      (this.currentWork - 1 + this.works.length) % this.works.length;
    this.updateCurrentWorkImages();
  }
  onNextClick() {
    this.currentWork = (this.currentWork + 1) % this.works.length;
    this.updateCurrentWorkImages();
  }
  onDotClick(index: number) {
    this.currentImageIndex = index;
    this.currentImage = this.currentWorkImages[index];
  }
  onWorkClick(index: number) {
    this.currentWorkIndex = index;
    this.currentWork = index;
    this.updateCurrentWorkImages();
  }
  updateCurrentWorkImages() {
    const currentWorkId = this.works[this.currentWork].work_id;
    this.currentWorkImages = this.images.filter(
      (image) => image.work_id === currentWorkId
    );
    this.currentImageIndex = 0;
  }
  nextImage() {
    if (this.currentImageIndex === this.currentWorkImages.length - 1) {
      this.onNextClick();
    } else {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.currentWorkImages.length;
      this.currentImage = this.currentWorkImages[this.currentImageIndex];
    }
  }

  onImageClick(url: string) {
    window.open(url, '_blank');
  }

  startImageAutoScroll(): void {
    this.stopImageAutoScroll();
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 3000);
  }

  stopImageAutoScroll(): void {
    clearInterval(this.intervalId);
  }

  stopAutoScroll(): void {
    clearInterval(this.intervalId);
    const playIcon = document.querySelector('.icon-fa-play');
    const pauseIcon = document.querySelector('.icon-fa-pause');
    const scrollState = document.querySelector('.scroll-state');
    if (playIcon && pauseIcon) {
      playIcon.classList.add('icon');
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      pauseIcon.classList.remove('icon');
    }
    this.autoScrollEnabled = false;
    if (scrollState && this.autoScrollEnabled === false) {
      scrollState.classList.add('off');
      scrollState.classList.remove('on');
    }
  }
  startAutoScroll(): void {
    this.stopAutoScroll();
    const playIcon = document.querySelector('.icon-fa-play');
    const pauseIcon = document.querySelector('.icon-fa-pause');
    const scrollState = document.querySelector('.scroll-state');
    if (playIcon && pauseIcon) {
      playIcon.classList.add('hidden');
      playIcon.classList.remove('icon');
      pauseIcon.classList.add('icon');
      pauseIcon.classList.remove('hidden');
    }
    this.intervalId = setInterval(() => {
      this.onNextClick();
    }, 3000);
    this.stopImageAutoScroll();
    this.startImageAutoScroll();
    this.autoScrollEnabled = true;
    if (scrollState && this.autoScrollEnabled === true) {
      scrollState.classList.add('on');
      scrollState.classList.remove('off');
    }
  }
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.toggleDarkMode();
  }
}
