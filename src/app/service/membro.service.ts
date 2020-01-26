import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable()
export class MembroService {

  private _url = environment.url + "membro/";

  constructor(public http: HttpClient) { }




  carregarTiposContatos() {
    return this.http.get(this._url + "tipoContato")
      .pipe(tap((response: any) => response));
  }

  save(membro) {
    return this.http.post(this._url, membro)
      .pipe(map((response: any) => response))
  }

  pesquisar(membro) {
    console.log(this._url + "pesquisar" + membro);
    return this.http.post(this._url + "pesquisar", membro)
      .pipe(map((response: any) => response))
  }

  getList() {
    console.log(this._url + "lista");
    return this.http.get(this._url + "lista")
      .pipe(map((response: any) => response))
  }
}
