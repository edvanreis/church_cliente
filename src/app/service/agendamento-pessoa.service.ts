import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AgendamentoPessoaService {

  private _url = environment.url + "agendamentoPessoa/";

  constructor(public http: HttpClient) { }

  save(obj) {
    return this.http.post(this._url,obj)
      .pipe(map((response: any) => response))
  }

  pessoasAgendadas(id) {
    return this.http.get(`${this._url}${id}/pessoasAgendadas`)
      .pipe(map((response: any) => response))
  }

  marcarPresentePessoa(obj) {
    return this.http.put(this._url+"marcarPresentePessoa",obj)
      .pipe(map((response: any) => response))
  }


  justificarFaltaAgendamento(obj) {
    return this.http.put(this._url+"justificarFaltaAgendamento",obj)
      .pipe(map((response: any) => response))
  }

  totalPessoasAgendadas(id) {
    return this.http.get(`${this._url}${id}/totalPessoasAgendadas`)
      .pipe(map((response: any) => response))
  }

  getAgendamentosPessoa(cpf) {
    return this.http.post(this._url+"getAgendamentosPessoa",cpf)
      .pipe(map((response: any) => response))
  }

  removerAgendamentoPessoa(cpf) {
    return this.http.post(this._url+"removerAgendamentoPessoa",cpf)
      .pipe(map((response: any) => response))
  }
}
