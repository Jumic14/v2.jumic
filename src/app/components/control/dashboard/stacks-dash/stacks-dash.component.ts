import { Component, OnInit } from '@angular/core';
import { getDataService } from '../../../../services/database/getData.service';
import { postDataService } from '../../../../services/database/postData.service';
import { deleteDataService } from '../../../../services/database/deleteData.service';
import { updateDataService } from '../../../../services/database/updateData.service';
import { Stack } from '../../../../models/stack.models';

@Component({
  selector: 'app-stacks-dash',
  templateUrl: './stacks-dash.component.html',
  styleUrl: './stacks-dash.component.scss',
})
export class StacksDashComponent implements OnInit {
  stacks!: any[];
  newStack: any = {};
  selectedStack: any;
  isDashboardCollapsed: boolean = true;
  constructor(
    private getDataService: getDataService,
    private postDataService: postDataService,
    private deleteDataService: deleteDataService,
    private updateDataService: updateDataService
  ) {}
  ngOnInit(): void {
    this.getStacks();
  }
  getStacks(): void {
    this.getDataService.getStacks().subscribe((data) => {
      this.stacks = data;
    });
  }
  openSubmitForm(): void {
    const stackList = document.querySelector('.stack-list');
    const stackInfo = document.querySelector('.stack-info');
    const stackPost = document.querySelector('.stack-post');
    if (stackPost) {
      stackPost.classList.remove('hidden');
      stackList?.classList.add('hidden');
      stackInfo?.classList.add('hidden');
      this.selectedStack = null;
    }
  }
  closeSubmitForm(): void {
    const stackList = document.querySelector('.stack-list');
    const stackInfo = document.querySelector('.stack-info');
    const stackPost = document.querySelector('.stack-post');
    if (stackPost) {
      stackList?.classList.remove('hidden');
      stackInfo?.classList.remove('hidden');
      stackPost?.classList.add('hidden');
    }
  }
  submitStack(): void {
    this.postDataService.postStack(this.newStack).subscribe({
      next: (response) => {
        console.log('Nouveau stack ajouté avec succès :', response);
        this.newStack = {};
        this.getStacks();
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du nouveau stack :", error);
      },
    });
  }
  selectStack(stack: any): void {
    this.selectedStack = stack;
  }
  deleteSelectedStack(stack: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce stack ?')) {
      this.deleteDataService.deleteStack(stack).subscribe({
        next: (response: Stack) => {
          console.log('Stack supprimé avec succès:', response);
          this.getStacks();
          this.selectedStack = null;
        },
        error: (error: any) => {
          console.error('Erreur lors de la suppression du stack :', error);
        },
      });
    }
  }
  openUpdateForm(): void {
    const stackList = document.querySelector('.stack-list');
    const stackInfo = document.querySelector('.stack-info');
    const stackUpdate = document.querySelector('.stack-update');
    if (this.selectedStack) {
      stackList?.classList.add('hidden');
      stackInfo?.classList.add('hidden');
      stackUpdate?.classList.remove('hidden');
    }
  }
  closeUpdateForm(): void {
    const stackList = document.querySelector('.stack-list');
    const stackInfo = document.querySelector('.stack-info');
    const stackUpdate = document.querySelector('.stack-update');
    if (this.selectedStack) {
      stackList?.classList.remove('hidden');
      stackInfo?.classList.remove('hidden');
      stackUpdate?.classList.add('hidden');
    }
  }
  updateStack(): void {
    if (confirm('Êtes-vous sûr de vouloir mettre à jour ce stack ?')) {
      this.updateDataService.updateStack(this.selectedStack).subscribe({
        next: (response) => {
          console.log('Stack mis à jour avec succès :', response);
          this.getStacks();
          this.closeUpdateForm();
          this.selectedStack = null;
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du stack :', error);
        },
      });
    }
  }
  cancelStackUpdate(): void {
    this.selectedStack = null;
  }
}
