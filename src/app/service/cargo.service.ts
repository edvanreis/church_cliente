import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private _url = environment.url + "cargo/";

  constructor(public http: HttpClient) { }

  getList() {
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }

  obterPessoaCargo(id) {
    return this.http.get(this._url + id + "/pessoaCargo")
      .pipe(tap((response: any) => response));
  }
}
