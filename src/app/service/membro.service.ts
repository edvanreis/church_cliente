import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


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


  _errorHandler(error: Response) {
    return Observable.throw(error || "Internal server error");
  }
}
