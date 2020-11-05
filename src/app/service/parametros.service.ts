import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ParametrosService implements AbstractService {

  private _url = environment.url + "parametros/";

  constructor(public http: HttpClient) { }

  save(parametros) {
    return this.http.post(this._url, parametros)
      .pipe(map((response: any) => response))
  }


  update(parametros) {
    return this.http.put(this._url, parametros)
      .pipe(map((response: any) => response))
  }

  remove(id) {
    return this.http.delete(`${this._url}${id}`)
      .pipe(map((response: any) => response))
  }

  getList() {
    console.log(this._url)
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }

  getTipo() {
  return this.http.get(`${this._url}tipo`)
      .pipe(map((response: any) => response))
  }

  getParametro(id) {
    return this.http.get(`${this._url}${id}`)
        .pipe(map((response: any) => response))
  }


}
