import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JustificativaAusenciaService {

  private _url = environment.url + "justificativaAusencia/";

  constructor(public http: HttpClient) { }

  getList() {
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }

  save(reuniao) {
    return this.http.post(this._url, reuniao)
      .pipe(map((response: any) => response))
  }

  update(reuniao) {
    return this.http.put(this._url, reuniao)
      .pipe(map((response: any) => response))
  }

  remove(id) {
    return this.http.delete(this._url+id+'/remover')
      .pipe(map((response: any) => response))
  }

  getJustificativaAusencia(id) {
    return this.http.get(this._url+id+"/obsterJutificativa")
      .pipe(map((response: any) => response))
  }
}
