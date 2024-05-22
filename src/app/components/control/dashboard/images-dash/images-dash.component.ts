import { Component, OnInit } from '@angular/core';
import { getDataService } from '../../../../services/database/getData.service';
import { postDataService } from '../../../../services/database/postData.service';
import { deleteDataService } from '../../../../services/database/deleteData.service';
import { updateDataService } from '../../../../services/database/updateData.service';
import { Image } from '../../../../models/image.models';

@Component({
  selector: 'app-images-dash',
  templateUrl: './images-dash.component.html',
  styleUrl: './images-dash.component.scss',
})
export class ImagesDashComponent implements OnInit {
  images!: any[];
  newImage: any = {};
  selectedImage: any;

  constructor(
    private getDataService: getDataService,
    private postDataService: postDataService,
    private deleteDataService: deleteDataService,
    private updateDataService: updateDataService
  ) {}
  ngOnInit(): void {
    this.getImages();
  }
  getImages(): void {
    this.getDataService.getImages().subscribe((data) => {
      this.images = data;
    });
  }
  openSubmitForm(): void {
    const imageList = document.querySelector('.image-list');
    const imageInfo = document.querySelector('.image-info');
    const imagePost = document.querySelector('.image-post');
    if (imagePost) {
      imagePost.classList.remove('hidden');
      imageList?.classList.add('hidden');
      imageInfo?.classList.add('hidden');
      this.selectedImage = null;
    }
  }
  closeSubmitForm(): void {
    const imageList = document.querySelector('.image-list');
    const imageInfo = document.querySelector('.image-info');
    const imagePost = document.querySelector('.image-post');
    if (imagePost) {
      imageList?.classList.remove('hidden');
      imageInfo?.classList.remove('hidden');
      imagePost?.classList.add('hidden');
    }
  }
  submitImage(): void {
    this.postDataService.postImage(this.newImage).subscribe({
      next: (response) => {
        console.log('Nouvelle image ajoutée avec succès :', response);
        this.newImage = {};
        this.getImages();
        this.closeSubmitForm();
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout de la nouvelle image :", error);
      },
    });
  }
  selectImage(image: any): void {
    this.selectedImage = image;
  }
  deleteSelectedImage(image: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      this.deleteDataService.deleteImage(image).subscribe({
        next: (response: Image) => {
          console.log('Catégorie supprimée avec succès:', response);
          this.getImages();
          this.selectedImage = null;
        },
        error: (error: any) => {
          console.error('Erreur lors de la suppression de la image :', error);
        },
      });
    }
  }
  openUpdateForm(): void {
    const imageList = document.querySelector('.image-list');
    const imageInfo = document.querySelector('.image-info');
    const imageUpdate = document.querySelector('.image-update');
    if (this.selectedImage) {
      imageList?.classList.add('hidden');
      imageInfo?.classList.add('hidden');
      imageUpdate?.classList.remove('hidden');
    }
  }
  closeUpdateForm(): void {
    const imageList = document.querySelector('.image-list');
    const imageInfo = document.querySelector('.image-info');
    const imageUpdate = document.querySelector('.image-update');
    if (this.selectedImage) {
      imageList?.classList.remove('hidden');
      imageInfo?.classList.remove('hidden');
      imageUpdate?.classList.add('hidden');
    }
  }
  updateImage(): void {
    if (confirm('Êtes-vous sûr de vouloir mettre à jour cette image ?')) {
      this.updateDataService.updateImage(this.selectedImage).subscribe({
        next: (response) => {
          console.log('Image mise à jour avec succès :', response);
          this.getImages();
          this.closeUpdateForm();
          this.selectedImage = null;
        },
        error: (error) => {
          console.error("Erreur lors de la mise à jour de l'image:", error);
        },
      });
    }
  }
  cancelImageUpdate(): void {
    this.selectedImage = null;
  }
}
