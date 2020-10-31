import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

   
  private _url = environment.url + "perfil/";

  constructor(public http: HttpClient) { }

  save(permissao) {
    return this.http.post(this._url, permissao)
      .pipe(map((response: any) => response))
  }
  
  update(permissao) {
    return this.http.put(this._url, permissao)
      .pipe(map((response: any) => response))
  }
  
  getList() {
    return this.http.get(this._url)
      .pipe(map((response: any) => response))
  }

  remove(id) {
    return this.http.delete(this._url+id+"/removerPerfil")
      .pipe(map((response: any) => response))
  }

  getPerfil(id) {
    return this.http.get(this._url+id+"/getPerfil")
      .pipe(map((response: any) => response))
  }
}
