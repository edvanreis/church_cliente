import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LicaoService implements AbstractService {

  private _url = environment.url + "licao/";

  constructor(public http: HttpClient) { }

  getList() {
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }

  save(licao) {
    return this.http.post(this._url, licao)
      .pipe(map((response: any) => response))
  }

  update(licao) {
    return this.http.put(this._url, licao)
      .pipe(map((response: any) => response))
  }

  getLicao(id) {
    return this.http.get(this._url+id)
      .pipe(map((response: any) => response))
  }

  remove(id) {
    return this.http.delete(this._url+id+"/remover")
      .pipe(map((response: any) => response))
  }
}
