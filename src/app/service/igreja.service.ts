import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IgrejaService {

  private _url = environment.url + "igreja/";

  constructor(public http: HttpClient) { }

  saveSede(igreja) {
    return this.http.post(this._url+"saveSede", igreja)
      .pipe(map((response: any) => response))
  }

  saveFilial(igreja) {
    return this.http.post(this._url+"saveFilial", igreja)
      .pipe(map((response: any) => response))
  }

  getListSede() {
    console.log(this._url+"obterSede");
    return this.http.get(this._url+"obterSede")
      .pipe(map((response: any) => response))
  }
}
