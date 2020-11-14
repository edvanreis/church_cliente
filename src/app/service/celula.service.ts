import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CelulaService implements AbstractService{


  private _url = environment.url + "celula/";

  constructor(public http: HttpClient) { }

  carregarSemana() {
    return this.http.get(this._url + "semana")
      .pipe(tap((response: any) => response));
  }

  carregarTurno() {
    return this.http.get(this._url + "turno")
      .pipe(tap((response: any) => response));
  }

  carregarTipoCelula() {
    return this.http.get(this._url + "tipoCelula")
      .pipe(tap((response: any) => response));
  }

  save(celula) {
    return this.http.post(this._url, celula)
      .pipe(map((response: any) => response))
  }

  getList() {
    return this.http.get(this._url+"list")
      .pipe(map((response: any) => response))
  }

  getCelula(id) {
    return this.http.get(this._url+id+'/obterCelula')
      .pipe(map((response: any) => response))
  }

  update(celula) {
    return this.http.put(this._url, celula)
      .pipe(map((response: any) => response))
  }

  ativar(celula) {
    return this.http.put(this._url+"ativar", celula)
      .pipe(map((response: any) => response))
  }

  inativar(celula) {
    return this.http.put(this._url+"ativar", celula)
      .pipe(map((response: any) => response))
  }

  getListForStatus(status) {
    return this.http.get(this._url+status+"/celulasPorStatus")
      .pipe(map((response: any) => response))
  }

  getCelulaPessoa(id) {
    return this.http.get(this._url+id+'/obterCelulaMembro')
      .pipe(map((response: any) => response))
  }

  getCelulaRede(id) {
    return this.http.get(this._url+id+'/obterCelulasRede')
      .pipe(map((response: any) => response))
  }

  remove(id) {
    return this.http.delete(this._url+id)
      .pipe(map((response: any) => response))
  }

  getMembros(id) {
    return this.http.get(`${this._url}${id}/membros`)
      .pipe(map((response: any) => response))
  }

  getVisitantes(id) {
    return this.http.get(`${this._url}${id}/visitantes`)
      .pipe(map((response: any) => response))
  }


}
