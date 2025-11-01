// auth/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const profileStr = sessionStorage.getItem('studentProfile');
    if (!profileStr) {
      this.router.navigate(['/login']);
      return false;
    }

    const profile = JSON.parse(profileStr);
    const expectedRole = route.data['role'] as string;

    if (expectedRole && profile.role !== expectedRole) {
      this.router.navigate(['/login']); // redirect if role doesn't match
      return false;
    }

    return true; // role matches
  }
}
