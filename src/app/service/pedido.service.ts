import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoService  implements AbstractService{

  private _url = environment.url + "pedido/";

  constructor(public http: HttpClient) { }

  save(pedido) {
    return this.http.post(this._url, pedido)
      .pipe(map((response: any) => response))
  }


  update(pedido) {
    return this.http.put(this._url, pedido)
      .pipe(map((response: any) => response))
  }

  remove(id) {
    return this.http.delete(`${this._url}${id}`)
      .pipe(map((response: any) => response))
  }

  getList() {
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }

  carregarAreaPedidoOracao() {
    return this.http.get(`${this._url}areaPedidoOracao`)
      .pipe(tap((response: any) => response));
  }
}
