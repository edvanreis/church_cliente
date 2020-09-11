import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembroService  implements AbstractService{

  private _url = environment.url + "membro/";

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

  save(membro) {
    return this.http.post(this._url, membro)
      .pipe(map((response: any) => response))
  }

  pesquisar(membro) {
    return this.http.post(this._url + "pesquisar", membro)
      .pipe(map((response: any) => response))
  }

  obterMembro(id) {
    return this.http.get(this._url + id + "/obterMembro")
      .pipe(tap((response: any) => response));
  }

  update(membro) {
    return this.http.put(this._url, membro)
      .pipe(map((response: any) => response))
  }

  getListMembros() {
    return this.http.get(this._url + "listaMembros")
      .pipe(map((response: any) => response))
  }

  getHistory(id) {
    return this.http.get(this._url + id + "/historico")
      .pipe(tap((response: any) => response));
  }

  inativarPessoa(membro) {
    return this.http.put(this._url + "inativar", membro)
      .pipe(map((response: any) => response))
  }

  reativarPessoa(membro) {
    return this.http.put(this._url + "reativar", membro)
      .pipe(map((response: any) => response))
  }


  membroRede(id) {
    return this.http.get(this._url + id + "/membroRede")
      .pipe(tap((response: any) => response));
  }

  getMembroCelula(id) {
    return this.http.get(this._url + id + "/membroCelula")
      .pipe(tap((response: any) => response));
  }


  remove(id) {
    return this.http.delete(this._url+id)
      .pipe(map((response: any) => response))
  }

  getMembroCelulas(list) {
    return this.http.post(this._url + "membroCelula",list)
      .pipe(tap((response: any) => response));
  }

  getMembroIgreja(id) {
    return this.http.get(this._url + id + "/membroIgreja")
      .pipe(tap((response: any) => response));
  }

  getMembroIgrejaByRede(id) {
    return this.http.get(this._url + id + "/membroIgrejaByRede")
      .pipe(tap((response: any) => response));
  }

  aprovar(id) {
    return this.http.get(this._url+id+"/aprovar")
      .pipe(map((response: any) => response))
  }

  aprovarReprovado(id) {
    return this.http.get(this._url+id+"/aprovarReprovado")
      .pipe(map((response: any) => response))
  }

  reprovar(membro) {
    return this.http.post(this._url+"reprovar",membro)
      .pipe(map((response: any) => response))
  }

  avisoVisitanteJaCadastrado(membro) {
    return this.http.post(this._url+"avisoVisitanteJaCadastrado",membro)
      .pipe(map((response: any) => response))
  }

  transferirMembro(controller,id,membroId,metodo) {
    return this.http.get(`${environment.url}${controller}/${id}/${membroId}/${metodo}`)
      .pipe(tap((response: any) => response));
  }



}
