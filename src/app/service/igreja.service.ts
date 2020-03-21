import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IgrejaService {

  private _url = environment.url + "igreja/";

  constructor(public http: HttpClient) { }

  saveSede(igreja) {
    return this.http.post(this._url+"saveSede", igreja)
      .pipe(map((response: any) => response))
  }

  saveFilial(igreja) {
    return this.http.post(this._url+"saveFilial", igreja)
      .pipe(map((response: any) => response))
  }

  
  getList() {
    return this.http.get(this._url+"obterLista")
      .pipe(map((response: any) => response))
  }

  getListSede() {
    return this.http.get(this._url+"obterListaSede")
      .pipe(map((response: any) => response))
  }

  getSede(id) {
    return this.http.get(this._url+id+"/obterSede")
      .pipe(map((response: any) => response))
  }

  getFilial(id) {
    return this.http.get(this._url+id+"/obterFilial")
      .pipe(map((response: any) => response))
  }

  updateSede(igreja) {
    return this.http.put(this._url+"updateSede", igreja)
      .pipe(map((response: any) => response))
  }

  updateFilial(igreja) {
    return this.http.put(this._url+"updateFilial", igreja)
      .pipe(map((response: any) => response))
  }

  inativar(id) {
    return this.http.put(this._url+"inativar", id)
      .pipe(map((response: any) => response))
  }
}
