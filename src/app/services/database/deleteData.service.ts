import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../../models/category.models';
import { Contact } from '../../models/contact.models';
import { Curriculum } from '../../models/curriculum.models';
import { Image } from '../../models/image.models';
import { Stack } from '../../models/stack.models';
import { Work } from '../../models/work.models';
import { WorkStack } from '../../models/workStack.models';

@Injectable({
  providedIn: 'root',
})
export class deleteDataService {
  private apiUrl = 'https://v2-jumic-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  deleteWork(work: any): Observable<Work> {
    return this.http
      .delete<Work>(`${this.apiUrl}/works/${work._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la requête API pour supprimer le travail :',
            error
          );
          return throwError(() => 'Erreur serveur. Veuillez réessayer.');
        })
      );
  }
  deleteCategory(category: any): Observable<Category> {
    return this.http
      .delete<Category>(`${this.apiUrl}/categories/${category._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la requête API pour supprimer la catégorie :',
            error
          );
          return throwError(() => 'Erreur serveur. Veuillez réessayer.');
        })
      );
  }
  deleteStack(stack: any): Observable<Stack> {
    return this.http
      .delete<Stack>(`${this.apiUrl}/stacks/${stack._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la requête API pour supprimer le stack :',
            error
          );
          return throwError(() => 'Erreur serveur. Veuillez réessayer.');
        })
      );
  }
  deleteImage(image: any): Observable<Image> {
    return this.http
      .delete<Image>(`${this.apiUrl}/images/${image._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((error) => {
          console.error(
            "Erreur lors de la requête API pour supprimer l'image :",
            error
          );
          return throwError(() => 'Erreur serveur. Veuillez réessayer.');
        })
      );
  }
  deleteWorkStack(worksStack: any): Observable<WorkStack> {
    return this.http
      .delete<WorkStack>(`${this.apiUrl}/worksStacks/${worksStack._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la requête API pour supprimer le work_stack :',
            error
          );
          return throwError(() => 'Erreur serveur. Veuillez réessayer.');
        })
      );
  }
  deleteCurriculum(curriculum: any): Observable<Curriculum> {
    return this.http
      .delete<Curriculum>(`${this.apiUrl}/curriculums/${curriculum._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la requête API pour supprimer le curriculum :',
            error
          );
          return throwError(() => 'Erreur serveur. Veuillez réessayer.');
        })
      );
  }
  deleteContact(contact: any): Observable<Contact> {
    return this.http
      .delete<Contact>(`${this.apiUrl}/contacts/${contact._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la requête API pour supprimer les données de contact :',
            error
          );
          return throwError(() => 'Erreur serveur. Veuillez réessayer.');
        })
      );
  }
}
