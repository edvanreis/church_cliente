import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable()
export class VisitanteService {

  private _url = environment.url + "visitante/";

  constructor(public http: HttpClient) { }

  save(visitante) {
    return this.http.post(this._url, visitante)
      .pipe(map((response: any) => response))
  }

}
