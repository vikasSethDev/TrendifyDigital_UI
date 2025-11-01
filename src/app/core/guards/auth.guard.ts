import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root' // Registers guard globally
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {}

  // Centralized login check
  private checkLogin(): boolean | UrlTree {
    const token = localStorage.getItem('token'); // Must match your login storage key
    console.log('AuthGuard - token:', token);

    if (token) {
      return true; // User is logged in
    } else {
      // Not logged in, redirect to login
      // Optional: preserve the original URL to navigate back after login
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: this.router.url } });
    }
  }

  // Protect top-level routes
  canActivate(): boolean | UrlTree {
    return this.checkLogin();
  }

  // Protect child routes
  canActivateChild(): boolean | UrlTree {
    return this.checkLogin();
  }
}
