import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { ToastService } from './toast.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loginMsg = 'Please login to continue';
  logoutMsg = 'Please logout to continue';
  authMsg = 'You are not authorized';

  constructor(private userService: UserService, private router: Router, private toast: ToastService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      let token = localStorage.getItem('token');
      let userJson = localStorage.getItem('user');

      if(!!token && !!userJson) {
        const user = JSON.parse(userJson);
        this.userService.setToken(token);
        this.userService.setUser(user);
      } else {
        token = sessionStorage.getItem('token');
        userJson = sessionStorage.getItem('user');

        if(!!token && !!userJson) {
          const user = JSON.parse(userJson);
          this.userService.setToken(token);
          this.userService.setUser(user);
        } else {
          this.userService.setToken(null);
          this.userService.setUser(null);
        }
      }

      return this.userService.getToken().asObservable().pipe(switchMap(jwt => {
        const pathArr = state.url.split('/');
        const path = pathArr[1];
        if(!!jwt) {
          return this.userService.getUser().pipe(switchMap(user => {
            if(!!user) {
              if(user.role === 'admin') {
                if((path === 'login') || (path === 'register')) {
                  this.toast.warn(this.logoutMsg);
                  this.router.navigate(['/admin'])
                } else
                  return of(true);
              } else if(user.role === 'user') {
                if((path === 'login') || (path === 'register') || (path === 'admin')) {
                  if(path === 'admin') {
                    this.toast.warn(this.authMsg);
                  } else {
                    this.toast.warn(this.logoutMsg);
                  }
                  this.router.navigate(['/timesheet', user.id]);
                } else
                  return of(true);
              }
            } else {
              if((path === 'login') || (path === 'register'))
                return of(true);
              else {
                this.toast.warn(this.loginMsg);
                this.router.navigate(['/login']);
              }
            }
            return of(false);
          }));
        } else {
          if((path === 'login') || (path === 'register'))
            return of(true);
          else {
            this.toast.warn(this.loginMsg);
            this.router.navigate(['/login']);
          }
        }
        return of(false);
      }));
  }

}
