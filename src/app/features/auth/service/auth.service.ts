import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string; // ✅ JWT token from backend
  student: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}students`;
  private currentUserSubject: BehaviorSubject<any | null>;
  public currentUser: Observable<any | null>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Load user from sessionStorage on service initialization
    const storedUser = sessionStorage.getItem('studentProfile');
    this.currentUserSubject = new BehaviorSubject<any | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Get current user value
   */
  public get currentUserValue(): any | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is logged in
   */
  public get isLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  /**
   * Check if current user is admin
   */
  public get isAdmin(): boolean {
    const roleStr = sessionStorage.getItem('studentRole');
    if (!roleStr) return false;
    try {
      const role = JSON.parse(roleStr);
      return role === 'admin';
    } catch {
      return false;
    }
  }

  /**
   * Login user with backend API
   */
  login(loginID: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { 
      loginID, 
      password 
    }).pipe(
      tap(response => {
        if (response.success && response.token) {
          // ✅ Store JWT token (required for authentication)
          sessionStorage.setItem('authToken', response.token);
          sessionStorage.setItem('studentProfile', JSON.stringify(response.student));
          this.currentUserSubject.next(response.student);
        }
      })
    );
  }

  /**
   * Get student profile
   */
  getProfile(studentID: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${studentID}/profile`);
  }

  /**
   * Logout user
   */
  logout(): void {
    // Clear all session storage
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('studentProfile');
    sessionStorage.removeItem('studentRole');
    sessionStorage.removeItem('studentID');
    this.currentUserSubject.next(null);
    
    // Redirect to login
    this.router.navigate(['/login']);
  }

  /**
   * Get JWT token
   */
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  /**
   * Check if token exists and is valid (basic check)
   */
  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decode JWT token payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < expiry;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  /**
   * Register new user
   */
  register(userData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          if (response.success && response.token) {
            // Auto-login after registration
            sessionStorage.setItem('authToken', response.token);
            sessionStorage.setItem('studentProfile', JSON.stringify(response.student));
            this.currentUserSubject.next(response.student);
          }
        })
      );
  }

  /**
   * Change password
   */
  changePassword(studentID: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, {
      studentID,
      oldPassword,
      newPassword
    });
  }
}