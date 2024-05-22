import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../../models/category.models';
import { Curriculum } from '../../models/curriculum.models';
import { Image } from '../../models/image.models';
import { Stack } from '../../models/stack.models';
import { Work } from '../../models/work.models';

@Injectable({
  providedIn: 'root',
})
export class updateDataService {
  private apiUrl = 'https://v2-jumic-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  updateWork(work: any): Observable<Work> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .put<Work>(`${this.apiUrl}/works/${work._id}`, work, { headers })
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la requête API pour mettre à jour le travail :',
            error
          );
          return throwError(() => 'Erreur serveur. Veuillez réessayer.');
        })
      );
  }
  updateCategory(category: any): Observable<Category> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .put<Category>(`${this.apiUrl}/categories/${category._id}`, category, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la requête API pour mettre à jour la catégorie :',
            error
          );
          return throwError(() => 'Erreur serveur. Veuillez réessayer.');
        })
      );
  }
  updateStack(stack: any): Observable<Stack> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .put<Stack>(`${this.apiUrl}/stacks/${stack._id}`, stack, { headers })
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la requête API pour mettre à jour le stack :',
            error
          );
          return throwError(() => 'Erreur serveur. Veuillez réessayer.');
        })
      );
  }
  updateImage(image: any): Observable<Image> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .put<Image>(`${this.apiUrl}/images/${image._id}`, image, { headers })
      .pipe(
        catchError((error) => {
          console.error(
            "Erreur lors de la requête API pour mettre à jour l'image :",
            error
          );
          return throwError(() => 'Erreur serveur. Veuillez réessayer.');
        })
      );
  }
  updateCurriculum(curriculum: any): Observable<Curriculum> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .put<Curriculum>(
        `${this.apiUrl}/curriculums/${curriculum._id}`,
        curriculum,
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la requête API pour mettre à jour le curriculum :',
            error
          );
          return throwError(() => 'Erreur serveur. Veuillez réessayer.');
        })
      );
  }
}
