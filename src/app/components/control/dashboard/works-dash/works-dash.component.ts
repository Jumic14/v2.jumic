import { Component, OnInit } from '@angular/core';
import { getDataService } from '../../../../services/database/getData.service';
import { postDataService } from '../../../../services/database/postData.service';
import { deleteDataService } from '../../../../services/database/deleteData.service';
import { updateDataService } from '../../../../services/database/updateData.service';
import { Work } from '../../../../models/work.models';

@Component({
  selector: 'app-works-dash',
  templateUrl: './works-dash.component.html',
  styleUrl: './works-dash.component.scss',
})
export class WorksDash implements OnInit {
  works!: any[];
  newWork: any = {};
  selectedWork: any;
  constructor(
    private getDataService: getDataService,
    private postDataService: postDataService,
    private deleteDataService: deleteDataService,
    private updateDataService: updateDataService
  ) {}

  ngOnInit(): void {
    this.getWorks();
  }

  getWorks(): void {
    this.getDataService.getWorks().subscribe((data) => {
      this.works = data;
    });
  }
  openSubmitForm(): void {
    const workList = document.querySelector('.work-list');
    const workInfo = document.querySelector('.work-info');
    const workPost = document.querySelector('.work-post');
    if (workPost) {
      workPost.classList.remove('hidden');
      workList?.classList.add('hidden');
      workInfo?.classList.add('hidden');
      this.selectedWork = null;
    }
  }
  closeSubmitForm(): void {
    const workList = document.querySelector('.work-list');
    const workInfo = document.querySelector('.work-info');
    const workPost = document.querySelector('.work-post');
    if (workPost) {
      workList?.classList.remove('hidden');
      workInfo?.classList.remove('hidden');
      workPost?.classList.add('hidden');
    }
  }
  submitWork(): void {
    this.postDataService.postWork(this.newWork).subscribe({
      next: (response) => {
        console.log('Nouveau travail ajouté avec succès :', response);
        this.newWork = {};
        this.getWorks();
        this.closeSubmitForm();
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du nouveau travail :", error);
      },
    });
  }
  selectWork(work: any): void {
    this.selectedWork = work;
  }
  deleteSelectedWork(work: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce work ?')) {
      this.deleteDataService.deleteWork(work).subscribe({
        next: (response: Work) => {
          console.log('Work supprimée avec succès:', response);
          this.getWorks();
          this.selectedWork = null;
        },
        error: (error: any) => {
          console.error('Erreur lors de la suppression du work :', error);
        },
      });
    }
  }
  openUpdateForm(): void {
    const workList = document.querySelector('.work-list');
    const workInfo = document.querySelector('.work-info');
    const workUpdate = document.querySelector('.work-update');
    if (this.selectedWork) {
      workList?.classList.add('hidden');
      workInfo?.classList.add('hidden');
      workUpdate?.classList.remove('hidden');
    }
  }
  closeUpdateForm(): void {
    const workList = document.querySelector('.work-list');
    const workInfo = document.querySelector('.work-info');
    const workUpdate = document.querySelector('.work-update');
    if (this.selectedWork) {
      workList?.classList.remove('hidden');
      workInfo?.classList.remove('hidden');
      workUpdate?.classList.add('hidden');
    }
  }
  updateWork(): void {
    if (confirm('Êtes-vous sûr de vouloir mettre à jour ce travail ?')) {
      this.updateDataService.updateWork(this.selectedWork).subscribe({
        next: (response) => {
          console.log('Travail mis à jour avec succès :', response);
          this.getWorks();
          this.closeUpdateForm();
          this.selectedWork = null;
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du travail :', error);
        },
      });
    }
  }
}
