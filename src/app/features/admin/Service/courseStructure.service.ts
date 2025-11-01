import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseSectionDTO, ModuleDTO, TopicDTO, ContentDTO } from '../../../core/DTOs/ICourseStructureDTO';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CourseStructureService {
  private baseUrl = `${environment.apiBaseUrl}admin`;

  constructor(private http: HttpClient) { }
  getAllSections(): Observable<any> {
    return this.http.get(`${this.baseUrl}/sections`);
  }

  createSection(section: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/sections`, section);
  }

  updateSection(id: string, section: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/sections/${id}`, section);
  }

  deleteSection(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/sections/${id}`);
  }

  // =============================
  // MODULE CRUD (Under Section)
  // =============================
  getModulesBySection(sectionId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/sections/${sectionId}/modules`);
  }

  createModule(sectionId: string, module: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/sections/${sectionId}/modules`, module);
  }

  updateModule(id: string, module: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/modules/${id}`, module);
  }

  deleteModule(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/modules/${id}`);
  }

  // =============================
  // TOPIC CRUD (Under Module)
  // =============================
  getTopicsByModule(moduleId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/modules/${moduleId}/topics`);
  }

  createTopic(moduleId: string, topic: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/modules/${moduleId}/topics`, topic);
  }

  updateTopic(id: string, topic: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/topics/${id}`, topic);
  }

  deleteTopic(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/topics/${id}`);
  }
}
