import { Component, OnInit } from '@angular/core';
import { getDataService } from '../../../../services/database/getData.service';
import { deleteDataService } from '../../../../services/database/deleteData.service';
import { Contact } from '../../../../models/contact.models';

@Component({
  selector: 'app-contact-dash',
  templateUrl: './contact-dash.component.html',
  styleUrl: './contact-dash.component.scss',
})
export class ContactDashComponent implements OnInit {
  contactMessages!: any[];
  selectedMessage: any;

  constructor(
    private getDataService: getDataService,
    private deleteDataService: deleteDataService
  ) {}
  ngOnInit(): void {
    this.getContactMessages();
  }
  getContactMessages(): void {
    this.getDataService.getContactMessages().subscribe((data) => {
      this.contactMessages = data;
    });
  }
  selectMessage(message: any): void {
    this.selectedMessage = message;
  }
  deleteSelectedMessage(message: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      this.deleteDataService.deleteContact(message).subscribe({
        next: (response: Contact) => {
          console.log('Message supprimé avec succès:', response);
          this.getContactMessages();
          this.selectedMessage = null;
        },
        error: (error: any) => {
          console.error('Erreur lors de la suppression du message :', error);
        },
      });
    }
  }
}
