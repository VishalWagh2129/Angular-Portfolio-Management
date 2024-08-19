import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Save a new brand
  save(brand: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/createProject`, brand);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllProjects`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getProjectById/${id}`);
  }

  update(id: number, brand: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateProject/${id}`, brand);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteProject/${id}`);
  }
}
