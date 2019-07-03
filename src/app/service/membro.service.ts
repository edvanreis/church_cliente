import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable()
export class MembroService {
PATH = "membro/";

  constructor(public http: HttpClient) { }

  
  carregarSexo() {
    console.log(environment.baseUrl + this.PATH + "sexo");
    return this.http.get(environment.baseUrl + this.PATH + "sexo").pipe(
      tap((response: any) => response)
    );
  }

  
  _errorHandler(error: Response) {
    return Observable.throw(error || "Internal server error");
  }
}
