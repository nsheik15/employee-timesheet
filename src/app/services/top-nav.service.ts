import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopNavService {

  private date$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  setDate(date: any) {
    this.date$.next(date);
  }

  getDate() {
    return this.date$;
  }

}
