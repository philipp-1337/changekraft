import {
  CanActivate,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/admin/login']);
    }
    return false;
  }

  canLoad(route: Route): boolean {
    const url: string = route.path;
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/admin/login']);
    return false;
  }
}
