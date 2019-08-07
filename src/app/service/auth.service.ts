import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _urlToken = environment.urlToken;
  private _urlUser = environment.urlUser;

  constructor(private http: HttpClient, private _tokenService: TokenService, private _user: UserService) { }

  login(login, senha) {
    const user = { grant_type: "password", username: login, password: senha }
    let headers = new HttpHeaders({ 'Accept': 'application/json', 'Authorization': 'Basic ' + btoa("churchClient:secret") });
    return this.http.post(this._urlToken, {}, { headers: headers, params: user })
      .pipe(
        tap((user: any) => user)
      );
  }
  /**
 * 
 */
  user() {
    return this.http.get(this._urlUser)
      .pipe(
        tap((user: any) => user)
      );
  }

  logout() {
    this._tokenService.clear();
    this._user.clear();
  }
}
