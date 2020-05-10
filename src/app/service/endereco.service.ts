import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private _url = environment.url+"endereco/";

  constructor(public http: HttpClient) { }

    
  carregarEndereco(cep) {
    return this.http.get(this._url+cep+"/obterEndereco")
    .pipe(tap((response: any) => response));
  }

  carregarEstados() {
    return this.http.get(this._url + "estados")
      .pipe(tap((response: any) => response));
  }

  obterEndereco(id) {
    return this.http.get(this._url + id + "/enderecosPessoa")
      .pipe(tap((response: any) => response));
  }

  carregarTiposEndereco() {
    return this.http.get(this._url + "tiposEndereco")
      .pipe(tap((response: any) => response));
  }

 
  update(obj) {
    return this.http.put(this._url, obj)
      .pipe(tap((response: any) => response));
  }

}
