import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseSectionDTO } from '../../../core/DTOs/courseSection.dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseSectionService {
    private apiUrl = `${environment.apiBaseUrl}course-sections`;

  constructor(private http: HttpClient) {}

  getAllSections(): Observable<CourseSectionDTO[]> {
    return this.http.get<CourseSectionDTO[]>(this.apiUrl);
  }
}
