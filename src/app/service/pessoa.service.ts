import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private _url = environment.url + "pessoa/";

  constructor(public http: HttpClient) { }


  carregarEscolaridade() {
    return this.http.get(this._url + "escolaridade")
      .pipe(tap((response: any) => response));
  }


  carregarEstadoCivil() {
    return this.http.get(this._url + "estadoCivil")
      .pipe(tap((response: any) => response));
  }


  carregarSexo() {
    return this.http.get(this._url + "sexo")
      .pipe(tap((response: any) => response));
  }

  save(pessoa) {
    return this.http.post(this._url , pessoa)
      .pipe(map((response: any) => response))
  }

  pesquisar(pessoa) {
    return this.http.post(this._url + "pesquisar", pessoa)
      .pipe(map((response: any) => response))
  }

  obterPessoa(id) {
    return this.http.get(this._url + id + "/obterPessoa")
      .pipe(tap((response: any) => response));
  }

  obterEscolaridadePessoa(id) {
    return this.http.get(this._url + id + "/escolaridadePessoa")
      .pipe(tap((response: any) => response));
  }

  update(pessoa) {
    return this.http.put(this._url,pessoa)
      .pipe(map((response: any) => response))
  }

  getListMembros() {
    return this.http.get(this._url + "listaMembros")
      .pipe(map((response: any) => response))
  }

  getHistory(id) {
    return this.http.get(this._url + id + "/historico")
      .pipe(tap((response: any) => response));
  }

  inativarPessoa(pessoa) {
    return this.http.put(this._url + "inativar", pessoa)
      .pipe(map((response: any) => response))
  }

  reativarPessoa(pessoa) {
    return this.http.put(this._url + "reativar", pessoa)
      .pipe(map((response: any) => response))
  }

  
  pessoaRede(id) {
    return this.http.get(this._url + id + "/pessoaRede")
      .pipe(tap((response: any) => response));
  }

  

}
