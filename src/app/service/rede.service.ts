import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedeService {

  private _url = environment.url + "rede/";

  constructor(public http: HttpClient) { }

  tiposDeRedes() {
    return this.http.get(this._url + "tipoRedes")
      .pipe(tap((response: any) => response));
  }

  save(rede) {
    return this.http.post(this._url, rede)
      .pipe(map((response: any) => response))
  }

  getList() {
    return this.http.get(this._url+"obterLista")
      .pipe(map((response: any) => response))
  }

  

}
