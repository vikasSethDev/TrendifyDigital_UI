import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DashboardSummaryDTO } from '../../../core/DTOs/AdminDashboard/DashboardSummary.dto';


@Injectable({ providedIn: 'root' })
export class AdminDashboardService {
  private baseUrl = `${environment.apiBaseUrl}admin/dashboard`;

  constructor(private http: HttpClient) { }
 
  getDashboardSummary(year: number, month: number): Observable<DashboardSummaryDTO> {
    const params = new HttpParams()
      .set('year', year.toString())
      .set('month', month.toString());

    return this.http.get<DashboardSummaryDTO>(`${this.baseUrl}/summary`, { params });
  }
}
