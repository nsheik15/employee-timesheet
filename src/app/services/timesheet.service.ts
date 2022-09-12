import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  urlV1 = `${environment.urlV1}/timesheet`;

  constructor(private _http: HttpClient) { }

  submit(payload: any) {
    return this._http.post(this.urlV1, payload);
  }

  getUserTimesheet(startDate: Date, endDate: Date) {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    const options = {
      params
    };

    return this._http.get(this.urlV1, options);
  }

}
