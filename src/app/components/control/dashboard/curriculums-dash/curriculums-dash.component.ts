import { Component, OnInit } from '@angular/core';
import { getDataService } from '../../../../services/database/getData.service';
import { postDataService } from '../../../../services/database/postData.service';
import { deleteDataService } from '../../../../services/database/deleteData.service';
import { updateDataService } from '../../../../services/database/updateData.service';
import { Curriculum } from '../../../../models/curriculum.models';

@Component({
  selector: 'app-curriculums-dash',
  templateUrl: './curriculums-dash.component.html',
  styleUrl: './curriculums-dash.component.scss',
})
export class CurriculumsDashComponent implements OnInit {
  curriculums!: any[];
  newCurriculum: any = {};
  selectedCurriculum: any;

  constructor(
    private getDataService: getDataService,
    private postDataService: postDataService,
    private deleteDataService: deleteDataService,
    private updateDataService: updateDataService
  ) {}
  ngOnInit(): void {
    this.getCurriculums();
  }
  getCurriculums(): void {
    this.getDataService.getCurriculums().subscribe((data) => {
      this.curriculums = data;
    });
  }
  openSubmitForm(): void {
    const curriculumList = document.querySelector('.curriculum-list');
    const curriculumInfo = document.querySelector('.curriculum-info');
    const curriculumPost = document.querySelector('.curriculum-post');
    if (curriculumPost) {
      curriculumPost.classList.remove('hidden');
      curriculumList?.classList.add('hidden');
      curriculumInfo?.classList.add('hidden');
      this.selectedCurriculum = null;
    }
  }
  closeSubmitForm(): void {
    const curriculumList = document.querySelector('.curriculum-list');
    const curriculumInfo = document.querySelector('.curriculum-info');
    const curriculumPost = document.querySelector('.curriculum-post');
    if (curriculumPost) {
      curriculumList?.classList.remove('hidden');
      curriculumInfo?.classList.remove('hidden');
      curriculumPost?.classList.add('hidden');
    }
  }
  submitCurriculum(): void {
    this.postDataService.postCurriculum(this.newCurriculum).subscribe({
      next: (response) => {
        console.log('Nouveau curriculum ajouté avec succès :', response);
        this.newCurriculum = {};
        this.getCurriculums();
        this.closeSubmitForm();
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du nouveau curriculum :", error);
      },
    });
  }
  selectCurriculum(curriculum: any): void {
    this.selectedCurriculum = curriculum;
  }
  deleteSelectedCurriculum(curriculum: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce curriculum ?')) {
      this.deleteDataService.deleteCurriculum(curriculum).subscribe({
        next: (response: Curriculum) => {
          console.log('Curriculum supprimé avec succès:', response);
          this.getCurriculums();
          this.selectedCurriculum = null;
        },
        error: (error: any) => {
          console.error('Erreur lors de la suppression du curriculum :', error);
        },
      });
    }
  }
  openUpdateForm(): void {
    const curriculumList = document.querySelector('.curriculum-list');
    const curriculumInfo = document.querySelector('.curriculum-info');
    const curriculumUpdate = document.querySelector('.curriculum-update');
    if (this.selectedCurriculum) {
      curriculumList?.classList.add('hidden');
      curriculumInfo?.classList.add('hidden');
      curriculumUpdate?.classList.remove('hidden');
    }
  }
  closeUpdateForm(): void {
    const curriculumList = document.querySelector('.curriculum-list');
    const curriculumInfo = document.querySelector('.curriculum-info');
    const curriculumUpdate = document.querySelector('.curriculum-update');
    if (this.selectedCurriculum) {
      curriculumList?.classList.remove('hidden');
      curriculumInfo?.classList.remove('hidden');
      curriculumUpdate?.classList.add('hidden');
    }
  }
  updateCurriculum(): void {
    if (confirm('Êtes-vous sûr de vouloir mettre à jour ce curriculum ?')) {
      this.updateDataService
        .updateCurriculum(this.selectedCurriculum)
        .subscribe({
          next: (response) => {
            console.log('Curriculum mis à jour avec succès :', response);
            this.getCurriculums();
            this.closeUpdateForm();
            this.selectedCurriculum = null;
          },
          error: (error) => {
            console.error(
              'Erreur lors de la mise à jour du curriculum :',
              error
            );
          },
        });
    }
  }
  cancelCurriculumUpdate(): void {
    this.selectedCurriculum = null;
  }
}
