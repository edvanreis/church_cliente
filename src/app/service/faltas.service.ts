import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaltasService {

  
  private _url = environment.url + "faltas/";

  constructor(public http: HttpClient) { }

  getList() {
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }

  getFaltasByPessoa(id) {
    return this.http.get(this._url+id+"/obterFaltas")
      .pipe(map((response: any) => response))
  }
}

