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
}
