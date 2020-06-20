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

  getGruposByIgrejas(id) {
    return this.http.get(this._url+id+"/gruposByIgrejas")
      .pipe(map((response: any) => response))
  }

  findGruposTrabalhoESubByIgreja(id) {
    return this.http.get(this._url+id+"/gruposSubByIgrejas")
      .pipe(map((response: any) => response))
  }


  getGruposByIgrejasGroupBy(id) {
    return this.http.get(this._url+id+"/gruposByIgrejasGrupoby")
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


}
