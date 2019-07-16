import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { tap } from 'rxjs/operators';


@Injectable()
export class MembroService {
PATH = "membro/";

  constructor(public http: HttpClient,public host:Http) { }

  
  carregarSexo() {
    return this.http.get(environment.baseUrl + this.PATH + "sexo")
    .pipe(tap((response: any) => response));
  }

  carregarEstadoCivil() {
    return this.http.get(environment.baseUrl + this.PATH + "estadoCivil")
    .pipe(tap((response: any) => response));
  }

  carregarTiposContatos() {
    return this.http.get(environment.baseUrl + this.PATH + "tipoContato")
    .pipe(tap((response: any) => response));
  }

  carregarEscolaridade() {
    return this.http.get(environment.baseUrl + this.PATH + "escolaridade")
    .pipe(tap((response: any) => response));
  }

  carregarEndereco(cep) {
    return this.host.get(`//viacep.com.br/ws/${cep}/json`)
    .pipe(tap((response: any) => response));
  }


  
  _errorHandler(error: Response) {
    return Observable.throw(error || "Internal server error");
  }
}
