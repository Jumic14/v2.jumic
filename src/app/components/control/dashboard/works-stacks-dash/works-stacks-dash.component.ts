import { Component, OnInit } from '@angular/core';
import { getDataService } from '../../../../services/database/getData.service';
import { postDataService } from '../../../../services/database/postData.service';
import { deleteDataService } from '../../../../services/database/deleteData.service';
import { WorkStack } from '../../../../models/workStack.models';

@Component({
  selector: 'app-works-stacks-dash',
  templateUrl: './works-stacks-dash.component.html',
  styleUrl: './works-stacks-dash.component.scss',
})
export class WorksStacksDashComponent implements OnInit {
  worksStacks!: any[];
  newWorkStack: any = {};
  selectedWorkStack: any;

  constructor(
    private getDataService: getDataService,
    private postDataService: postDataService,
    private deleteDataService: deleteDataService
  ) {}
  ngOnInit(): void {
    this.getWorksStacks();
  }
  getWorksStacks(): void {
    this.getDataService.getWorksStacks().subscribe((data) => {
      this.worksStacks = data;
    });
  }
  openSubmitForm(): void {
    const workStackList = document.querySelector('.workstack-list');
    const workStackInfo = document.querySelector('.workstack-info');
    const workStackPost = document.querySelector('.workstack-post');
    if (workStackPost) {
      workStackPost.classList.remove('hidden');
      workStackList?.classList.add('hidden');
      workStackInfo?.classList.add('hidden');
      this.selectedWorkStack = null;
    }
  }
  closeSubmitForm(): void {
    const workList = document.querySelector('.workstack-list');
    const workInfo = document.querySelector('.workstack-info');
    const workPost = document.querySelector('.workstack-post');
    if (workPost) {
      workList?.classList.remove('hidden');
      workInfo?.classList.remove('hidden');
      workPost?.classList.add('hidden');
    }
  }
  submitWorkStack(): void {
    this.postDataService.postWorksStack(this.newWorkStack).subscribe({
      next: (response) => {
        console.log('Nouveau stack de travaux ajouté avec succès :', response);
        this.newWorkStack = {};
        this.getWorksStacks();
        this.closeSubmitForm();
      },
      error: (error) => {
        console.error(
          "Erreur lors de l'ajout du nouveau stack de travaux :",
          error
        );
      },
    });
  }
  selectWorkStack(workStack: any): void {
    this.selectedWorkStack = workStack;
  }
  deleteSelectedWorkStack(workStack: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce workStack ?')) {
      this.deleteDataService.deleteWorkStack(workStack).subscribe({
        next: (response: WorkStack) => {
          console.log('WorkStack supprimée avec succès:', response);
          this.getWorksStacks();
          this.selectedWorkStack = null;
        },
        error: (error: any) => {
          console.error('Erreur lors de la suppression du workStack :', error);
        },
      });
    }
  }
}
