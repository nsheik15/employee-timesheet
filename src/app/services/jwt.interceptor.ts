import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.userService.getToken().pipe(take(1), switchMap(token => {
      if(!!token) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }

      return next.handle(request);
    }));
  }
}
