import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EscolaridadeService {

  private _url = environment.url + "escolaridade/";

  constructor(public http: HttpClient) { }

  getList() {
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }

  obterEscolaridadePessoa(id) {
    return this.http.get(this._url + id + "/escolaridadePessoa")
      .pipe(tap((response: any) => response));
  }



}
