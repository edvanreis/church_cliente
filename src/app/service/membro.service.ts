import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable()
export class MembroService {
PATH = "membro/";

  constructor(public http: HttpClient) { }

  
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
    return this.http.get(`//viacep.com.br/ws/${cep}/json`)
    .pipe(tap((response: any) => response));
  }

  carregarEstados() {
    return this.http.get(environment.baseUrl + this.PATH + "estados")
    .pipe(tap((response: any) => response));
  }

  save(membro){
    return this.http.post(environment.baseUrl+this.PATH ,membro)
      .pipe(map((response: any) => response))
  }
  // _errorHandler(error: Response) {
  //   return Observable.throw(error || "Internal server error");
  // }
}
