import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable()
export class VisitanteService {

  private _url = environment.url + "visitante/";

  constructor(public http: HttpClient) { }

  save(visitante) {
    return this.http.post(this._url, visitante)
      .pipe(map((response: any) => response))
  }


  obterVisitante(id) {
    return this.http.get(`${this._url}${id}/obterVisitante`)
      .pipe(tap((response: any) => response));
  }

  update(membro) {
    return this.http.put(this._url, membro)
      .pipe(map((response: any) => response))
  }

  visitanteRede(id) {
    return this.http.get(this._url + id + "/visitanteRede")
      .pipe(tap((response: any) => response));
  }

  getVisitanteCelula(id) {
    return this.http.get(this._url + id + "/vistanteCelula")
      .pipe(tap((response: any) => response));
  }

  remove(id) {
    return this.http.delete(this._url + id)
      .pipe(map((response: any) => response))
  }


  avisoVisitanteJaCadastrado(visitante) {
    return this.http.post(this._url + "avisoVisitanteJaCadastrado", visitante)
      .pipe(map((response: any) => response))
  }

  pesquisar(visitante) {
    return this.http.post(this._url + "pesquisar", visitante)
      .pipe(map((response: any) => response))
  }

  tranferir(visitante) {
    return this.http.post(this._url, "tranferir", visitante)
      .pipe(map((response: any) => response))
  }

  importar(visitante) {
    console.log(this._url, "importacao")
    return this.http.post(this._url + "importacao", visitante)
      .pipe(map((response: any) => response))
  }

  migrar(id) {
    return this.http.get(`${this._url}${id}/migrar`)
      .pipe(tap((response: any) => response));
  }

  transferirVisitante(controller,id,membroId,metodo) {
    return this.http.get(`${environment.url}${controller}/${id}/${membroId}/${metodo}`)
      .pipe(tap((response: any) => response));
  }


}
