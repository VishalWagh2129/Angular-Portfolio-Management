import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AboutService {

  // apiUrl: string = 'http://localhost:3000/api';
  apiUrl:string = "https://angular-portfolio-management.onrender.com/api";

  constructor(private http: HttpClient) { }

  getAbout(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAbout`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateAbout/${id}`, data);
  }
}