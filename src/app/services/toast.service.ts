import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private loginMsg$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  login(isLogin: any) {
    this.loginMsg$.next(isLogin);
  }

  getLoginMsg() {
    return this.loginMsg$.asObservable();
  }

}
