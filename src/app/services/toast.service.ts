import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private loginMsg$: BehaviorSubject<any> = new BehaviorSubject(null);
  private warnMsg$: BehaviorSubject<any> = new BehaviorSubject(null);
  private logoutMsg$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  login(msg: any) {
    this.loginMsg$.next(msg);
  }

  warn(msg: any) {
    this.warnMsg$.next(msg);
  }

  logout(msg: any) {
    this.logoutMsg$.next(msg);
  }

  getLoginMsg() {
    return this.loginMsg$.asObservable();
  }

  getWarnMsg() {
    return this.warnMsg$.asObservable();
  }

  getLogoutMsg() {
    return this.logoutMsg$.asObservable();
  }

}
