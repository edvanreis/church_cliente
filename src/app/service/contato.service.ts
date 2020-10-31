import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private _url = environment.url + "contato/";

  constructor(public http: HttpClient) { }

  carregarTiposContatos() {
    return this.http.get(this._url + "tipoContato")
      .pipe(tap((response: any) => response));
  }

  obterContatoPessoa(id) {
    return this.http.get(this._url + id + "/contatoPessoa")
      .pipe(tap((response: any) => response));
  }

  remove(id) {
    return this.http.delete(this._url + id)
      .pipe(tap((response: any) => response));
  }

  getContato(id) {
    return this.http.get(this._url + id)
      .pipe(tap((response: any) => response));
  }

  update(obj) {
    return this.http.put(this._url, obj)
      .pipe(tap((response: any) => response));
  }
}
