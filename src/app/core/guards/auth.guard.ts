import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Guard to protect routes that require authentication
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Check if token exists
    const token = sessionStorage.getItem('authToken');
    
    if (token) {
      // Check if token is still valid
      if (this.isTokenValid(token)) {
        return true;
      } else {
        // Token expired
        console.warn('Token expired - redirecting to login');
        this.clearSession();
        return this.router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url, reason: 'expired' }
        });
      }
    }

    // Not logged in - redirect to login page with return url
    console.warn('Not authenticated - redirecting to login');
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  /**
   * Check if JWT token is valid
   */
  private isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < expiry;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  /**
   * Clear session storage
   */
  private clearSession(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('studentProfile');
    sessionStorage.removeItem('studentRole');
    sessionStorage.removeItem('studentID');
  }
}