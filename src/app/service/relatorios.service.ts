import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  private _url = environment.url + "relatorio/";

  constructor(public http: HttpClient) { }

  getList(){
    return this.http.get(this._url)
    .pipe(tap((response: any) => response));
  }

   relatorioReniaoSemanal(obj) {
    return this.http.post(this._url+"relatorioReuniaoSemenal",obj,{ responseType: "blob" })
    .pipe(map((response: any) => response))
  }

  relatorioFaltas(obj) {
    return this.http.post(this._url+"relatorioFaltas",obj,{ responseType: "blob" })
    .pipe(map((response: any) => response))
  }
}
