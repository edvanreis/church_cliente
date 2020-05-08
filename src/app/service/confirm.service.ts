import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  private _url = environment.url;

  constructor(public http: HttpClient) { }

  removeByObj(obj,controller) {
    let url = this._url+controller;
    return this.http.post(url+"/removeByObj", obj)
      .pipe(map((response: any) => response))
  }

  
  remove(id,controller) {
    let url = this._url+controller+"/";
    return this.http.delete(url+id)
      .pipe(map((response: any) => response))
  }
}
