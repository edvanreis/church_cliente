import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReuniaoService  {

  private _url = environment.url + "reuniao/";

  constructor(public http: HttpClient) { }

  save(reuniao) {
    return this.http.post(this._url, reuniao)
      .pipe(map((response: any) => response))
  }

  update(reuniao) {
    return this.http.put(this._url, reuniao)
      .pipe(map((response: any) => response))
  }

  getReuniao(id) {
    return this.http.get(this._url+id+"/obterReuniao")
      .pipe(map((response: any) => response))
  }

  remove(id) {
    return this.http.delete(this._url+id+'/remover')
      .pipe(map((response: any) => response))
  }

  search(reuniao) {
    return this.http.post(this._url+"pesquisar", reuniao)
      .pipe(map((response: any) => response))
  }


  removeByPessoaObj(obj) {
    return this.http.post(this._url+"removerPessoa", obj)
      .pipe(map((response: any) => response))
  }

  relatorioReniaoSemanal(id) {
    return this.http.get(this._url+id+"/relatorioReuniaoSemenal",{ responseType: "blob" })
    .pipe(map((response: any) => response))
  }

}
