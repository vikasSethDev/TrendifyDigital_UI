import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentAccessDTO } from '../../../core/DTOs/studentAccess.dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentAccessService {
    private apiUrl = `${environment.apiBaseUrl}student-access`;

  constructor(private http: HttpClient) {}

  getAccessByStudent(studentId: string): Observable<StudentAccessDTO[]> {
    return this.http.get<StudentAccessDTO[]>(`${this.apiUrl}/${studentId}`);
  }

  assignAccess(studentId: string, sectionId: number, grantedBy: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/assign`, { studentId, sectionId, grantedBy });
  }

  revokeAccess(studentId: string, sectionId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/revoke`, { studentId, sectionId });
  }
}
