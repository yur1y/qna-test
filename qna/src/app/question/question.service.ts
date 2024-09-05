import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as api } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post(`${api.apiUrl}questions`, data).pipe();
  }

  get(): Observable<any> {
    return this.http.get(`${api.apiUrl}questions`).pipe();
  }

  update(data: any): Observable<any> {
    return this.http.put(`${api.apiUrl}questions`, data).pipe();
  }
  delete(data: any): Observable<any> {
    return this.http.delete(`${api.apiUrl}questions/${data.id}`).pipe();
  }
}
