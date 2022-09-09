import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

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
                  this.router.navigate(['/admin'])
                } else
                  return of(true);
              } else if(user.role === 'user') {
                if((path === 'login') || (path === 'register') || (path === 'admin')) {
                  this.router.navigate(['/timesheet', user.id]);
                } else
                  return of(true);
              }
            } else {
              if((path === 'login') || (path === 'register'))
                return of(true);
              else {
                this.router.navigate(['/login']);
              }
            }
            return of(false);
          }));
        } else {
          if((path === 'login') || (path === 'register'))
            return of(true);
          else {
            this.router.navigate(['/login']);
          }
        }
        return of(false);
      }));
  }

}
