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
}
