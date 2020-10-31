import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EtapaVisaoService {

  private _url = environment.url + "etapaVisao/";

  constructor(public http: HttpClient) { }

  getList(){
    return this.http.get(this._url)
    .pipe(tap((response: any) => response));
  }

  obterEtapaMembro(id) {
    return this.http.get(this._url + id + "/membroEtapa")
      .pipe(tap((response: any) => response));
  }

}
