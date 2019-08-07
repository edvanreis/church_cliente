import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable()
export class MembroService {

  private _url = environment.url+"membro/";

  constructor(public http: HttpClient) { }


  carregarSexo() {
    return this.http.get(this._url+ "sexo")
      .pipe(tap((response: any) => response));
  }

  carregarEstadoCivil() {
    return this.http.get(this._url + "estadoCivil")
      .pipe(tap((response: any) => response));
  }

  carregarTiposContatos() {
    return this.http.get(this._url + "tipoContato")
      .pipe(tap((response: any) => response));
  }

  carregarEscolaridade() {
    return this.http.get(this._url + "escolaridade")
      .pipe(tap((response: any) => response));
  }

  
  carregarEndereco(cep) {
    return this.http.get(`//viacep.com.br/ws/${cep}/json`)
    .pipe(tap((response: any) => response));
  }

  carregarEstados() {
    return this.http.get(this._url + "estados")
    .pipe(tap((response: any) => response));
  }

  save(membro){
    return this.http.post(this._url ,membro)
      .pipe(map((response: any) => response))
  }
  // _errorHandler(error: Response) {
  //   return Observable.throw(error || "Internal server error");
  // }
}
