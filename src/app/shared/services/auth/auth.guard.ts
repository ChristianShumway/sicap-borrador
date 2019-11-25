import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AutenticacionService } from './../autenticacion.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public authToken;
  private isAuthenticated = true; // Set this value dynamically
  
  constructor(
    private router: Router,
    private autenticacionService: AutenticacionService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.autenticacionService.currentUserValue;
    if (this.isAuthenticated && currentUser) {
      return true
    }
    this.router.navigate(['/login']);
    return false;
  }
}