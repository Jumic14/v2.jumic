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
export class getDataService {
  private apiUrl = 'https://v2-jumic-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  getWorks(): Observable<Work[]> {
    return this.http.get<Work[]>(`${this.apiUrl}/works`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la requête API :', error);
        return throwError(() => 'Erreur serveur. Veuillez réessayer.');
      })
    );
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`).pipe(
      catchError((error) => {
        console.error(
          'Erreur lors de la requête API pour les catégories :',
          error
        );
        return throwError(() => 'Erreur serveur. Veuillez réessayer.');
      })
    );
  }
  getStacks(): Observable<Stack[]> {
    return this.http.get<Stack[]>(`${this.apiUrl}/stacks`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la requête API pour les stacks :', error);
        return throwError(() => 'Erreur serveur. Veuillez réessayer.');
      })
    );
  }
  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/images`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la requête API pour les images :', error);
        return throwError(() => 'Erreur serveur. Veuillez réessayer.');
      })
    );
  }
  getWorksStacks(): Observable<WorkStack[]> {
    return this.http.get<WorkStack[]>(`${this.apiUrl}/worksStacks`).pipe(
      catchError((error) => {
        console.error(
          'Erreur lors de la requête API pour les works_stacks :',
          error
        );
        return throwError(() => 'Erreur serveur. Veuillez réessayer.');
      })
    );
  }
  getCurriculums(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(`${this.apiUrl}/curriculums`).pipe(
      catchError((error) => {
        console.error(
          'Erreur lors de la requête API pour les curriculums :',
          error
        );
        return throwError(() => 'Erreur serveur. Veuillez réessayer.');
      })
    );
  }
  getContactMessages(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts`).pipe(
      catchError((error) => {
        console.error(
          'Erreur lors de la requête API pour les messages de contact :',
          error
        );
        return throwError(() => 'Erreur serveur. Veuillez réessayer.');
      })
    );
  }
}
