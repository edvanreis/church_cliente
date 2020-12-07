import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AgendamentoService implements AbstractService {

  private _url = environment.url + "agendamento/";

  constructor(public http: HttpClient) { }

  getList() {
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }

  save(agendamento) {
    return this.http.post(this._url, agendamento)
      .pipe(map((response: any) => response))
  }


  update(agendamento) {
    return this.http.put(this._url, agendamento)
      .pipe(map((response: any) => response))
  }

  remove(id) {
    return this.http.delete(this._url+id)
      .pipe(map((response: any) => response))
  }


  getDias(dias) {
    return this.http.post(this._url+"getDias",dias)
      .pipe(map((response: any) => response))
  }

  processar(agendamento) {
    return this.http.post(this._url+"processar", agendamento)
      .pipe(map((response: any) => response))
  }

  saveListAgendamentos(agendamentos) {
    return this.http.post(this._url+"saveListAgendamentos", agendamentos)
      .pipe(map((response: any) => response))
  }

  getAgendamento(id) {
    return this.http.get(this._url+id+'/getAgendamento')
      .pipe(map((response: any) => response))
  }

  aprovar(id) {
    return this.http.get(this._url+id+"/aprovar")
      .pipe(map((response: any) => response))
  }

  reprovar(agendamento) {
    return this.http.post(this._url+"reprovar",agendamento)
      .pipe(map((response: any) => response))
  }

  cancelar(agendamento) {
    return this.http.post(this._url+"cancelar",agendamento)
      .pipe(map((response: any) => response))
  }

  processarAgendamentoCulto(agendamento) {
    return this.http.post(this._url+"processarAgendamentoCulto", agendamento)
      .pipe(map((response: any) => response))
  }

  getAgendamentoAtualIgreja(id) {
    return this.http.post(this._url+'getAgendamentoIgreja',id)
      .pipe(map((response: any) => response))
  }

  getAgendamentosIgreja(id) {
    return this.http.get(`${this._url}${id}/getAgendamentosIgreja`)
      .pipe(map((response: any) => response))
  }

  obterAgendamentosMes(obj) {
    return this.http.post(this._url+"obterAgendamentosMes",obj)
      .pipe(map((response: any) => response))
  }

}
