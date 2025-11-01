import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IStudentProfileDTO } from '../../../core/DTOs/IStudentProfileDTO';
import { IPasswordUpdateDTO } from '../../../core/DTOs/PasswordUpdateDTO';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = `${environment.apiBaseUrl}students`;

  constructor(private http: HttpClient) { }

  // 🔹 Login
  login(loginID: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { loginID, password });
  }

  // 🔹 Change Password
  changePassword(studentID: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, {
      studentID,
      oldPassword,
      newPassword
    });
  }

  // 🔹 Get Profile
  getProfile(studentID: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${studentID}/profile`);
  }

  // 🔹 Get Payments
  getPayments(studentID: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${studentID}/payments`);
  }


  getAllStudents(filter: string = ''): Observable<IStudentProfileDTO[]> {
    return this.http.get<IStudentProfileDTO[]>(`${this.apiUrl}/all?filter=${filter}`);
  }

  registerStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, studentData);
  }

  updateStudent(studentID: string | number, studentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${studentID}`, studentData);
  }

  updateStudentPassword(payload: any): Observable<any> {
    const url = `${this.apiUrl}/change-password`;
    return this.http.post(url, payload);
  }

}
