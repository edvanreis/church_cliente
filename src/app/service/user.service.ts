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

  isLogged() {
    const user = localStorage.getItem("currentuser");
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
    const user = this.isLogged();
    let temPermissao = false;
    if (user) {
      const permissoes = this.permissions();
      if (permissoes) {
        let tem = permissoes.filter((item: any) => item.authority == permissao);
        if (tem.length) {
          temPermissao = true;
        }
      }
    }

    return temPermissao;
  }

  /**
 * Obtem as permissões do usuário logado
 */
  permissions(): Array<string> {
    const user = this.isLogged();
    if (user) {
      return user.authorities;
    }
    return;
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
    return this.http.post(this._url + "alterarSenha", obj)
      .pipe(map((response: any) => response))
  }

  esqueceuSenha(cpf) {
    return this.http.get(this._url+cpf+"/esqueceuSenha")
      .pipe(map((response: any) => response))
  }
  
}
