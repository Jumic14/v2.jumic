import { Component, OnInit } from '@angular/core';
import { getDataService } from '../../../../services/database/getData.service';
import { postDataService } from '../../../../services/database/postData.service';
import { deleteDataService } from '../../../../services/database/deleteData.service';
import { updateDataService } from '../../../../services/database/updateData.service';
import { Category } from '../../../../models/category.models';

@Component({
  selector: 'app-categories-dash',
  templateUrl: './categories-dash.component.html',
  styleUrl: './categories-dash.component.scss',
})
export class CategoriesDashComponent implements OnInit {
  categories!: any[];
  newCategory: any = {};
  selectedCategory: any;

  constructor(
    private getDataService: getDataService,
    private postDataService: postDataService,
    private deleteDataService: deleteDataService,
    private updateDataService: updateDataService
  ) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(): void {
    this.getDataService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  openSubmitForm(): void {
    const categoryList = document.querySelector('.category-list');
    const categoryInfo = document.querySelector('.category-info');
    const categoryPost = document.querySelector('.category-post');
    if (categoryPost) {
      categoryPost.classList.remove('hidden');
      categoryList?.classList.add('hidden');
      categoryInfo?.classList.add('hidden');
      this.selectedCategory = null;
    }
  }
  closeSubmitForm(): void {
    const categoryList = document.querySelector('.category-list');
    const categoryInfo = document.querySelector('.category-info');
    const categoryPost = document.querySelector('.category-post');
    if (categoryPost) {
      categoryList?.classList.remove('hidden');
      categoryInfo?.classList.remove('hidden');
      categoryPost?.classList.add('hidden');
    }
  }
  submitCategory(): void {
    this.postDataService.postCategory(this.newCategory).subscribe({
      next: (response) => {
        console.log('Nouvelle catégorie ajoutée avec succès :', response);
        this.newCategory = {};
        this.getCategories();
        this.closeSubmitForm();
      },
      error: (error) => {
        console.error(
          "Erreur lors de l'ajout de la nouvelle catégorie :",
          error
        );
      },
    });
  }
  selectCategory(category: any): void {
    this.selectedCategory = category;
  }
  deleteSelectedCategory(category: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.deleteDataService.deleteCategory(category).subscribe({
        next: (response: Category) => {
          console.log('Catégorie supprimée avec succès:', response);
          this.getCategories();
          this.selectedCategory = null;
        },
        error: (error: any) => {
          console.error(
            'Erreur lors de la suppression de la catégorie :',
            error
          );
        },
      });
    }
  }
  openUpdateForm(): void {
    const categoryList = document.querySelector('.category-list');
    const categoryInfo = document.querySelector('.category-info');
    const categoryUpdate = document.querySelector('.category-update');
    if (this.selectedCategory) {
      categoryList?.classList.add('hidden');
      categoryInfo?.classList.add('hidden');
      categoryUpdate?.classList.remove('hidden');
    }
  }
  closeUpdateForm(): void {
    const categoryList = document.querySelector('.category-list');
    const categoryInfo = document.querySelector('.category-info');
    const categoryUpdate = document.querySelector('.category-update');
    if (this.selectedCategory) {
      categoryList?.classList.remove('hidden');
      categoryInfo?.classList.remove('hidden');
      categoryUpdate?.classList.add('hidden');
    }
  }
  updateCategory(): void {
    if (confirm('Êtes-vous sûr de vouloir mettre à jour cette catégorie ?')) {
      this.updateDataService.updateCategory(this.selectedCategory).subscribe({
        next: (response) => {
          console.log('Catégorie mis à jour avec succès :', response);
          this.getCategories();
          this.closeUpdateForm();
          this.selectedCategory = null;
        },
        error: (error) => {
          console.error(
            'Erreur lors de la mise à jour de la catégorie :',
            error
          );
        },
      });
    }
  }
  cancelCategoryUpdate(): void {
    this.selectedCategory = null;
  }
}
