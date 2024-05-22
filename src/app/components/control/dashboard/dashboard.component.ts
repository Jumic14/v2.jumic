import { Component } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isMenuCollapsed: boolean = true;
  isContactCollapsed: boolean = true;
  isWorksCollapsed: boolean = true;
  isCategoriesCollapsed: boolean = true;
  isStacksCollapsed: boolean = true;
  isImagesCollapsed: boolean = true;
  isWorksStacksCollapsed: boolean = true;
  isCurriculumsCollapsed: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleCollapse(target: string): void {
    this.isContactCollapsed =
      target !== 'contact' ? true : !this.isContactCollapsed;
    this.isWorksCollapsed = target !== 'works' ? true : !this.isWorksCollapsed;
    this.isCategoriesCollapsed =
      target !== 'categories' ? true : !this.isCategoriesCollapsed;
    this.isStacksCollapsed =
      target !== 'stacks' ? true : !this.isStacksCollapsed;
    this.isImagesCollapsed =
      target !== 'images' ? true : !this.isImagesCollapsed;
    this.isWorksStacksCollapsed =
      target !== 'works-stacks' ? true : !this.isWorksStacksCollapsed;
    this.isCurriculumsCollapsed =
      target !== 'curriculums' ? true : !this.isCurriculumsCollapsed;
  }
}
