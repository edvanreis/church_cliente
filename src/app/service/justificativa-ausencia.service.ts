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

  save(justificativaAusencia) {
    return this.http.post(this._url, justificativaAusencia)
      .pipe(map((response: any) => response))
  }

  update(justificativaAusencia) {
    return this.http.put(this._url, justificativaAusencia)
      .pipe(map((response: any) => response))
  }

  remove(justificativaAusencia) {
    return this.http.put(this._url+'removerJustificativaAusencia',justificativaAusencia)
      .pipe(map((response: any) => response))
  }

  getJustificativaAusencia(id) {
    return this.http.get(this._url+id+"/obsterJutificativa")
      .pipe(map((response: any) => response))
  }
}
