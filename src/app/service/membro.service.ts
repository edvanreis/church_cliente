import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class MembroService {
PATH = "membro/";

  constructor(public http: HttpClient) { }

  
  carregarSexo() {
    console.log(environment.baseUrl + this.PATH + "sexo");
    return this.http.get(environment.baseUrl + this.PATH + "sexo", { responseType: 'arraybuffer' })
    .map((res: any) => res)
    .catch(this._errorHandler);
  }

  
  _errorHandler(error: Response) {
    return Observable.throw(error || "Internal server error");
  }
}
