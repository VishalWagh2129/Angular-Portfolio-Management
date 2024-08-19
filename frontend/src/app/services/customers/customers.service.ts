import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  createCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/newMessage`, customer);
  }

  getAllMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllMessages`);
  }

  getMessageById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateMessage(id: string, customer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, customer);
  }

  deleteMessage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
