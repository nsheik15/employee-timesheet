import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, switchMap, take, throwError } from 'rxjs';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';
import { ToastService } from './toast.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  authErrMsg = 'You\'re not Authorized. Please login again!';

  constructor(private userService: UserService, private authService: AuthenticationService, private toast: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.userService.getToken().pipe(take(1), switchMap(token => {
      if(!!token) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }

      return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
    }));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if(err.status === 401) {
      this.authService.onLogout();
      this.toast.warn(this.authErrMsg);
      return of(err.message);
    }
    return throwError(() => err);
  }

}
