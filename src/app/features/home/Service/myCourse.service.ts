import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SectionDTO } from '../../../core/DTOs/CourceMaster/ISection.dto';
import { ModuleDTO } from '../../../core/DTOs/CourceMaster/IModule.dto';
import { TopicDTO } from '../../../core/DTOs/CourceMaster/ITopic.dto';
import { ContentDTO } from '../../../core/DTOs/CourceMaster/IContent.dto';

@Injectable({ providedIn: 'root' })

export class MyCourseService {

  private baseUrl = `${environment.apiBaseUrl}admin`;

  constructor(private http: HttpClient) { }
  getAllSections(): Observable<SectionDTO[]> {
    return this.http.get<SectionDTO[]>(`${this.baseUrl}/sections`);
  }

  getModulesBySection(sectionId: string): Observable<ModuleDTO[]> {
    return this.http.get<ModuleDTO[]>(`${this.baseUrl}/sections/${sectionId}/modules`);
  }


  getTopicsByModule(moduleId: string): Observable<TopicDTO[]> {
    return this.http.get<TopicDTO[]>(`${this.baseUrl}/modules/${moduleId}/topics`);
  }


  getContentsByTopic(topicId: string) {
    return this.http.get<ContentDTO[]>(`${this.baseUrl}/content/byTopic/${topicId}`);
  }

}
