import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  autenticadoEmitter = new EventEmitter<any>();
  
  constructor() { }

  isLogged() {
    const user = localStorage.getItem("currentuser");
    if( user ){
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
        permissoes.forEach(map => {
          if (map == permissao) {
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
}
