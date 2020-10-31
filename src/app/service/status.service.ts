import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private _url = environment.url;

  constructor(public http: HttpClient) { }

  ativar(obj,controller) {
    let url = this._url+controller;
    return this.http.put(url+"/ativar", obj)
      .pipe(map((response: any) => response))
  }

  inativar(obj,controller) {
    let url = this._url+controller;
    return this.http.put(url+"/inativar", obj)
      .pipe(map((response: any) => response))
  }


}
