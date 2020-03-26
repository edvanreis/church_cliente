import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CelulaService {

  private _url = environment.url + "celula/";

  constructor(public http: HttpClient) { }

  carregarSemana() {
    return this.http.get(this._url + "semana")
      .pipe(tap((response: any) => response));
  }

  carregarTurno() {
    return this.http.get(this._url + "turno")
      .pipe(tap((response: any) => response));
  }

  carregarTipoCelula() {
    return this.http.get(this._url + "tipoCelula")
      .pipe(tap((response: any) => response));
  }

  save(celula) {
    return this.http.post(this._url, celula)
      .pipe(map((response: any) => response))
  }

  getList() {
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }

  getTipoPessoaCelula() {
    return this.http.get(this._url + "tipoPessoa")
      .pipe(tap((response: any) => response));
  }

}
