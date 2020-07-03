import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _url = environment.url + "dashboard/";

  constructor(public http: HttpClient) { }

  getDashCard() {
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }
}
