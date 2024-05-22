import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
export class postDataService {
  private apiUrl = 'https://v2-jumic-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  postWork(workData: any): Observable<Work> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .post<Work>(`${this.apiUrl}/works`, workData, { headers })
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de l'enregistrement du travail :", error);
          throw error;
        })
      );
  }
  postCategory(categoryData: any): Observable<Category> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .post<Category>(`${this.apiUrl}/categories`, categoryData, { headers })
      .pipe(
        catchError((error) => {
          console.error(
            "Erreur lors de l'enregistrement de la catégorie :",
            error
          );
          throw error;
        })
      );
  }
  postImage(imageData: any): Observable<Image> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .post<Image>(`${this.apiUrl}/images`, imageData, { headers })
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de l'enregistrement de l'image :", error);
          throw error;
        })
      );
  }
  postStack(stackData: any): Observable<Stack> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .post<Stack>(`${this.apiUrl}/stacks`, stackData, { headers })
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de l'enregistrement du stack :", error);
          throw error;
        })
      );
  }
  postWorksStack(worksStackData: any): Observable<WorkStack> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .post<WorkStack>(`${this.apiUrl}/worksStacks`, worksStackData, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error(
            "Erreur lors de l'enregistrement du stack de travaux :",
            error
          );
          throw error;
        })
      );
  }
  postCurriculum(curriculumData: any): Observable<Curriculum> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http
      .post<Curriculum>(`${this.apiUrl}/curriculums`, curriculumData, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error(
            "Erreur lors de l'enregistrement du curriculum :",
            error
          );
          throw error;
        })
      );
  }
  postContactForm(formData: any): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/contacts`, formData).pipe(
      catchError((error) => {
        console.error('Erreur lors de la soumission du formulaire:', error);
        throw error;
      })
    );
  }
}
