import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}students`;

  constructor(private http: HttpClient) { }
  login(loginID: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { loginID, password });
  }

  getProfile(studentID: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${studentID}/profile`);
  }
}