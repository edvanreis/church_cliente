import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private _url = environment.url + "grupoTrabalho/";

  constructor(public http: HttpClient) { }

  getList() {
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }

  save(grupo) {
    return this.http.post(this._url, grupo)
      .pipe(map((response: any) => response))
  }

  update(grupo) {
    return this.http.put(this._url, grupo)
      .pipe(map((response: any) => response))
  }

  getGrupo(id) {
    return this.http.get(this._url+id+"/getGrupoTrabalho")
      .pipe(map((response: any) => response))
  }

  getGruposByIgrejas(obj) {
    return this.http.post(this._url+"gruposByIgrejas",obj)
      .pipe(map((response: any) => response))
  }

  findGruposTrabalhoESubByIgreja(obj) {
    return this.http.post(this._url+"gruposSubByIgrejas",obj)
      .pipe(map((response: any) => response))
  }


  getGruposByIgrejasGroupBy(obj) {
    return this.http.post(this._url+"gruposByIgrejasGrupby",obj)
      .pipe(map((response: any) => response))
  }

  search(grupo) {
    return this.http.post(this._url+"pesquisar", grupo)
      .pipe(map((response: any) => response))
  }

  getListForStatus(status) {
    return this.http.get(this._url+status+"/grupoPorStatus")
      .pipe(map((response: any) => response))
  }


  getModalidade() {
    return this.http.get(this._url+"musicoModalidades")
      .pipe(map((response: any) => response))
  }

}
