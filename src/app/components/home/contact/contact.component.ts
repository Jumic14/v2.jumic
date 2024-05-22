import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { postDataService } from '../../../services/database/postData.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  nom: string = '';
  email: string = '';
  sujet: string = '';
  message: string = '';
  showSuccessMessage: boolean = false;

  constructor(
    public languageService: LanguageService,
    private postDataService: postDataService
  ) {}

  submitForm() {
    const formData = {
      nom: this.nom,
      email: this.email,
      sujet: this.sujet,
      message: this.message,
    };
    this.postDataService.postContactForm(formData).subscribe({
      next: (response) => {
        this.showSuccessMessage = true;
        this.nom = '';
        this.email = '';
        this.sujet = '';
        this.message = '';
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      },
      error: (error) => {
        console.error('Erreur lors de la soumission du formulaire:', error);
      },
    });
  }
}
