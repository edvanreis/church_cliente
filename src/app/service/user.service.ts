import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url = environment.url + "user/";
  public autenticadoEmitter = new EventEmitter<any>();


  constructor(public http: HttpClient) { }

  currentUser(){
    return localStorage.getItem("currentuser");
  }

  isLogged() {
    const user = this.currentUser();
    if (user) {
      this.autenticadoEmitter.emit(user);
    }
    return JSON.parse(user);
  }

  storeuser(user) {
    const userLogged = JSON.stringify(user);
    localStorage.setItem("currentuser", userLogged);
    this.autenticadoEmitter.emit(JSON.parse(userLogged));
  }

  /**
 * verifica se usuário logado tem determinada permissão
 * @param permissao
 */
  hasPermission(permissao): boolean {
    const user = this.currentUser();

    let temPermissao = false;
    if ( user ){
      const permissoes = this.permissions().authorities;
      // console.log(permissoes)
      if( permissoes ){
        permissoes.forEach(map =>{
          if( map.authority === permissao){
            temPermissao = true;
          }
        });
      }
    }

    return temPermissao;
  }

  /**
 * Obtem as permissões do usuário logado
 */
  permissions() {
    const user = this.currentUser();
    if ( user ){
      return JSON.parse(user);
    }
    return ;
  }

  clear() {
    localStorage.removeItem("currentuser")
  }

  pesquisar(obj) {
    return this.http.post(this._url + "pesquisar", obj)
      .pipe(map((response: any) => response))
  }

  save(user) {
    return this.http.post(this._url, user)
      .pipe(map((response: any) => response))
  }

  getUser(id) {
    return this.http.get(this._url+id+"/getUser")
      .pipe(map((response: any) => response))
  }

  update(user) {
    return this.http.put(this._url, user)
      .pipe(map((response: any) => response))
  }

  alterarSenha(obj) {
    return this.http.put(this._url + "alterarSenha", obj)
      .pipe(map((response: any) => response))
  }

  esqueceuSenha(obj) {
    return this.http.post(this._url+"esqueceuSenha",obj)
      .pipe(map((response: any) => response))
  }

}
