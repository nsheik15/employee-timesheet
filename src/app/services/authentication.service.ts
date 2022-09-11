import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  urlV1 = `${environment.urlV1}/users`;

  constructor(private _http: HttpClient, private router: Router) { }

  register(payload: any): Observable<any> {
    return this._http.post(`${this.urlV1}`, payload);
  }

  login(payload: any) {
    return this._http.post(`${this.urlV1}/login`, payload);
  }

  logout() {
    return this._http.get(`${this.urlV1}/logout`);
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
