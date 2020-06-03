import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IgrejaFilialService implements AbstractService {


  private _url = environment.url + "filial/";

  constructor(public http: HttpClient) { }

  getList() {
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }

  save(igreja) {
    return this.http.post(this._url, igreja)
      .pipe(map((response: any) => response))
  }

  getFilial(id) {
    return this.http.get(this._url+id+"/obterFilial")
      .pipe(map((response: any) => response))
  }


  update(igreja) {
    return this.http.put(this._url, igreja)
      .pipe(map((response: any) => response))
  }

  remove(id) {
    return this.http.delete(this._url+id)
      .pipe(map((response: any) => response))
  }

}
