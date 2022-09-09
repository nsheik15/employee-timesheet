import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token$: BehaviorSubject<any> = new BehaviorSubject(null);
  private user$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  setToken(token: any) {
    this.token$.next(token);
  }

  setUser(user: any) {
    this.user$.next(user);
  }

  getToken() {
    return this.token$;
  }

  getUser() {
    return this.user$;
  }

}
