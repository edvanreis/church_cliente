import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubGrupoService {

  private _url = environment.url + "subGrupoTrabalho/";

  constructor(public http: HttpClient) { }

  getList() {
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }

  save(grupo) {
    return this.http.post(this._url, grupo)
      .pipe(map((response: any) => response))
  }

  update(grupo) {
    return this.http.put(this._url, grupo)
      .pipe(map((response: any) => response))
  }
}